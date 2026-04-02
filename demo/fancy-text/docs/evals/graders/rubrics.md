# LLM Rubric Graders — fancy-text

## Dimensions

| Dimension | Weight | 5 (excellent) | 1 (poor) |
|-----------|--------|---------------|----------|
| Code clarity | 30% | Clean, well-named, idiomatic React/TS | Confusing, inconsistent naming |
| Feature completeness | 40% | All requirements met, edge cases handled | Missing core functionality |
| Style consistency | 30% | Matches existing code patterns | Diverges from project conventions |

## Scoring

- Score each dimension 1–5
- Weighted average ≥ 3.5 = pass
- Any dimension ≤ 2 = auto-fail

## Calibration

Compare LLM scores with human review on the first 5 evals; adjust rubric if drift > 1 point average.
