# Cloudflare Pages 部署指南

本项目已配置为使用 Cloudflare Pages 进行静态部署。

## 🚀 部署方式

### 方式一：通过 Cloudflare Dashboard（推荐）

1. **登录 Cloudflare Dashboard**
   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 登录您的账户

2. **创建新项目**
   - 点击 "Pages" 
   - 选择 "Create a project"
   - 选择 "Connect to Git"

3. **连接 Git 仓库**
   - 选择您的 Git 提供商（GitHub、GitLab 等）
   - 授权 Cloudflare 访问您的仓库
   - 选择 `info-home-fitness` 仓库

4. **配置构建设置**
   - **项目名称**: `info-home-fitness`（或您喜欢的名称）
   - **生产分支**: `main` 或 `master`
   - **框架预设**: `Next.js`
   - **构建命令**: `npm run build`
   - **构建输出目录**: `out`
   - **Node.js 版本**: `18` 或更高

5. **环境变量配置**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

6. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成

### 方式二：通过 Wrangler CLI

1. **安装 Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **部署到 Pages**
   ```bash
   wrangler pages deploy out --project-name=info-home-fitness
   ```

## 📁 项目配置说明

### 关键配置文件

- **`next.config.mjs`**: 配置静态导出
- **`wrangler.toml`**: Cloudflare Pages 配置
- **`_headers`**: HTTP 头配置
- **`_redirects`**: 重定向规则
- **`scripts/generate-sitemap.js`**: 自动生成 sitemap

### 构建流程

1. `npm run build` - 执行 Next.js 静态构建
2. `npm run postbuild` - 生成 sitemap.xml
3. 输出目录: `out/`

## 🔧 自定义配置

### 修改域名

在 `scripts/generate-sitemap.js` 中修改 `siteUrl` 变量：

```javascript
const siteUrl = 'https://your-domain.com';
```

### 添加环境变量

在 Cloudflare Dashboard 的 Pages 项目设置中添加环境变量：

- `NEXT_PUBLIC_SITE_URL`: 您的网站 URL
- `NEXT_PUBLIC_SDK_ENABLED`: 是否启用 SDK
- `NEXT_PUBLIC_SDK_DEBUG`: 是否启用调试模式

### 自定义缓存策略

修改 `_headers` 文件来调整缓存策略：

```
# 静态资源长期缓存
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# HTML 页面短期缓存
/*.html
  Cache-Control: public, max-age=3600
```

## 📊 性能优化

### 已启用的优化

- ✅ 静态站点生成 (SSG)
- ✅ 图片懒加载
- ✅ 代码分割
- ✅ 资源压缩
- ✅ 缓存优化
- ✅ CDN 分发

### 监控和分析

- 使用 Cloudflare Analytics 监控性能
- 通过 Cloudflare Dashboard 查看访问统计
- 监控 Core Web Vitals 指标

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本（需要 18+）
   - 确保所有依赖已安装
   - 查看构建日志

2. **页面 404 错误**
   - 检查 `_redirects` 文件配置
   - 确保 SPA 路由正确配置

3. **资源加载失败**
   - 检查 `assetPrefix` 配置
   - 确保静态资源路径正确

### 调试命令

```bash
# 本地构建测试
npm run build

# 本地预览
npx serve out

# 检查构建输出
ls -la out/
```

## 📈 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 所有页面都能正确加载
- [ ] 图片和静态资源正常显示
- [ ] 搜索功能正常工作
- [ ] 移动端适配正常
- [ ] sitemap.xml 可访问
- [ ] 性能指标良好
- [ ] SEO 元数据正确

## 🔄 持续部署

配置完成后，每次推送到主分支都会自动触发部署：

1. 推送代码到 Git 仓库
2. Cloudflare Pages 自动检测变更
3. 执行构建流程
4. 部署到生产环境
5. 更新 CDN 缓存

## 📞 支持

如果遇到部署问题，请检查：

1. Cloudflare Pages 文档
2. Next.js 静态导出文档
3. 项目构建日志
4. 网络连接状态 