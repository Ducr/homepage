---
title: Qiankun 微前端改造落地方案
date: "2025-12-07"
category: "Qiankun"
tags: ["微前端", "qiankun", "Vue2", "React16", "改造实践"]
excerpt: "基于 qiankun-demo 的微前端拆解，可复制到其他项目的改造步骤与注意事项。"
---

# Qiankun 微前端改造落地方案

本文基于仓库中的 **qiankun-demo** 总结微前端改造的完整落地路径，可直接复用到其他项目。基座使用 **Vue2**，子应用分别为 **Vue2** 与 **React16**，支持本地联调、构建打包、全局状态同步与资源路径隔离。

---

## 🧩 改造目标与适用场景

- 基座：Vue 单页应用，需承载多个子应用并控制导航、加载态与全局状态。
- 子应用：可独立运行，也可被基座托管；需适配公共资源路径、路由基准、生命周期导出。
- 通信：需要跨应用共享用户/菜单等全局状态。
- 构建/发布：一键安装、启动、打包，最终产物统一收敛到 `dist/` 目录。
- 在线演示：<https://ducrong.com/qiankun/>
- GitHub 仓库：<https://github.com/Ducr/qiankun-demo>

---

## 🗂️ 项目结构与关键文件

```
qiankun-demo
├─ main                    # 基座（Vue2）
│  ├─ src/main.js         # registerMicroApps + start
│  ├─ src/micro-app.js    # 子应用清单与 props 下发
│  ├─ src/store.js        # initGlobalState 全局状态
│  └─ src/App.vue         # 导航/加载态容器
├─ sub-vue                 # 子应用（Vue2）
│  ├─ src/main.js         # qiankun 生命周期 + 路由 base
│  ├─ src/public-path.js  # 动态 publicPath
│  └─ vue.config.js       # UMD 打包与跨域 headers
├─ sub-react               # 子应用（React16）
│  ├─ src/index.js        # qiankun 生命周期
│  ├─ src/public-path.js  # 动态 publicPath
│  └─ config-overrides.js # UMD 打包
├─ common                  # 公共 SDK + 全局 store 注册
└─ scripts                 # bundle/deploy 脚本
```

---

## 🏗️ 基座改造步骤（Vue2）

1. **注册子应用并启动 qiankun**

```js
// main/src/main.js
registerMicroApps(appsWithLoader, { beforeLoad, beforeMount, afterMount, afterUnmount })
start()
```

要点：
- 在 `main/src/micro-app.js` 维护子应用清单：`name`、`entry`（由环境变量注入）、`activeRule`、`container`、`props`。
- `props` 下发 `routerBase`、`getGlobalState`、`setGlobalState`，用于子应用路由基准与全局状态同步。

2. **全局加载态**

- 基座通过 `loader` 回调修改 `App.vue` 的 `isLoading`，结合 `nprogress` 实现子应用加载条。
- 对主应用内部导航，在重写 `history.pushState` 时也触发进度条，保持体验一致。

3. **路由占位与导航**

- `App.vue` 中保留 `#subapp-viewport` 作为子应用挂载点，主应用自己的页面通过 `router-view` 渲染。
- 导航栏使用 `history.pushState` 直接切换到对应的 `activeRule`，避免与子应用路由冲突。

4. **全局状态基座**

- 通过 `qiankun initGlobalState` 初始化可响应的全局状态，并下发 `getGlobalState/setGlobalState`。
- 监听 `onGlobalStateChange` 将变更同步回基座的可观察对象，确保 UI 实时更新。

---

## 🧭 子应用改造要点

### 通用要求

- **动态 publicPath**：`public-path.js` 根据 `window.__POWERED_BY_QIANKUN__` 设置运行时资源前缀，避免静态资源 404。
- **生命周期导出**：导出 `bootstrap`、`mount`、`unmount`（可选 `update`），并在 `mount` 内完成渲染。
- **独立运行兜底**：若非 qiankun 环境，仍可直接 `render()`，便于子应用单独开发调试。

### Vue 子应用（`sub-vue`）

- `vue.config.js`：设置 `library`/`libraryTarget: 'umd'`，关闭 `resolve.symlinks`，devServer 配置跨域 headers 与端口。
- `main.js`：
  - `base` 动态切换：qiankun 场景下使用 `routerBase`，独立运行使用 `process.env.BASE_URL`。
  - `commonStore.globalRegister(store, props)` 将基座状态注册到本地 Vuex 的 `global` 模块。
  - 独立运行时也注册 `global` 并模拟登录数据，保证两种模式一致。

### React 子应用（`sub-react`）

- `config-overrides.js`：设置 `library` 为 UMD、`publicPath` 为 `process.env.PUBLIC_URL`、关闭 HMR 以兼容 qiankun。
- `router/routers.js`：`basename` 取 `routerBase`（基座下发）或 `PUBLIC_URL`，确保 history 路由不与基座冲突。
- 在 `mount` 中透传 `props` 给 `App`，方便内部通过 `props.getGlobalState/setGlobalState` 进行通信。

---

## 🔗 全局状态共享（common 模块）

