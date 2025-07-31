import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成随机邮箱地址
export function generateRandomEmail(domain = process.env.NUXT_PUBLIC_DOMAIN_URL): string {
  const prefixes = ['temp', 'mail', 'test', 'demo', 'user', 'inbox', 'box']
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const randomNumber = Math.floor(Math.random() * 10000)
  return `${randomPrefix}${randomNumber}@${domain}`
}

// 格式化时间
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Shanghai'
  }).format(date)
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    return successful
  }
}