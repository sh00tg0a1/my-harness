#!/usr/bin/env python3
"""
my-harness eval runner

Runs deterministic graders against a directory that has already been
populated by the my-harness skill. The LLM rubric step prints the
prompt to stdout for manual scoring (or pipe to an LLM API).

Usage:
    # Verify a single task against a target directory:
    python run.py verify <task.yaml> <target_dir>

    # Prepare a temp directory with seed files (for merge / speckit tasks):
    python run.py prepare <task.yaml>
    # → prints the temp dir path; invoke the skill against it, then run verify.

    # Full workflow shortcut (prepare + open prompt + verify):
    python run.py eval <task.yaml>

Examples:
    # Greenfield — create empty dir, run skill, then verify
    python run.py eval tasks/scaffold-greenfield.yaml

    # Existing repo — prepare seeds, run skill manually, then verify
    DIR=$(python run.py prepare tasks/speckit-coexistence.yaml)
    # ... invoke skill against $DIR ...
    python run.py verify tasks/speckit-coexistence.yaml "$DIR"
"""

import argparse
import os
import re
import sys
import tempfile
from pathlib import Path

import yaml


def load_task(task_path: str) -> dict:
    with open(task_path) as f:
        data = yaml.safe_load(f)
    return data["task"]


def prepare_dir(task: dict) -> Path:
    """Create a temp directory and write seed_files if any."""
    tmp = Path(tempfile.mkdtemp(prefix=f"harness-eval-{task['id']}-"))
    seed_files = task.get("seed_files", {})
    for rel_path, content in seed_files.items():
        fp = tmp / rel_path
        fp.parent.mkdir(parents=True, exist_ok=True)
        fp.write_text(content)
    return tmp


class GraderResult:
    def __init__(self, name: str, passed: bool, details: str = ""):
        self.name = name
        self.passed = passed
        self.details = details

    def __str__(self):
        status = "PASS" if self.passed else "FAIL"
        out = f"  [{status}] {self.name}"
        if self.details:
            for line in self.details.strip().split("\n"):
                out += f"\n         {line}"
        return out


def grade_structure_check(target: Path, grader: dict) -> GraderResult:
    missing = []
    for d in grader.get("expect_dirs", []):
        if not (target / d).is_dir():
            missing.append(f"dir:  {d}")
    for f in grader.get("expect_files", []):
        fp = target / f
        if not fp.is_file():
            missing.append(f"file: {f} (missing)")
        elif fp.stat().st_size == 0:
            missing.append(f"file: {f} (empty)")
    if missing:
        return GraderResult("structure_check", False, "\n".join(missing))
    return GraderResult("structure_check", True)


def grade_link_check(target: Path, _grader: dict) -> GraderResult:
    link_re = re.compile(r"\[([^\]]*)\]\(([^)]+)\)")
    broken = []
    for md in target.rglob("*.md"):
        text = md.read_text(errors="replace")
        for match in link_re.finditer(text):
            label, href = match.groups()
            if href.startswith(("http://", "https://", "#", "mailto:")):
                continue
            clean = href.split("#")[0]
            if not clean:
                continue
            resolved = (md.parent / clean).resolve()
            if not resolved.exists():
                rel_src = md.relative_to(target)
                broken.append(f"{rel_src}: [{label}]({href})")
    if broken:
        return GraderResult("link_check", False, "\n".join(broken))
    return GraderResult("link_check", True)


def grade_line_count(target: Path, grader: dict) -> GraderResult:
    fp = target / grader["file"]
    if not fp.is_file():
        return GraderResult("line_count", False, f"{grader['file']} not found")
    count = len(fp.read_text().splitlines())
    limit = grader["max"]
    if count > limit:
        return GraderResult("line_count", False, f"{grader['file']}: {count} lines (max {limit})")
    return GraderResult("line_count", True, f"{grader['file']}: {count} lines (max {limit})")


def grade_content_preserved(target: Path, grader: dict) -> GraderResult:
    fp = target / grader["file"]
    if not fp.is_file():
        return GraderResult("content_preserved", False, f"{grader['file']} not found")
    content = fp.read_text()
    needle = grader["must_contain"]
    if needle not in content:
        return GraderResult("content_preserved", False,
                            f"{grader['file']}: expected to contain \"{needle}\"")
    return GraderResult("content_preserved", True, f"{grader['file']}: preserved OK")


def grade_content_check(target: Path, grader: dict) -> GraderResult:
    fp = target / grader["file"]
    if not fp.is_file():
        return GraderResult("content_check", False, f"{grader['file']} not found")
    content = fp.read_text()

    if "must_contain" in grader:
        needle = grader["must_contain"]
        if needle not in content:
            return GraderResult("content_check", False,
                                f"{grader['file']}: expected \"{needle}\"")
        return GraderResult("content_check", True, f"{grader['file']}: contains \"{needle}\"")

    if "must_contain_any" in grader:
        needles = grader["must_contain_any"]
        for needle in needles:
            if needle.lower() in content.lower():
                return GraderResult("content_check", True,
                                    f"{grader['file']}: contains \"{needle}\"")
        return GraderResult("content_check", False,
                            f"{grader['file']}: none of {needles} found")

    return GraderResult("content_check", True)


