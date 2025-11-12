# 免费临时邮件

FreeTempMail 是一个基于NuxtPro模板开发的免费的临时邮箱服务，允许您创建一次性邮箱地址以保护您的隐私。无需注册，即时生成，自动接收邮件。清新🍃简约免费🆓无广告🚫用后即焚！再也不用因为被商家收集隐私而烦恼😎

- [👉 FreeTempMail线上版本地址](https://mail.aitre.cc)

- [👉 NuxtDir-AI导航站,免费提交推广你的产品](https://nuxtdir.com) 

- [👉 NuxtPro开版版本源码地址](https://github.com/PennyJoly/NuxtPro)

🚀 如果你在寻找基于Nuxt框架，且自带后台管理系统，前后端兼容友好的一站式出海Saas模板，不妨看看NuxtPro的商业版?(https://nuxtpro.com). NuxtPro商业版让您1小时快速上线MVP，验证需求，节省大量研发时间。NuxtPro专注于小而美的产品，让您有更多时间花在推广和运营上，搭配上主流的AI产品，一人公司即可高效地创收。

👉 NuxtPro 商业版 $40 刀 限时早鸟折扣券 -> https://x.com/PennyJoly

# 临时邮件图片

<img width="1404" height="849" alt="image" src="https://github.com/user-attachments/assets/e49b146c-c99d-49ba-a4fe-cc8c2eb6c2aa" />

## 🚀 如何快速开始项目

1. 克隆仓库地址:
```bash
git clone https://github.com/PennyJoly/FreeTempMail
```

2. 安装依赖:
```bash
npm install
# or
pnpm install
```

3. 将“.env.example”克隆，重命名为".env.dev",填入对应内容:
```bash
cp .env.example .env.dev
```

4. 启动运行服务:
```bash
npm run dev
```

浏览器里输入 http://localhost:3000 查看启动的FreeTempMail应用.

# 基础配置说明

```bash
# 环境配置，开发可写development，生产写production
NODE_ENV=development
NUXT_PUBLIC_ENV=development
# 你的准备部署的网站地址，用于seo e.g: mail.aitre.cc
NUXT_PUBLIC_BASE_URL=
# 你的域名邮箱地址 e.g:aitre.cc
NUXT_PUBLIC_DOMAIN_URL=
# 服务启动端口
PORT=3000
# PLAUSIBLE上配置的统计数据域名地址 (非必填)
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # e.g: mail.aitre.cc
# PLAUSIBLE 统计数据服务地址  (非必填)
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # e.g: https://plausible.io/
# 谷歌GSC统计分析网站验证码 (非必填)
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE=
```


# IMAP邮箱配置说明

## 概述

本临时邮箱系统通过IMAP协议连接到您指定的邮箱，获取转发到您配置邮箱的域名邮件。

## 环境变量配置

请在您的环境变量文件（如 `.env.dev` 或 `.env.prod`）中添加以下配置：

```bash
# IMAP服务器地址fv
IMAP_HOST=imap.example.com

# IMAP端口 (通常SSL为993，非SSL为143)
IMAP_PORT=993

# 你的接收邮箱用户名
IMAP_USERNAME=your-email@example.com

# 你的接收邮箱密码
IMAP_PASSWORD=your-password

# 是否启用TLS加密 (true/false)
IMAP_TLS=true
```

## 常见邮箱提供商配置示例

### Gmail
```bash
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USERNAME=your-gmail@gmail.com
IMAP_PASSWORD=your-app-password  # 注意：需要使用应用专用密码
IMAP_TLS=true
```

### Outlook/Hotmail
```bash
IMAP_HOST=outlook.office365.com
IMAP_PORT=993
IMAP_USERNAME=your-email@outlook.com
IMAP_PASSWORD=your-password
IMAP_TLS=true
```

### 163邮箱
```bash
IMAP_HOST=imap.163.com
IMAP_PORT=993
IMAP_USERNAME=your-email@163.com
IMAP_PASSWORD=your-password
IMAP_TLS=true
```

### QQ邮箱
```bash
IMAP_HOST=imap.qq.com
IMAP_PORT=993
IMAP_USERNAME=your-email@qq.com
IMAP_PASSWORD=your-authorization-code  # 注意：需要使用授权码
IMAP_TLS=true
```

## 重要注意事项

1. **应用专用密码**: 对于Gmail等服务，您需要启用2FA并生成应用专用密码。
2. **授权码**: 对于QQ邮箱、163邮箱等，需要在邮箱设置中生成授权码而不是使用登录密码。
3. **防火墙**: 确保服务器能够访问对应的IMAP端口。
4. **邮件转发**: 确保您的域名邮件已正确配置转发到指定邮箱。

## pm2部署

- 创建  `ecosystem.config.cjs` 文件 

```bash
module.exports = {
  apps:[{
    name:'tempMail',
    script:'.output/server/index.mjs',
    exec_mode:'cluster',
    env_production:{
        NODE_ENV:'production',
                NUXT_PUBLIC_ENV:'production',
                PORT:3000,
                NUXT_PUBLIC_PLAUSIBLE_DOMAIN:'你部署的临时邮箱连接到PLAUSIBLE的地址',
                NUXT_PUBLIC_PLAUSIBLE_API_HOST:'你的PLAUSIBLE地址',
                GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE:'你的谷歌控制台授权码',
                IMAP_HOST:'imap域名',
                IMAP_PORT:993,
                IMAP_USERNAME:'imap用户名',
                IMAP_PASSWORD:'imap授权验证码',
                IMAP_TLS:true
    }
  }]
};

```

- 创建pm2启动脚本 `start.sh` 文件

```bash
pm2 start ecosystem.config.cjs --env production
```

- 运行pm2启动脚本

```bash
sh start.sh
```

## 一键Vercel部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/PennyJoly/FreeTempMail)


## API接口

### 生成临时邮箱
- **POST** `/api/tempmail/generate`
- 返回一个新的临时邮箱地址

### 获取邮件列表
- **GET** `/api/tempmail/emails?email=临时邮箱地址`
- 获取指定临时邮箱的所有邮件

### 轮询新邮件
- **GET** `/api/tempmail/poll?email=临时邮箱地址&lastCheck=上次检查时间`
- 获取自上次检查以来的新邮件

### 测试IMAP配置
- **POST** `/api/tempmail/config`
- 测试IMAP连接配置是否正确

## 使用流程

1. 配置环境变量
2. 确保域名邮件转发到您的邮箱
3. 启动应用
4. 点击"生成新邮箱"按钮
5. 系统会自动轮询检查新邮件
6. 新邮件会实时显示在界面中

## kevin的其余产品

- [Remover.plus - 免费sora2视频去水印](https://remover.plus)
- [NuxtDir - 发现全球热门ai工具导航站](https://nuxtdir.com)
- [CheapGpt - 企业级AI大模型中转，1元人民币=1美刀额度](https://ai.linktre.cc)
- [linktre-tools - 独立开发出海工具大全](https://github.com/PennyJoly/linktre-tools)
