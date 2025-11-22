---
title: 使用 GitHub Pages 自动部署项目与文档站
date: "2025-11-22"
category: "GitHub Pages"
tags: ["GitHub Actions", "Pages 部署", "前端部署", "CI/CD"]
excerpt: "介绍如何通过 GitHub Actions 实现主站与文档站自动构建与部署，并正确配置 GitHub Pages 的 gh-pages 分支。"
---

# GitHub Pages 自动部署教程

本文档将详细介绍如何通过 **GitHub Actions** 自动构建并发布：

- 主站（build 目录）
- 文档站（docs/.vitepress/dist）

并正确配置 GitHub Pages 使用 **gh-pages 分支下的 `/root` 路径作为部署来源**。

---

## 🧪 在线示例

以下为本教程对应的真实示例仓库与站点，方便你直接查看部署效果：

- [react-antd-admin 仓库](https://github.com/Ducr/react-antd-admin)
- [react-antd-admin 主站](https://ducr.github.io/react-antd-admin/)
- [react-antd-admin 文档](https://ducr.github.io/react-antd-admin/docs/)

---


## 📋 介绍

本文教程适用于以下项目场景：

- 使用 pnpm 管理依赖  
- 主站通过 `pnpm run build` 产物生成到 `/build`  
- 文档站使用 VitePress，构建产物在 `/docs/.vitepress/dist`
- 使用 `github-pages-deploy-action` 自动部署到 Pages
- **部署触发方式为推送 tag：`v*`**

最终效果为：

- 主站访问地址：  
  `https://<username>.github.io/<repo>/`
- 文档站访问地址：  
  `https://<username>.github.io/<repo>/docs/`

---

## 🛠️ 启用 GitHub Pages（重点：正确的 Source 配置）

完成部署之后，你需要在仓库中启用 GitHub Pages。

进入：

**Settings → Pages**

修改如下配置：

- **Source：Deploy from a branch**
- **Branch：选择 gh-pages 分支**
- **文件夹：/root**

如下为示例配置：

```
Source: Deploy from a branch
Branch: gh-pages / (root)
```

> ⚠️ **重要说明**：  
> 由于本教程使用 `JamesIves/github-pages-deploy-action`，它会自动创建并维护 `gh-pages` 分支，因此必须选择该分支作为 Pages 部署来源。

---

## 🔧 项目结构示例

假设你的仓库结构如下：

```
project
├─ docs
│  └─ .vitepress
│       └─ dist     # 文档站构建产物
├─ build             # 主站构建产物
├─ package.json
└─ pnpm-workspace.yaml
```

- 主站输出目录：`build/`
- 文档站输出目录：`docs/.vitepress/dist`

---

## ⚙️ GitHub Actions 自动部署流程说明

### 1）触发条件

```yml
on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:
```

- 当你推送形如 `v1.0.0` 的 tag 时自动触发部署  
- 可在 Actions 页面手动执行

---

### 2）Node 环境 + pnpm 安装

```yml
- uses: pnpm/action-setup@v2
- uses: actions/setup-node@v4
  with:
    node-version: lts/*
    cache: pnpm
```

使用 LTS 版本 Node，并缓存 pnpm 依赖。

---

### 3）构建项目

```yml
pnpm install -r
pnpm run build && pnpm --filter docs run docs:build
```

- 安装所有依赖
- 构建主站
- 构建文档站

---

### 4）部署主站

```yml
- uses: JamesIves/github-pages-deploy-action@v4
  with:
    folder: build
    clean: true
```

部署到 gh-pages 分支的根目录 `/`.

---

### 5）部署文档站

```yml
- uses: JamesIves/github-pages-deploy-action@v4
  with:
    clean: true
    folder: docs/.vitepress/dist
    target-folder: docs
```

- 部署到 gh-pages 分支的`/docs`目录
- 最终访问路径为：

```
https://<username>.github.io/<repo>/docs/
```

---

## 📄 完整 deploy.yml 文件

```yml
name: Build and Deploy

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-and-deploy:
    concurrency: ci-${{ github.ref }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: pnpm

      - name: Install and Build 🔧
        run: |
          pnpm install -r
          pnpm run build && pnpm --filter docs run docs:build

      - name: Deploy 🚀 主站
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build
          clean: true

      - name: Deploy Docs 🚀 文档站
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          clean: true
          folder: docs/.vitepress/dist
          target-folder: docs
```

---

## 🧪 如何触发部署？

### 方法一：推送 tag（自动部署）

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 方法二：手动部署

进入仓库：

**Actions → Build and Deploy → Run workflow**

---

## 🎉 总结

本教程展示了如何：

- 使用 GitHub Actions 自动构建与部署主站 + 文档站
- 配置 GitHub Pages 使用 `gh-pages` 分支 `/root` 作为 Source
- 通过 tag 控制版本化发布流程
- 使用 pnpm 与 Node LTS 加快构建速度

