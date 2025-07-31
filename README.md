🌍 *[English](README.md) ∙ [简体中文](README_zh.md) 

# FreeTempMail

FreeTempMail is a free temporary email service that allows you to create disposable email addresses to protect your privacy. No registration required, instant generation, automatic email reception.

- [👉 FreeTempMail online url](https://mail.aitre.cc)

- [👉 NuxtPro Open Source Code](https://github.com/PennyJoly/NuxtPro)

🚀 If you are looking for a Nuxt framework-based, all-in-one SaaS template with a built-in admin system and front-end/back-end compatibility, consider the commercial version of NuxtPro? (https://nuxtpro.com). The commercial version of NuxtPro allows you to launch an MVP in just 1 hour, validate your needs, and save a lot of development time. NuxtPro focuses on small and beautiful products, giving you more time to spend on promotion and operations. With mainstream AI products, a one-person company can efficiently generate revenue.

👉 NuxtPro Commercial Version $40 Limited Time Early Bird Discount Coupon -> https://x.com/PennyJoly

# TempMail image

<img width="1404" height="849" alt="image" src="https://github.com/user-attachments/assets/e49b146c-c99d-49ba-a4fe-cc8c2eb6c2aa" />

## 🚀 How to Quickly Start the Project

1. Clone the repository:
```bash
git clone https://github.com/PennyJoly/FreeTempMail
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.dev
```

4. Start the development server:
```bash
npm run dev
```

Visit http://localhost:3000 to view your nuxtpro application.

# base config

```bash
# env config，dev is development，prod is production
NODE_ENV=development
NUXT_PUBLIC_ENV=development
# your website url e.g: mail.aitre.cc
NUXT_PUBLIC_BASE_URL=
# your domain url e.g:aitre.cc
NUXT_PUBLIC_DOMAIN_URL=
# Server port
PORT=3000
# PLAUSIBLE statistics service domain (not required)
NUXT_PUBLIC_PLAUSIBLE_DOMAIN= # e.g: mail.aitre.cc
# PLAUSIBLE statistics service API address (not required)
NUXT_PUBLIC_PLAUSIBLE_API_HOST= # e.g: https://plausible.io/
# Google Search Console verifyCode (not required)
GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE=
```


# IMAP Email Configuration Guide

## Overview

This temporary email system connects to your specified mailbox via the IMAP protocol to retrieve emails forwarded to yours domain address.

## Environment Variable Configuration

Please add the following configuration to your environment variable file (such as `.env.dev` or `.env.prod`):

```bash
# IMAP server address
IMAP_HOST=imap.example.com

# IMAP port (usually 993 for SSL, 143 for non-SSL)
IMAP_PORT=993

# Your mailbox username
IMAP_USERNAME=your-email@example.com

# Your mailbox password
IMAP_PASSWORD=your-password

# Enable TLS encryption (true/false)
IMAP_TLS=true
```

## Common Email Provider Configuration Examples

### Gmail
```bash
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USERNAME=your-gmail@gmail.com
IMAP_PASSWORD=your-app-password  # Note: You need to use an app-specific password
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

### 163 mail
```bash
IMAP_HOST=imap.163.com
IMAP_PORT=993
IMAP_USERNAME=your-email@163.com
IMAP_PASSWORD=your-password
IMAP_TLS=true
```

### QQ mail
```bash
IMAP_HOST=imap.qq.com
IMAP_PORT=993
IMAP_USERNAME=your-email@qq.com
IMAP_PASSWORD=your-authorization-code  # Note: You need to use an app-specific password
IMAP_TLS=true
```

## Important Notes

1. **App-Specific Password**: For services like Gmail, you need to enable 2FA and generate an app-specific password.
2. **Authorization Code**: For QQ Mail, 163 Mail, etc., you need to generate an authorization code in your mailbox settings instead of using your login password.
3. **Firewall**: Make sure your server can access the corresponding IMAP port.
4. **Email Forwarding**: Ensure that your temporary domain emails are properly configured to forward to the specified mailbox.

## pm2 deploy

- create  `ecosystem.config.cjs` file

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
                NUXT_PUBLIC_PLAUSIBLE_DOMAIN:'your domain url',
                NUXT_PUBLIC_PLAUSIBLE_API_HOST:'your-PLAUSIBLE-url',
                GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE:' your Google Search Console verifyCode',
                IMAP_HOST:'imap url',
                IMAP_PORT:993,
                IMAP_USERNAME:'imap username',
                IMAP_PASSWORD:'imap auth code',
                IMAP_TLS:true
    }
  }]
};

```

- create pm2 start script `start.sh` 

```bash
pm2 start ecosystem.config.cjs --env production
```

- run pm2 start script

```bash
sh start.sh
```

## API INTERFACES

### Generate Temporary Email
- **POST** `/api/tempmail/generate`
- Returns a new domain temporary email address

### Got Temporary Emaill List
- **GET** `/api/tempmail/emails?email=temporary email url`
- Get all emails for the specified temporary email address

### Poll for New Emails
- **GET** `/api/tempmail/poll?email=temporary email url&lastCheck=last_checked_time`
- Get new emails received since the last check

### Test IMAP Configuration
- **POST** `/api/tempmail/config`
- Test whether the IMAP connection configuration is correct

## Usage Process

1. Configure environment variables
2. Ensure that domain emails are forwarded to your mailbox
3. Start the application
4. Click the "Generate New Email" button
5. The system will automatically poll for new emails
6. New emails will be displayed in real time on the interface
