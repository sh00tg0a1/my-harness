# My Harness

为任意软件项目生成 **OpenAI 规范的 Agent Harness** 的 Agent Skill。

基于渐进式披露（Progressive Disclosure）理念，生成简短的根目录入口文件（`AGENTS.md`、`ARCHITECTURE.md`）并链接到结构化的 `docs/` 文档树，让编码 Agent 从精简的导航图出发，按需深入到详细规格，而无需一次性加载全部内容。

灵感来源：[Harness Engineering (OpenAI)](https://openai.com/zh-Hans-CN/index/harness-engineering/)、[Demystifying evals for AI agents (Anthropic)](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)。

## 产出结构

在目标仓库中调用该 Skill 后，会创建以下文件：

```text
AGENTS.md              ← ≤120 行的 Agent 契约 & 导航图（含 3 行工作流表 + PLANS.md 链接）
ARCHITECTURE.md        ← 技术全景图：架构图、模块边界、数据流
docs/
  DESIGN.md            ← 设计哲学（简短）
  PLANS.md             ← 产品路线图阶段
  PRODUCT_SENSE.md     ← 用户画像、非目标、UX 原则
  QUALITY_SCORE.md     ← 质量记分卡
  RELIABILITY.md       ← 超时、重试、幂等性
  SECURITY.md          ← 密钥、认证、审计
  FRONTEND.md          ← UI 规范（仅前端 / 全栈项目）
  design-docs/
    index.md           ← 设计文档目录
    core-beliefs.md    ← 编号工程原则
  exec-plans/
    active/            ← 进行中的执行计划
    completed/         ← 已完成的计划
    tech-debt-tracker.md
  generated/
    db-schema.md       ← 或 api-schema.md（占位 + 重新生成说明）
  product-specs/
    index.md           ← 领域规格目录
    <domain>.md        ← 每个业务领域一个文件
  references/
    <stack>-llms.txt   ← 供 LLM 使用的原始上下文（厂商文档等）
```

**可选：**

- 传入 `--superpowers` 可追加 `docs/superpowers/`，提供 设计 → 计划 → 执行 → 验证 的完整工作流。
- 传入 `--evals` 可追加 `docs/evals/`（任务定义、评分器规格、基线目录），用于 AI Agent 的自动化评估约定；任务与评分标准在仓库内定义，**实际跑 eval** 需自行接入脚本或 Harbor、Braintrust、LangSmith 等框架（见 [`references/evals-addon.md`](skills/my-harness/references/evals-addon.md)）。

**Phase 5 — Agent 平台桥接：**

在 Phase 1 中选择团队使用的 Agent 工具后，会在目标仓库生成或追加桥接说明（例如 Cursor 的 `.cursor/rules/harness.mdc`，Windsurf / GitHub Copilot / Cline 的对应配置文件）。**Claude Code / Codex** 通常只需依赖根目录 `AGENTS.md`，无需额外文件。详见 [`references/file-specs.md`](skills/my-harness/references/file-specs.md) 中的「Agent platform bridge files」。

```text
# --evals 时追加示例
docs/evals/
  index.md              ← eval 套件策略与目录
  tasks/                ← 单任务 YAML/MD
  graders/
    rubrics.md          ← LLM 评分量规
    deterministic.md    ← 代码级检查约定
  results/baselines/    ← 基线或 CI 产物指针
```

## 核心原则

| # | 原则 | 要点 |
| --- | --- | --- |
| 1 | 仓库即唯一信息源 | 不在仓库里的东西，Agent 看不到 |
| 2 | AGENTS.md 是导航图 | ~100 行指针索引，不是百科全书 |
| 3 | 渐进式披露 | 从小处开始，按链接深入 |
| 4 | 结构化 `docs/` | 设计文档、产品规格、执行计划、生成产物 |
| 5 | 计划与技术债版本化 | active / completed 计划存于 git |
| 6 | 机械化强制执行 | 用 linter 和 CI 约束，而非仅靠文字约定 |
| 7 | Agent 可读性优先 | 可发现性 > 仅面向人类的排版 |
| 8 | 尽早建立架构约束 | 严格边界优于临时指令 |
| 9 | 质量记分卡 | 在 `QUALITY_SCORE.md` 中跟踪差距 |
| 10 | 熵与"垃圾回收" | 小步频繁清理；黄金规则写入仓库 |

完整说明见 [`references/harness-principles.md`](skills/my-harness/references/harness-principles.md)。

## 使用方式

### 安装

```bash
npx skills add https://github.com/sh00tg0a1/my-harness --skill my-harness
```

安装后在 Cursor 对话中输入 `/my-harness`，如果能识别则说明安装成功。

### 调用

**首次搭建（scaffold）** — 在 Cursor 中例如：

> Use my-harness to scaffold an agent-first documentation harness for my project.

**增量更新（harness update）** — 在已有 `AGENTS.md` 与 `docs/` 时，例如：

> harness update — add domain `billing`  
> update harness — enable evals  
> sync harness — verify links

Skill 会进入 **Harness update mode**：展示现状、选择操作（增删 domain、启用插件、补平台桥接、移动 exec plan、刷新质量记分卡等），再执行并汇总变更。详见 [`SKILL.md`](skills/my-harness/SKILL.md) 中的「Harness update mode」。

### 工作流（scaffold，约 7–8 轮对话）

1. **收集上下文** — 自动扫描仓库并展示检测结果；再问项目名称与目的；合并询问「项目类型 + 架构风格」；再问业务领域；合并询问「Superpowers / Evals」与 **Agent 平台**（Cursor、Claude Code、Codex、Windsurf、GitHub Copilot、Cline 等）；最后汇总表确认（**通过前不写文件**）。
2. **Spec Kit（可选）** — 若存在 `.specify/`，确认与 Spec Kit 的共存策略（不覆盖 `specs/` 等）。
3. **创建目录** — 确认后创建目录（无单独「只确认目录」的停顿）。
4. **填充文件** — 按 [`references/file-specs.md`](skills/my-harness/references/file-specs.md) 写入；全部完成后 **一次 checkpoint** 供用户调整。
5. **验证与回顾** — 交叉链接检查、最终报告、用户确认（最多 3 轮修改）。
6. **平台桥接** — 按所选平台生成或追加桥接文件（Phase 5）。

### 与 Spec Kit 共存

如果目标仓库已存在 `.specify/`，Skill 会以合并方式工作 — 向已有的 `AGENTS.md` 追加内容而非覆盖，并尊重 `specs/`（Spec Kit 管理的特性规格）与 `docs/product-specs/`（领域级规格）的分工。

## 仓库结构

```text
README.md
skills/
  my-harness/
    SKILL.md                      ← Skill：scaffold 流程、Phase 5 桥接、harness update
    agents/
      openai.yaml                 ← Agent UI 元数据（显示名、默认提示词）
    references/
      harness-principles.md       ← OpenAI Harness 工程 10 条原则
      file-specs.md               ← 各文件模板、桥接文件、update 规则
      superpowers-addon.md        ← 可选 Superpowers 目录与工作流
      evals-addon.md              ← 可选 Evals（任务、评分器、基线；Anthropic eval 实践）
    evals/                        ← Skill 自身的评估套件
      run.py                      ← eval runner（prepare → verify → 汇总）
      index.md                    ← eval 策略与套件概述
      tasks/
        scaffold-greenfield.yaml  ← 从零搭建完整 harness
        merge-existing.yaml       ← 合并到已有项目
        speckit-coexistence.yaml  ← Spec Kit 共存
        evals-addon-enabled.yaml  ← --evals 激活
      graders/
        structure-check.md        ← 目录/文件完整性检查
        link-check.md             ← 交叉链接可达性检查
        content-rubric.md         ← 内容质量 LLM 评分量规
```

## 运行 Eval

验证 skill 产出质量（需要 `pip install pyyaml`）：

```bash
cd skills/my-harness/evals

# 交互模式：准备环境 → 提示你调用 skill → 自动跑 graders
python run.py eval tasks/scaffold-greenfield.yaml

# 仅验证已有产出目录
python run.py verify tasks/scaffold-greenfield.yaml /path/to/output
```

详见 [`evals/index.md`](skills/my-harness/evals/index.md)。

## Demo

`demo/fancy-text/` 是一个用 my-harness skill 生成的完整 harness 示例，目标项目是一个 React + Vite 的花式文字渲染应用。

### 产出概览

```text
demo/fancy-text/
  AGENTS.md               ← Agent 契约 & 导航图
  ARCHITECTURE.md         ← 技术架构图
  docs/                   ← 完整 docs/ 文档树（含 superpowers + evals）
  src/                    ← 应用源码（React 18 + Vite 5 + TypeScript）
  package.json
```

### 生成提示词

在 Cursor 中对 `demo/fancy-text/` 目录执行：

> Use my-harness to scaffold an agent-first documentation harness for my project. The project is called "fancy-text" — a React SPA that transforms any text input into fancy visual presentations with 25 typography styles. Stack: React 18, Vite 5, TypeScript 5.4. Shape: Frontend, Architecture: Monolith. Domains: rendering, styles. Enable both Superpowers and Evals.

### 本地运行 demo 应用

```bash
cd demo/fancy-text
npm install
npm run dev
```

## 许可证

[Apache License 2.0](LICENSE)
