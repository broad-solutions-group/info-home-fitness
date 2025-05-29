# Home Fitness - 家庭健身信息网站

一个专注于家庭健身的英文信息网站，为预算有限的健身爱好者、小空间居住者、有孩子的家庭和健身初学者提供实用的健身指导。

## 🎯 项目特色

- **目标用户明确**: 预算有限的健身爱好者、小空间居住者、家庭用户、健身初学者
- **内容丰富**: 经济实惠的家庭健身房设置、家庭友好型锻炼、无器械力量训练、动机建设技巧
- **响应式设计**: 移动优先的设计理念，完美适配各种设备
- **现代技术栈**: Next.js 14 + TypeScript + CSS Modules
- **SEO 优化**: 完整的元数据和静态生成支持

## 🎨 设计规范

### 颜色方案
- **主绿色**: #4AB19D - 代表健康和活力
- **主橙色**: #FF7E5F - 代表能量和动力
- **浅灰背景**: #F5F5F5 - 提供清洁的视觉体验
- **深蓝文字**: #34495E - 确保良好的可读性
- **强调黄色**: #F9D342 - 用于突出重要信息

### 字体系统
- **标题字体**: Poppins - 现代、清晰的无衬线字体
- **正文字体**: Open Sans - 易读的正文字体
- **强调字体**: Montserrat - 用于特殊强调

## 📁 项目结构

```
src/
├── app/
│   ├── components/          # 可复用组件
│   │   ├── Header/         # 头部导航组件
│   │   └── ArticleCard/    # 文章卡片组件
│   ├── services/           # 数据服务
│   │   └── dataService.ts  # 数据处理服务
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts        # 全局类型
│   ├── data/               # 数据文件
│   │   └── Home-Fitness.json # 文章数据
│   ├── category/[slug]/    # 分类页面
│   ├── article/[id]/       # 文章详情页
│   ├── search/             # 搜索页面
│   ├── page.tsx            # 首页
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式
│   └── not-found.tsx       # 404 页面
```

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 📄 页面结构

### 首页 (/)
- **英雄横幅**: 展示网站主题和价值主张
- **热门文章**: 精选的热门健身文章
- **分类预览**: 四个主要分类的文章预览
- **订阅区域**: 邮件订阅表单

### 分类页面 (/category/[slug])
- **分类介绍**: 分类描述和特色
- **文章列表**: 该分类下的所有文章
- **排序功能**: 按日期、热度等排序
- **相关分类**: 推荐其他相关分类

### 搜索页面 (/search)
- **搜索结果**: 基于关键词的文章搜索
- **搜索建议**: 热门搜索词推荐
- **分类浏览**: 当无搜索结果时的分类导航

### 文章详情页 (/article/[id])
- **文章内容**: 完整的文章内容展示
- **侧边栏**: 快速导航、订阅表单、热门文章
- **相关文章**: 同分类或相关主题的文章推荐
- **分享功能**: 社交媒体分享按钮

## 🎯 主要功能

### 1. 响应式导航
- 桌面端水平导航菜单
- 移动端汉堡菜单
- 集成搜索功能

### 2. 智能搜索
- 实时搜索文章标题和描述
- 搜索结果高亮显示
- 搜索建议和热门词汇

### 3. 文章管理
- 基于 JSON 的数据管理
- 分类筛选和排序
- 相关文章推荐算法

### 4. SEO 优化
- 动态元数据生成
- 静态页面生成 (SSG)
- 语义化 HTML 结构

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: CSS Modules
- **字体**: Google Fonts (Poppins, Open Sans, Montserrat)
- **部署**: Cloudflare Workers (可选)

## 📊 数据结构

### 文章 (Article)
```typescript
interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  duration: string;
  status: number;
  createTime: string;
  updateTime: string;
}
```

### 分类 (Category)
```typescript
interface Category {
  id: number;
  name: string;
  articles: Article[];
}
```

## 🎨 组件设计

### ArticleCard 组件
- **变体**: default, featured, compact
- **功能**: 图片展示、标题、描述、元数据
- **交互**: 悬停效果、点击跳转

### Header 组件
- **导航**: 主菜单、移动菜单
- **搜索**: 实时搜索表单
- **响应式**: 自适应不同屏幕尺寸

## 🚀 部署指南

### Cloudflare Workers 部署
```bash
npm run build
npm run deploy
```

### 其他平台部署
项目支持部署到任何支持 Next.js 的平台，如 Vercel、Netlify 等。

## 📝 内容管理

文章内容存储在 `src/app/data/Home-Fitness.json` 文件中。要添加新文章：

1. 在相应分类的 `articles` 数组中添加新文章对象
2. 确保 `id` 唯一
3. 提供完整的文章信息（标题、描述、内容、图片等）

## 🔧 自定义配置

### 颜色主题
在 `src/app/globals.css` 中修改 CSS 变量：

```css
:root {
  --primary-green: #4AB19D;
  --primary-orange: #FF7E5F;
  --bg-light-gray: #F5F5F5;
  --text-dark-blue: #34495E;
  --accent-yellow: #F9D342;
}
```

### 字体配置
在 `src/app/layout.tsx` 中修改 Google Fonts 导入。

## 📱 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)
- 移动端浏览器

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-username/info-home-fitness/issues)
- 邮箱: your-email@example.com

---

**Home Fitness** - 让家庭健身变得简单、经济、有效！ 🏠💪
