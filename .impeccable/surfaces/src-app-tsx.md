---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface Brief — 晚安动物园 App Shell（src/App.tsx 及全部视图）

## Scope & Visitor Mode

Operate（睡前/晨起双打卡）+ Experience 的Q版舞台感。移动优先，四标签：今晚 / 记录 / 动物园 / 统计。

## Audience · Job · Action · Proof · Constraints

- 受众：睡眠作息想改善的用户本人，晚间+清晨场景。
- 任务：一键记入睡/起床，看动物反应与进度，30 秒内完成。
- 行动：「去睡觉」「起床啦」→ 动物变脸 + 进度条 → 看连击解锁新动物。
- 证据：本地真实数据；演示为合成。
- 约束：纯前端；节气用标准通式近似；正向夸张、不羞辱。

## Direction Contract

THESIS: 用户睡前的最后一下和醒来的第一下，都是来给动物盖被/叫醒它——动物的脸就是你的睡眠成绩单；拒绝手环式数据面板与红色焦虑警告。
OWN-WORLD: 暮色薰衣草底（#F1EDFF 系）+ 梦境深紫墨、蜜桃/薄荷/星黄三糖点；黄油体标题 + Baloo 2 数字；Q版动物为绝对主角（夸张表情：Zzz、咖啡吊瓶、灵魂出窍、赖床王冠）；节气配饰（春花/夏墨镜/秋围巾/冬毛线帽）。去掉内容仍是睡前玩具箱。
STORY: 晚上按「去睡觉」→ 动物盖上被角开始打呼 → 夜间进度条走到天亮 → 晨起按「起床啦」→ 动物用夸张脸发布判决 → 连续达标解锁动物园新室友。
FIRST VIEWPORT: 节气徽章（今宵节气+搞笑一句话）→ 动物舞台卡（大动物+台词泡）→ 双大按钮（去睡觉/起床啦）→ 夜间进度条或昨夜时长条 → 透明评分卡。
FORM: 用户钉死的Q版搞笑动物+节气世界（brief-pinned，免掷骰）；复用已验证的透明评分/连击/解锁架构。
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved Decisions

无（解锁节奏：2/3/5/7/10/14/21 夜解锁 7 只动物）。
