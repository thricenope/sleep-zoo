---
name: 晚安动物园 SleepZoo
description: 节气睡眠打卡的暮色薰衣草Q版动物园设计系统
colors:
  bg: "#F1EDFF"
  ink: "#3D2E55"
  ink-2: "#7A6C99"
  ink-3: "#A99CC4"
  card: "#FFFFFF"
  line: "#E6DEF6"
  grape: "#8A77C9"
  grape-deep: "#5E4A9E"
  mint: "#2ED3A3"
  mint-deep: "#0E8F6C"
  tange: "#FF9838"
  berry: "#FF5D8F"
  cherry: "#E0567A"
typography:
  display:
    fontFamily: "'ZCOOL QingKe HuangYou', 'PingFang SC', sans-serif"
    fontWeight: 400
  body:
    fontFamily: "ui-rounded, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: "15px"
    lineHeight: 1.55
  num:
    fontFamily: "'Baloo 2', sans-serif"
    fontWeight: 800
rounded:
  sm: "13px"
  md: "16-18px"
  pill: "999px"
spacing:
  sm: "10px"
  md: "14-16px"
components:
  button-primary:
    backgroundColor: "linear-gradient(180deg,#7A66BD,#5E4A9E)"
    textColor: "#FFFFFF"
    typography: "{typography.display}"
    rounded: "20px"
    padding: "16px"
  button-sun:
    backgroundColor: "linear-gradient(180deg,#FFB35C,#F08A24)"
    textColor: "#FFFFFF"
---

# Design System: 晚安动物园 SleepZoo

## Overview

**Creative North Star: "睡前玩具箱里的迷你动物园"**

用户睡前的最后一下和醒来的第一下，都是来给动物盖被/叫醒它——动物的脸就是睡眠成绩单。暮色薰衣草底（晚间+清晨双场景），Q版夸张动物是绝对主角。拒绝手环式数据面板与红色焦虑警告。

**Key Characteristics:**
- 暮色薰衣草底 + 梦境紫罗兰墨水 + 蜜桃/薄荷/星黄点睛
- 舞台卡：星空渐变天幕 + 草地弧线 + 月亮 + 闪烁星星，动物站C位
- 夸张状态系统：Zzz盖被 / 星星眼举手 / 大哈欠 / 黑眼圈+咖啡 / 灵魂出窍 / 赖床王冠
- 节气配饰随季换装（春花/夏草帽/秋围巾/冬毛线帽）+ 每节气一句搞笑文案

## Colors

- **梦境紫**（#8A77C9 / 深 #5E4A9E）：主行动——去睡觉按钮、登场标签、选中态。
- **晨光橙**（#FFB35C→#F08A24）：起床按钮（太阳语义）。
- **达标绿**（#2ED3A3）：成功语义与 7–9h 黄金区。
- **警报莓**（#E0567A）：熬夜夜的条与数字，永不做横幅。
- **薰衣草底**（#F1EDFF）+ 三团柔光（橙/紫/绿 radial）。

### Named Rules
**The Two-Buttons Rule.** 全应用只有两个主动作按钮：紫=去睡觉，橙=起床啦；其余全部退居链接与卡片。  
**The Animal-First Rule.** 一屏内最大的形象永远是动物；数据（分数、时长）为动物台词服务，不是反过来。

## Typography

黄油体（标题/按钮/台词）+ 系统圆体（正文）+ Baloo 2 表格数字（时间与统计）。台词用黄油体制造"动物在说话"的卡通腔。

## Layout

430px 单栏；顶部节气横幅（胶囊芯片「今日·寒露」+ 距离注记）；舞台卡内动物固定 C 位；底部 4 标签（今晚/记录/动物园/统计）。

## Elevation & Depth

贴纸卡片（2px 薰衣草描边 + 柔影 + `0 3px 0` 微挤出）；果冻大按钮（`0 6px 0` 深色底边，按下下沉）。夜间进度条 = 轨道 + 紫渐变填充 + 圆框月亮游标；时长条带薄荷色达标刻度线。

## Components

### 动物舞台（签名组件）
渐变夜空 + 5 颗闪烁星 + 金月亮 + 草地弧线；动物 168px 居中，2.4s 呼吸浮动（睡觉时改为均匀 3.2s 打呼节奏）。

### Animal（签名组件）
8 物种（仓鼠/柴犬/兔/猫/狐/树懒/猫头鹰/熊）× 8 状态 × 4 季配饰，全 SVG 参数化绘制：耳朵/吻部/特写按物种切换，眼睛嘴巴按状态切换，配饰按季节叠加。状态：睡觉（盖被+Zzz 文字动画）、great（星眼+举手+星光）、good、yawn（大嘴+爪）、tired（眼皮+黑眼圈+咖啡杯+热气）、ghost（本体倾斜变灰+灵魂小人漂浮+虚线牵引）、lazy（王冠）、idle。

### 入住庆祝
白卡 + 旋转光芒 + 动物 great 状态 spring 入场 + 星形彩带；队列式逐个弹出。

### 夜历
每格一夜：色块芯片内嵌时长数字（`8.3`），周 tabs 补录弹层带 `<input type="time">`。

## Do's and Don'ts

### Do:
- **Do** 每个状态配夸张但不羞辱的台词（"灵魂已经飘走了"而非指责）。
- **Do** 让动物状态直接由数据推导（evaluate → stageStatus 单向流）。
- **Do** 节气配饰与文案每月不同，制造"今晚有点新意"。
- **Do** 数字用 Baloo 2 tabular-nums。

### Don't:
- **Don't** 出现红色焦虑横幅或睡眠债控诉；熬夜夜也保持搞笑温度。
- **Don't** 用 emoji 当控件图标（动物/图标全部手绘 SVG；文案里可以）。
- **Don't** 让数据卡片比舞台卡更大更醒目。
