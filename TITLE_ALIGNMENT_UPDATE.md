# 页面标题对齐和语言修改说明

## 修改内容

根据用户要求，对footer中三个链接页面进行了以下修改：

### 1. About Us页面 (`/about-us`)
- **标题语言**：将中文标题"关于我们"改为英文"About Us"
- **对齐方式**：标题居左对齐
- **保留功能**：继续使用DocumentPage组件和JSON数据渲染

### 2. Terms of Service页面 (`/terms-of-service`)
- **删除中文标题**：移除页面顶部的"服务条款"标题
- **直接渲染内容**：JSON数据中的markdown内容直接渲染，包含原有的英文标题
- **布局保持**：使用相同的页面布局样式

### 3. Privacy Policy页面 (`/privacy-policy`)
- **删除中文标题**：移除页面顶部的"隐私政策"标题
- **直接渲染内容**：JSON数据中的markdown内容直接渲染，包含原有的英文标题
- **布局保持**：使用相同的页面布局样式

## 技术实现

### 1. About Us页面修改
```typescript
// 修改前
<DocumentPage 
  title="关于我们" 
  content={aboutUsData.content} 
/>

// 修改后
<DocumentPage 
  title="About Us" 
  content={aboutUsData.content} 
/>
```

### 2. Terms of Service和Privacy Policy页面修改
```typescript
// 修改前 - 使用DocumentPage组件
<DocumentPage 
  title="服务条款" 
  content={agreementData.content} 
/>

// 修改后 - 直接使用MarkdownRenderer
<div className={styles.page}>
  <div className="container">
    <div className={styles.content}>
      <MarkdownRenderer content={agreementData.content} className={styles.documentContent} />
    </div>
  </div>
</div>
```

### 3. CSS样式修改
```css
/* 修改前 - 居中对齐 */
.pageTitle {
  text-align: center;
}

.pageTitle::after {
  left: 50%;
  transform: translateX(-50%);
}

/* 修改后 - 居左对齐 */
.pageTitle {
  text-align: left;
}

.pageTitle::after {
  left: 0;
}
```

## 页面效果

### About Us页面
- 显示英文标题"About Us"，居左对齐
- 标题下方有彩色装饰线，从左侧开始
- 内容正常渲染markdown格式

### Terms of Service页面
- 无额外页面标题
- 直接显示JSON中的markdown内容
- 内容以"# Terms of Service"开头（来自JSON数据）

### Privacy Policy页面
- 无额外页面标题
- 直接显示JSON中的markdown内容
- 内容以"# Privacy Policy"开头（来自JSON数据）

## 文件修改列表

1. `src/app/about-us/page.tsx` - 修改标题为英文
2. `src/app/terms-of-service/page.tsx` - 移除中文标题，直接渲染内容
3. `src/app/privacy-policy/page.tsx` - 移除中文标题，直接渲染内容
4. `src/app/components/DocumentPage.module.css` - 修改标题对齐方式

## 用户体验改进

1. **语言一致性**：About Us页面使用英文标题，与网站整体英文风格保持一致
2. **内容简洁性**：Terms of Service和Privacy Policy页面移除重复的中文标题，避免与JSON内容中的英文标题重复
3. **视觉对齐**：标题居左对齐，符合常见的文档阅读习惯
4. **保持功能**：所有页面的markdown渲染功能和样式保持不变

## 测试建议

访问以下页面验证修改效果：
- `/about-us` - 检查英文标题和左对齐效果
- `/terms-of-service` - 确认无中文标题，内容正常显示
- `/privacy-policy` - 确认无中文标题，内容正常显示 