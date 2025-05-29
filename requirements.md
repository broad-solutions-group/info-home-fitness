# Home Fitness

这是一个专注于**家庭健身解决方案**的英文资讯网站，务必不要出现中文，主要服务于以下需求：

## 网站定位分析

1. **核心主题**  
   - 经济实惠的家庭健身方案（低成本、空间优化）
   - 亲子/家庭友好型健身活动
   - 无器械力量训练（纯自重训练）
   - 智能家居健身科技

2. **目标用户**  
   - 预算有限的健身爱好者
   - 居住空间有限的城市人群（公寓/小户型）
   - 有孩子的家庭
   - 健身新手和居家锻炼者

3. **内容特征**  
   - 强调整合日常生活场景（客厅、车库、后院）
   - 注重DIY解决方案（家具改造、日常物品替代器械）
   - 突出时间效率（5-20分钟短时训练）
   - 强调趣味性和家庭参与感

4. **关键词延伸**  

```plaintext
Affordable（经济）| Space-Saving（省空间）| No-Equipment（无器械）| 
Family Bonding（家庭互动）| Quick Workouts（快速训练）| DIY Hacks（DIY技巧）
```

---

## 视觉风格建议

基于“家庭健身”核心定位和关键词，推荐采用以下视觉体系：

### 1. **色彩方案**

- **主色调**：  
  - `#4AB19D`（活力青绿色 - 象征健康/自然）  
  - `#FF7E5F`（暖珊瑚橙 - 传递能量/亲和力）  
  - **辅助色**：  
  - `#F5F5F5`（浅灰背景 - 营造空间感）  
  - `#34495E`（深蓝灰 - 专业稳重）  
- **点缀色**：  
  `#F9D342`（明黄 - 突出趣味元素）  

> ✅ **配色逻辑**：青绿+珊瑚橙传递健康活力，浅灰背景呼应“空间优化”主题，明黄点缀亲子内容。

### 2. **字体组合**

   | 场景          | 字体推荐                     | 风格特点                 |
   |---------------|-----------------------------|--------------------------|
   | 标题/导语     | **Poppins** (Bold)          | 现代几何感，清晰有力     |
   | 正文/说明文字 | **Open Sans** (Regular)     | 高可读性，友好无压迫感   |
   | 数据/关键词   | **Montserrat** (SemiBold)   | 简洁中性，突出技术感     |

### 3. **视觉元素**

- **图片风格**：  
  - 真实生活场景为主（非摆拍棚图）
  - 展现多代际家庭共同锻炼
  - 加入手绘DIY示意图（如IKEA家具改造步骤）
  - 动态GIF展示动作分解（如平板支撑变体）
- **图标系统**：  

```plaintext
💰 预算相关 → 硬币图标  
👨‍👩‍👧‍👦 亲子内容 → 家庭牵手图标  
🛋️ 空间改造 → 折叠箭头图标  
⏱️ 短时训练 → 闪电计时器图标
```

- **版式特征**：  
  - 卡片式布局（呼应“模块化健身空间”概念）
  - 留白≥40%（强调“空间感”主题）
  - 进度条式训练计划展示（可视化时间效率）

#### 4. **品牌个性关键词**

```plaintext
ACCESSIBLE（触手可及） / ADAPTABLE（灵活适应） / 
JOYFUL（乐趣导向） / INNOVATIVE（巧思创意）
```

---

### 页面结构建议

| 板块              | 内容重点                                      | 视觉线索                     |
|-------------------|---------------------------------------------|------------------------------|
| **省钱健身**      | 二手装备指南/美元店好物/低成本智能设备       | 青绿色主调+省钱图标          |
| **亲子动能**      | 家庭挑战赛/无屏游戏/儿童安全训练             | 珊瑚橙主调+家庭图标          |
| **空间魔术**      | 折叠家具妙用/角落改造/垂直存储方案           | 浅灰背景+空间规划插图        |
| **自重大师**      | 进阶俯卧撑/深蹲变体/纯核心训练               | 深蓝灰主调+动作分解GIF       |

> 通过色彩分区强化内容定位，配合生活化图片降低健身门槛，突出“人人可实践”的核心价值。

## 一、项目概览

1. 核心功能需求

- 三视图架构（首页/分类页/搜索页/详情页）
- 响应式布局（移动优先原则）
- 使用本地JSON数据: src/app/data/Home-Fitness.json


## 二、技术架构方案

1. 核心框架

- React 18 + TypeScript
- React Router v6（路由管理）
- Redux Toolkit（状态管理）
- CSS Modules（样式方案）

2. 辅助工具

- Framer Motion（交互动效）
- Swiper.js（轮播组件）
- react-intersection-observer（懒加载）

## 三、页面结构规划

菜单栏包含：Home、Affordable Home Gym Setups、Family & Kids Friendly Workouts、Strength Training Without Equipment、Motivation & Habit Building Tips

### 1. 首页（Home）

根据你提供的内容（一个专注于“家庭健身解决方案”的英文资讯网站），我为首页设计了一套结构合理、吸引点击的板块划分方案。这个结构旨在最大化用户兴趣点、提高停留时间与点击率：

---

