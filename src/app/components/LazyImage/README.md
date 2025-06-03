# LazyImage 组件

这是一个增强的懒加载图片组件，基于 OptimizedImage 构建，提供真正的按需加载和优雅的渐变体验。

## 功能特性

- 🚀 **真正的懒加载**: 使用 Intersection Observer API，只有当图片即将进入视口时才开始加载
- 🎨 **渐变加载效果**: 支持 skeleton 动画、blur 占位符和无占位符模式
- 📱 **响应式优化**: 继承 OptimizedImage 的所有优化特性
- 🎯 **智能预加载**: 支持 priority 属性用于关键图片的立即加载
- 🛡️ **错误处理**: 优雅的错误状态显示
- ⚡ **性能优化**: 减少不必要的网络请求，提升页面加载速度

## 使用方法

### 基础用法

```tsx
import LazyImage from '../LazyImage';

// 使用 skeleton 占位符（默认）
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <LazyImage
    src="/path/to/image.jpg"
    alt="图片描述"
    fill
    className="your-css-class"
  />
</div>
```

### 不同占位符效果

```tsx
// Skeleton 动画效果（推荐）
<LazyImage
  src="/path/to/image.jpg"
  alt="图片描述"
  fill
  placeholder="skeleton"
/>

// Blur 占位符效果
<LazyImage
  src="/path/to/image.jpg"
  alt="图片描述"
  fill
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// 无占位符
<LazyImage
  src="/path/to/image.jpg"
  alt="图片描述"
  fill
  placeholder="none"
/>
```

### 关键图片优先加载

```tsx
// 对于首屏关键图片，使用 priority 属性
<LazyImage
  src="/hero-image.jpg"
  alt="Hero图片"
  fill
  priority={true}  // 立即加载，不等待进入视口
  placeholder="blur"
/>
```

### 自定义加载触发时机

```tsx
<LazyImage
  src="/path/to/image.jpg"
  alt="图片描述"
  fill
  threshold={0.2}  // 当图片20%进入视口时开始加载
  rootMargin="100px"  // 提前100px开始加载
/>
```

### 加载事件处理

```tsx
<LazyImage
  src="/path/to/image.jpg"
  alt="图片描述"
  fill
  onLoad={() => console.log('图片加载完成')}
  onError={() => console.log('图片加载失败')}
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `src` | string | - | 图片源地址（必需） |
| `alt` | string | - | 图片替代文本（必需） |
| `fill` | boolean | false | 是否填充父容器 |
| `width` | number | - | 图片宽度 |
| `height` | number | - | 图片高度 |
| `className` | string | - | CSS 类名 |
| `priority` | boolean | false | 是否优先加载（跳过懒加载） |
| `sizes` | string | 自动生成 | 响应式尺寸配置 |
| `objectFit` | string | 'cover' | 图片填充模式 |
| `style` | CSSProperties | - | 内联样式 |
| `placeholder` | 'blur' \| 'skeleton' \| 'none' | 'skeleton' | 占位符类型 |
| `blurDataURL` | string | - | blur 占位符的数据URL |
| `threshold` | number | 0.1 | Intersection Observer 触发阈值 |
| `rootMargin` | string | '50px' | Intersection Observer 根边距 |
| `onLoad` | function | - | 图片加载完成回调 |
| `onError` | function | - | 图片加载失败回调 |

## 占位符类型详解

### 1. Skeleton 动画（推荐）
- 显示流动的灰色渐变动画
- 适用于大多数场景
- 提供良好的视觉反馈

### 2. Blur 占位符
- 显示模糊的低质量图片
- 需要提供 `blurDataURL`
- 适用于有预览图的场景

### 3. 无占位符
- 仅显示纯色背景
- 最小化的视觉效果
- 适用于简洁设计

## 性能优化原理

### 1. Intersection Observer
- 使用原生 API 监听元素进入视口
- 比传统的 scroll 事件监听更高效
- 自动处理节流和防抖

### 2. 智能加载策略
- `priority` 图片立即加载
- 非 `priority` 图片等待进入视口
- 支持提前加载（rootMargin）

### 3. 渐变体验
- 平滑的透明度过渡
- 避免突兀的图片出现
- 提升用户体验

## 最佳实践

### ✅ 推荐做法

1. **首屏图片使用 priority**:
   ```tsx
   <LazyImage src="hero.jpg" alt="Hero" fill priority />
   ```

2. **列表图片使用懒加载**:
   ```tsx
   <LazyImage src="item.jpg" alt="Item" fill placeholder="skeleton" />
   ```

3. **合理设置 rootMargin**:
   ```tsx
   <LazyImage src="image.jpg" alt="Image" fill rootMargin="100px" />
   ```

### ❌ 避免的做法

1. **所有图片都设置 priority**:
   ```tsx
   // 错误：失去懒加载的意义
   <LazyImage priority />
   ```

2. **过小的 rootMargin**:
   ```tsx
   // 错误：可能导致用户看到加载过程
   <LazyImage rootMargin="0px" />
   ```

## 与 OptimizedImage 的区别

| 特性 | OptimizedImage | LazyImage |
|------|----------------|-----------|
| 基础优化 | ✅ | ✅ (继承) |
| 真正懒加载 | ❌ | ✅ |
| 占位符效果 | ❌ | ✅ |
| 渐变动画 | ❌ | ✅ |
| 错误处理 | 基础 | 增强 |
| 性能影响 | 低 | 极低 |

## 迁移指南

从 OptimizedImage 迁移到 LazyImage 非常简单：

```tsx
// 之前
<OptimizedImage src="image.jpg" alt="Image" fill />

// 之后
<LazyImage src="image.jpg" alt="Image" fill />
```

对于关键图片，添加 priority 属性：

```tsx
// 关键图片
<LazyImage src="hero.jpg" alt="Hero" fill priority />
``` 