- `common/src/store/global-register.js` 提供 `globalRegister(store, props)`：
  - 初次挂载时将基座数据写入子应用的 `global` 命名空间。
  - `setGlobalState` 同步变更给基座；`initGlobalState` 在每次 mount 时刷新。
- 使用方式：在子应用 `mount` 时执行 `commonStore.globalRegister(store, props)`；独立运行时也调用一次以对齐数据结构。

---

## 🚦 路由与资源隔离策略

- **activeRule 前缀**：统一以 `/qiankun/sub-xxx` 作为激活规则，确保子应用路径不污染基座。
- **history 路由基准**：基座与子应用均使用 `history` 模式，并通过 `routerBase`/`basename` 隔离。
- **静态资源前缀**：运行时 `__webpack_public_path__` 指向 qiankun 注入的地址；生产环境避免硬编码根路径。
- **跨域与缓存**：开发服务器设置 `Access-Control-Allow-Origin: *`，便于多端口调试。

---

## 🛠️ 本地开发与构建

- 安装所有依赖：`npm run install`
- 本地联调（基座 + 子应用并行）：`npm start`
- 单独启动示例：
  - 基座：`cd main && npm start`
  - Vue 子应用：`cd sub-vue && npm start`
  - React 子应用：`cd sub-react && npm start`
- 构建全部产物：`npm run build`，并由 `scripts/bundle.sh` 将主/子应用产物收敛到 `dist/`：
  - `dist/main`：基座静态文件
  - `dist/subapp/sub-vue`、`dist/subapp/sub-react`：子应用静态文件

---

## 🚀 部署参考

- 默认脚本 `scripts/deploy.sh` 将 `dist/` 拷贝到服务器目录 `/home/www/web/qiankun`（可按需修改）。
- 若需挂载到 Nginx：
  - 基座可暴露 `/` 或 `/qiankun`。
  - 子应用静态目录映射 `/qiankun/subapp/sub-vue` 与 `/qiankun/subapp/sub-react`。
  - 确保开启 `history` 回退（`try_files $uri $uri/ /index.html`）。
- 线上示例 Nginx 配置（alias 方式）：

```nginx
# Qiankun重定向
location = /qiankun {
    return 301 /qiankun/main-app/;
}
location = /qiankun/ {
    return 301 /qiankun/main-app/;
}

# Qiankun主应用
location /qiankun/main-app/ {
    alias /home/www/web/qiankun/main/;
    index index.html;
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|map)$ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    try_files $uri $uri/ /index.html;
}

# Qiankun子应用
location /qiankun/subapp/ {
    alias /home/www/web/qiankun/subapp/;
    index index.html;
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|map)$ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    try_files $uri $uri/ /index.html;
}

# 处理其他 /qiankun 路径
location /qiankun {
    return 301 /qiankun/main-app/;
}
```

---

## 🧪 关键代码片段

```22:60:main/src/main.js
registerMicroApps(apps, {
  beforeLoad: app => console.log('before load', app.name),
  afterMount: app => console.log('[LifeCycle] after mount', app.name)
})
start()
```

```16:27:main/src/micro-app.js
const apps = microApps.map(item => ({
  ...item,
  container: '#subapp-viewport',
  props: { routerBase: item.activeRule, getGlobalState: store.getGlobalState, setGlobalState: store.setGlobalState }
}))
```

```24:55:sub-vue/src/main.js
export async function mount (props) {
  commonStore.globalRegister(store, props)
  render(props)
}
```

```10:21:sub-react/config-overrides.js
config.output.publicPath = process.env.PUBLIC_URL
config.output.library = `${name}-[name]`
config.output.libraryTarget = 'umd'
```

---

## ❓ 常见问题与排查

- 子应用静态资源 404：确认 `public-path.js` 已生效，生产构建未写死根路径。
- 路由跳转空白：检查是否使用了正确的 `routerBase`/`basename`，并确保 `activeRule` 与导航一致。
- 全局状态不同步：确认子应用在 `mount` 时调用 `globalRegister`，且变更通过 `setGlobalState` 发起。
- 跨域报错：开发环境需为子应用 devServer 添加 `Access-Control-Allow-Origin: *`，生产环境建议同域部署。

---

## 🎯 迁移步骤清单（可直接套用）

1) 为现有基座接入 `qiankun`：添加子应用清单、`registerMicroApps`、加载态与全局状态。  
2) 为每个子应用添加 `public-path.js`、导出 `bootstrap/mount/unmount`，打包改为 UMD。  
3) 调整子应用路由基准（Vue Router `base` / React Router `basename`），并暴露统一的 `activeRule`。  
4) 接入全局状态：基座 `initGlobalState`，子应用通过公共模块注册 `global` 并使用 `setGlobalState` 同步。  
5) 建立一键脚本：安装/启动/构建/收敛产物，必要时补充部署脚本与 Nginx 路由回退。  
6) 验证：分别在独立模式与基座模式下跑通路由、资源加载、状态同步与卸载流程。

---

## 🎉 总结

按照上述改造步骤，任何已有的 Vue 或 React 应用均可在不大改业务的情况下快速纳入 qiankun 微前端体系。保持统一的路由前缀、资源前缀和全局状态协议，是保证多技术栈应用稳定共存的关键。