#### 🏠 1. **Hero Banner（主视觉 + 热门推荐）**

* **内容**：轮播图 + 热门文章CTA
* **功能**：

  * 引导访问者点击最优质内容（如“7 Genius Ways to Build a Home Gym on a Budget”）
  * 可用标签：#BudgetGym #FamilyFitness #SmallSpaceHacks

---

#### 🔥 2. **Trending Now（热门焦点）**

* **展示**：当前浏览/分享最多的3\~5篇文章
* **目的**：制造“FOMO感”（错过恐惧）
* **样例内容**：

  * “Skip the Gym: 10 Must-Have Items Under \$50”
  * “No Room? No Problem: Foldable Gear That Fits Anywhere”

---

#### 🛠️ 3. **Build Your Home Gym（构建你的家庭健身空间）**

* **子分类展示**：

  * **On a Budget**：便宜又实用
  * **Garage Transformations**：车库改造指南
  * **Small Space Hacks**：小户型健身方案
* **吸引点**：侧重“DIY”、“小投入大回报”、“省空间”

---

#### 🧒👨‍👩‍👧‍👦 4. **Family & Kids Fitness（家庭亲子运动专区）**

* **内容**：

  * 居家亲子运动游戏
  * 家庭健身挑战
  * 无屏活动、室内体能游戏
* **标签**：#FunFitness #ActiveKids #ParentChildWorkout

---

#### 🧠 5. **Fitness Habits That Stick（打造可持续健身习惯）**

* **内容**：

  * 动力提升技巧
  * 快速晨间锻炼
  * 习惯养成方法（如日历打卡、视觉激励等）
* **吸引点**：鼓励“开始做起来”，打破拖延症

---

#### ⚙️ 6. **Smart & Minimalist Fitness Gear（智能+极简健身装备）**

* **展示**：

  * 智能跳绳
  * 蓝牙体脂秤
  * 可折叠健身设备
* **目的**：突出“科技 x 空间效率 x 高性价比”

---

#### 🧩 7. **IKEA & Dollar Store Fitness Hacks（创意低成本健身创意）**

* **内容**：

  * Ikea改造家庭健身角
  * Dollar store健身装备合集
* **吸引力**：创意生活、低门槛、视觉化强

---

#### 📚 8. **Editor's Picks / Expert Guides（编辑推荐 / 入门指南）**

* **内容**：

  * “What You Really Need to Set Up Your First Home Gym”
  * “The Ultimate Guide to Space-Saving Fitness”
* **目的**：吸引新手用户、建立权威感

---

#### 📧 9. **Join the Fit-At-Home Movement（订阅 CTA + 社区互动）**

* **内容**：

  * 订阅最新指南
  * 提交你的健身角照片（UGC）
  * 每周挑战通知
* **形式**：表单、按钮、互动组件

---


### 2. 搜索页（Search）

搜索结果数、结果列表

### 3. 详情页（Detail）

左右分栏布局：左为文章详情，右为快捷入口板块

## 四、Redux状态设计

store按照首页、分类页、搜索页、详情页划分

- 首页数据：包含JSON中所有数据，并从中抽取出适合的板块做划分
- 分类页包含：Affordable Home Gym Setups、Family & Kids Friendly Workouts、Strength Training Without Equipment、Motivation & Habit Building Tips，各个分类页的数据从Home-Fitness.json中找到对应的分类数据
- 详情页
- 搜索页：只搜索文章的标题
```

2. 核心Slice

- homeSlice（管理首页数据）
- searchSlice（管理搜索数据）
- categorySlice（管理分类数据）
- detailSlice（管理详情数据）
- cacheSlice（管理本地缓存）

## 五、响应式方案

1. 断点策略

- 移动端：<768px（单列布局）
- 平板：768px-1024px（双列布局）
- 桌面端：>1024px（多列布局）

2. 适配方案

- 弹性网格系统（auto-fill布局）
- 触控优化（滑动组件）
- 视口单位适配（vw/vh计算）
- 媒体查询降级策略

## 六、数据管理

数据参考src/app/data/Home-Fitness.json中数据字段

2. 数据交互流程

```
组件 → 发起Action → Redux Middleware → 读取JSON → 更新Store → 驱动UI
```

## 七、开发里程碑

1. 阶段一：基础架构

- 按照当前的技术栈Nextjs的技术栈，不要引入其他多余的技术栈
- css样式采用css module，通过链接样式文件的方式

2. 阶段二：核心功能

- 首页模块开发
- 搜索系统实现
- 详情页数据绑定
- 移动端适配测试

3. 阶段三：体验优化

- 加载状态管理
- 交互动效植入
- 性能优化（虚拟滚动/图片懒加载）
- 错误边界处理

该方案在保持暗黑系视觉风格的同时，通过Redux实现跨组件状态管理，CSS Modules确保样式隔离性。关键创新点在于将本地JSON数据与Redux工作流深度整合，为后续接入真实API预留扩展接口。该方案在保持暗黑系视觉风格的同时，通过Redux实现跨组件状态管理，CSS Modules确保样式隔离性。关键创新点在于将本地JSON数据与Redux工作流深度整合，为后续接入真实API预留扩展接口。
