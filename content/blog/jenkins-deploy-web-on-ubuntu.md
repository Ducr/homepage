---
title: 使用 Jenkins 在 Ubuntu 云服务器上部署前端 Web 应用
date: "2025-12-05"
category: "Jenkins"
tags: ["Jenkins", "CI/CD", "前端部署", "Ubuntu", "Nginx"]
excerpt: "在 Ubuntu 服务器上安装、配置 Jenkins，并结合 Nginx 反向代理与 Git 凭据完成前端项目的一键构建与发布。"
---

# 使用 Jenkins 在 Ubuntu 云服务器上部署前端 Web 应用

本文介绍如何在 **Ubuntu 云服务器** 上安装、配置并使用 Jenkins 来可视化部署前端 Web 应用，覆盖安装、反向代理、凭据管理、构建流水线与自动触发。

---

## 📋 适用场景与前置

- 系统：Ubuntu 20.04+
- 应用：前端 Web 项目（Vue / React / Next.js 等）
- 部署：Jenkins 自动化构建 + Nginx 反向代理
- 域名：已准备好 HTTPS 证书（如使用 Let’s Encrypt）

---

## 🧩 环境信息

- 系统：Ubuntu 20.04+
- 应用类型：前端 Web 项目  
- 部署方式：Jenkins 自动化构建 + Nginx 反向代理  

---

## 🚀 一、安装 Jenkins

### 1. 更新系统并安装依赖

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk curl gnupg2
```

### 2. 添加 Jenkins 官方源

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
```

### 3. 安装 Jenkins

```bash
sudo apt update
sudo apt install -y jenkins
```

### 4. 启动 Jenkins 服务

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

默认端口：**8080**。  
浏览器访问：<http://服务器IP:8080>

---

## 🌐 二、配置 Jenkins 前端访问路径（可选前缀）

如果你通过 **Nginx 反向代理**，想让 Jenkins 通过 HTTPS 域名访问（例如 `https://ducrong.com/jenkins/`），需要修改 Jenkins 的启动参数。

### 1. 编辑 Jenkins 服务文件

```bash
sudo systemctl edit jenkins
```

### 2. 添加以下内容

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/java -Djava.awt.headless=true -jar /usr/share/java/jenkins.war --webroot=/var/cache/jenkins/war --httpPort=8080 --prefix=/jenkins
```

### 3. 重载并重启服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart jenkins
```

---

## 🔁 三、Nginx 反向代理配置

在 Nginx 配置文件中添加 Jenkins 反向代理：

```nginx
server {
    listen 443 ssl;
    server_name ducrong.com;

    ssl_certificate     /etc/letsencrypt/live/ducrong.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ducrong.com/privkey.pem;

    # Jenkins 管理界面反向代理
    location /jenkins/ {
        proxy_pass http://127.0.0.1:8080/jenkins/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # 可选：去掉末尾斜杠时自动重定向
    location = /jenkins {
        return 301 /jenkins/;
    }
}
```

重启 Nginx：

```bash
sudo systemctl restart nginx
```

此时访问：**<https://ducrong.com/jenkins/>**

---

## 🔑 四、配置 Git 凭据（Jenkins 全局凭据）

### 1. 进入 Jenkins 控制台 → 凭据（Credentials）

路径：  
`Jenkins 首页 → Manage Jenkins → Credentials → System → Global credentials → Add Credentials`

### 2. 两种常用方式

#### ✅ 方式 A：SSH Key

- **Kind**: SSH Username with private key  
- **Username**: git  
- **Private Key**: 粘贴生成的私钥内容  
- **ID**: github_homepage_ssh  

> 公钥需添加到 GitHub 仓库的 “Deploy Keys” 或 “SSH Keys” 中。

#### ✅ 方式 B：GitHub Token

- **Kind**: Secret text  
- **Secret**: 粘贴 GitHub Personal Access Token  
- **ID**: github_homepage_token

### 3. 在 Job 中使用凭据

进入你的项目 → 配置 → “源码管理” → Git：  

- Repository URL: `https://github.com/Ducr/homepage.git`  
- Credentials: 选择刚刚创建的凭据  
- Branches to build: `*/master` 或 `*/main`  

---

## 🧱 五、配置构建步骤（自由风格 Shell）

在 “构建” 部分添加 Shell 命令：

```bash
#!/bin/bash
set -xe

# 1️⃣ 进入项目目录
cd /home/homepage

# 2️⃣ 拉取最新代码
git pull origin master

# 3️⃣ 安装依赖
npm install

# 4️⃣ 构建项目
npm run build

# 5️⃣ 使用 pm2 启动
pm2 stop homepage || true
pm2 start npm --name homepage -- run start -- -H 0.0.0.0 -p 4000
```

---

## 🔔 六、自动触发构建（可选 Webhook）

启用 GitHub Webhook：  
在 GitHub 仓库中设置：  
`Settings → Webhooks → Add webhook`  

Payload URL 填写：  

```text
https://ducrong.com/jenkins/github-webhook/
```

Content type: `application/json`  
勾选：`Just the push event`  

Jenkins 项目中勾选：**GitHub hook trigger for GITScm polling**  

---

## ✅ 七、测试构建与验证

点击 “立即构建 (Build Now)” 检查：  

- 是否能正常拉取代码  
- 是否能自动构建并部署  

---
