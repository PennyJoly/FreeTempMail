export default defineEventHandler(async (event) => {
  // 生成随机邮箱地址
  const generateRandomEmail = (): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const length = Math.floor(Math.random() * 5) + 6 // 6-10位长度
    let result = ''
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return `${result}@${process.env.NUXT_PUBLIC_DOMAIN_URL}`
  }

  const email = generateRandomEmail()
  
  return {
    success: true,
    email,
    domain: process.env.NUXT_PUBLIC_DOMAIN_URL,
    message: '临时邮箱地址已生成'
  }
}) 