def grade_llm_rubric(target: Path, grader: dict, task: dict) -> GraderResult:
    rubric_path = Path(grader["ref"])
    if not rubric_path.is_absolute():
        task_dir = Path(__file__).parent / "tasks"
        rubric_path = (task_dir / rubric_path).resolve()

    rubric_text = rubric_path.read_text() if rubric_path.is_file() else "(rubric file not found)"

    file_list = []
    for md in sorted(target.rglob("*.md")):
        rel = md.relative_to(target)
        preview = md.read_text(errors="replace")[:500]
        file_list.append(f"--- {rel} ---\n{preview}\n")

    prompt = f"""You are an eval grader for the my-harness skill.

## Task
id: {task['id']}
desc: {task['desc']}

## Rubric
{rubric_text}

## Generated files (first 500 chars each)
{"".join(file_list)}

Score each dimension (1-5). Return JSON:
{{"completeness": N, "conciseness": N, "cross_linking": N, "agent_readability": N, "accuracy": N, "pass": true/false}}
"""
    prompt_file = target / ".eval-rubric-prompt.txt"
    prompt_file.write_text(prompt)
    return GraderResult("llm_rubric", True,
                        f"Prompt saved to {prompt_file}\n"
                        f"Run: cat \"{prompt_file}\" | llm  (or paste into Claude)\n"
                        f"Pass if all dimensions >= 3 and average >= 4.")


GRADER_DISPATCH = {
    "structure_check": grade_structure_check,
    "link_check": grade_link_check,
    "line_count": grade_line_count,
    "content_preserved": grade_content_preserved,
    "content_check": grade_content_check,
}


def run_graders(target: Path, task: dict) -> list[GraderResult]:
    results = []
    for grader in task.get("graders", []):
        gtype = grader["type"]
        if gtype in GRADER_DISPATCH:
            results.append(GRADER_DISPATCH[gtype](target, grader))
        elif gtype == "llm_rubric":
            results.append(grade_llm_rubric(target, grader, task))
        else:
            results.append(GraderResult(gtype, True, "(skipped — no runner for this type)"))
    return results


def print_results(task: dict, results: list[GraderResult]):
    deterministic = [r for r in results if r.name != "llm_rubric"]
    llm = [r for r in results if r.name == "llm_rubric"]

    passed = sum(1 for r in deterministic if r.passed)
    failed = sum(1 for r in deterministic if not r.passed)
    total = len(deterministic)

    print(f"\n{'='*60}")
    print(f"Task: {task['id']}  (suite: {task.get('suite', '?')})")
    print(f"{'='*60}")
    print(f"\nDeterministic graders: {passed}/{total} passed" +
          (f", {failed} FAILED" if failed else ""))
    print()
    for r in deterministic:
        print(r)

    if llm:
        print(f"\nLLM rubric (manual):")
        for r in llm:
            print(r)

    overall = all(r.passed for r in deterministic)
    print(f"\n{'='*60}")
    print(f"Overall (deterministic): {'PASS' if overall else 'FAIL'}")
    print(f"{'='*60}\n")
    return overall


def cmd_prepare(args):
    task = load_task(args.task)
    tmp = prepare_dir(task)
    print(tmp)


def cmd_verify(args):
    task = load_task(args.task)
    target = Path(args.target_dir)
    if not target.is_dir():
        print(f"Error: {target} is not a directory", file=sys.stderr)
        sys.exit(1)
    results = run_graders(target, task)
    ok = print_results(task, results)
    sys.exit(0 if ok else 1)


def cmd_eval(args):
    task = load_task(args.task)
    tmp = prepare_dir(task)

    print(f"Prepared: {tmp}")
    seed_count = len(task.get("seed_files", {}))
    if seed_count:
        print(f"  ({seed_count} seed files written)")

    print(f"\nNow invoke the skill against this directory:")
    inputs = task.get("inputs", {})
    parts = [f"{k}={v}" for k, v in inputs.items() if k != "target_path"]
    print(f"  target_path: {tmp}")
    for p in parts:
        print(f"  {p}")

    print(f"\nAfter the skill finishes, press Enter to run graders...")
    input()

    results = run_graders(tmp, task)
    ok = print_results(task, results)
    sys.exit(0 if ok else 1)


def main():
    parser = argparse.ArgumentParser(
        description="my-harness eval runner",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_prepare = sub.add_parser("prepare", help="Create temp dir with seed files")
    p_prepare.add_argument("task", help="Path to task YAML")
    p_prepare.set_defaults(func=cmd_prepare)

    p_verify = sub.add_parser("verify", help="Run graders against a target directory")
    p_verify.add_argument("task", help="Path to task YAML")
    p_verify.add_argument("target_dir", help="Directory to verify")
    p_verify.set_defaults(func=cmd_verify)

    p_eval = sub.add_parser("eval", help="Prepare + prompt + verify (interactive)")
    p_eval.add_argument("task", help="Path to task YAML")
    p_eval.set_defaults(func=cmd_eval)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
