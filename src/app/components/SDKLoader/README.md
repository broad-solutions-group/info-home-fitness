# SDK集成文档

## 概述

本SDK集成方案遵循以下架构原则：
- **第一性原理**: 从基本需求出发，构建最简洁有效的解决方案
- **DRY原则**: 避免重复代码，将SDK逻辑集中管理
- **KISS原则**: 保持简单直接的实现
- **SOLID原则**: 单一职责、开闭原则等
- **YAGNI原则**: 只实现必要的功能

## 问题解决

### 修复的问题
在初始实现中遇到了 "Event handlers cannot be passed to Client Component props" 错误。这是因为在Next.js App Router中，服务端组件（layout.tsx）不能直接传递事件处理函数给客户端组件（SDKLoader）。

### 解决方案
1. **移除外部事件处理器**: 从layout.tsx中移除了onLoad和onError回调函数
2. **内置事件处理**: 将日志记录逻辑内置到SDKLoader组件中
3. **保持功能完整**: 确保所有原有功能（调试日志、错误处理）仍然正常工作

## 架构设计

### 组件结构
```
src/app/
├── components/
│   ├── SDKLoader/           # SDK加载器组件
│   │   ├── SDKLoader.tsx    # 主要加载组件
│   │   └── README.md        # 文档
│   └── SDKExample/          # 使用示例组件
│       └── SDKExample.tsx
├── hooks/
│   └── useSDK.ts           # SDK管理Hook
├── types/
│   └── sdk.ts              # TypeScript类型定义
└── sdk-test/               # SDK测试页面
    └── page.tsx
```

### 设计原则

1. **单一职责原则**: 每个组件只负责一个特定功能
   - `SDKLoader`: 负责脚本加载
   - `useSDK`: 负责状态管理和API调用
   - `types/sdk.ts`: 负责类型定义

2. **关注点分离**: 将UI、逻辑和类型分离
3. **可配置性**: 通过环境变量和配置对象控制行为
4. **错误处理**: 完善的错误处理和回退机制
5. **性能优化**: 使用Next.js Script组件优化加载

## 使用方法

### 1. 基本集成

SDK已在 `layout.tsx` 中全局引入，无需额外配置即可使用。

### 2. 环境变量配置

创建 `.env.local` 文件：
```env
# 是否启用SDK
NEXT_PUBLIC_SDK_ENABLED=true

# 是否启用调试模式
NEXT_PUBLIC_SDK_DEBUG=false
```

### 3. 测试SDK集成

访问 `/sdk-test` 页面来测试SDK是否正常工作：
```
http://localhost:3000/sdk-test
```

### 4. 在组件中使用SDK

```tsx
import { useSDK } from '../hooks/useSDK';

const MyComponent = () => {
  const { status, trackEvent } = useSDK({
    enabled: true,
    environment: 'production',
    debug: false
  });

  const handleClick = () => {
    trackEvent('button_click', {
      component: 'MyComponent',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div>
      <p>SDK状态: {status.isLoaded ? '已加载' : '加载中'}</p>
      <button onClick={handleClick}>追踪点击</button>
    </div>
  );
};
```

### 5. 自定义配置

```tsx
<SDKLoader 
  config={{
    enabled: true,
    environment: 'production',
    debug: false
  }}
/>
```

## API参考

### SDKLoader Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| config | Partial<SDKConfig> | {} | SDK配置对象 |

### SDKConfig 接口

```typescript
interface SDKConfig {
  enabled: boolean;           // 是否启用SDK
  environment: 'development' | 'production'; // 环境
  debug?: boolean;           // 是否启用调试
}
```

### useSDK Hook

```typescript
const {
  status,        // SDK状态
  trackEvent,    // 事件追踪方法
  handleSDKLoad, // 加载成功处理
  handleSDKError // 加载失败处理
} = useSDK(config);
```

## 最佳实践

1. **性能优化**
   - 使用 `afterInteractive` 策略延迟加载
   - 避免阻塞页面渲染

2. **错误处理**
   - 内置错误处理和日志记录
   - 在生产环境中优雅降级

3. **调试**
   - 开发环境启用调试模式
   - 使用浏览器开发者工具查看日志

4. **类型安全**
   - 使用TypeScript类型定义
   - 确保API调用的类型安全

5. **Next.js兼容性**
   - 避免在服务端组件中传递函数给客户端组件
   - 使用内置事件处理而非外部回调

## 故障排除

### 常见问题

1. **"Event handlers cannot be passed to Client Component props" 错误**
   - 原因：服务端组件向客户端组件传递函数
   - 解决：使用内置事件处理，避免传递外部函数

2. **SDK未加载**
   - 检查网络连接
   - 确认URL是否正确
   - 查看浏览器控制台错误

3. **事件追踪不工作**
   - 确认SDK已加载完成
   - 检查全局对象是否存在
   - 验证事件数据格式

4. **性能问题**
   - 确认使用了正确的加载策略
   - 避免在关键渲染路径中加载

### 调试技巧

1. 启用调试模式查看详细日志
2. 使用浏览器网络面板检查请求
3. 检查全局对象 `window.broadSolutionsSDK`
4. 访问 `/sdk-test` 页面进行功能测试

## 测试验证

### 开发环境测试
1. 运行 `npm run dev`
2. 访问 `http://localhost:3000/sdk-test`
3. 打开浏览器开发者工具
4. 查看Console中的SDK加载日志
5. 观察页面右下角的SDK状态指示器
6. 点击测试按钮验证事件追踪

### 生产环境测试
1. 运行 `npm run build`
2. 确保构建成功无错误
3. 部署到生产环境
4. 验证SDK在生产环境中正常工作

## 更新和维护

1. **版本管理**: 通过URL版本控制SDK更新
2. **向后兼容**: 保持API接口稳定
3. **监控**: 添加错误监控和性能监控
4. **测试**: 定期测试SDK功能和性能 