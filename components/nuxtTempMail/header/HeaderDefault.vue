<template>
  <nav class="bg-gradient-to-r from-white via-green-50 to-blue-50 shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-green-200 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- 左侧：Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center transform hover:scale-105 transition-transform duration-200">
            <img src="/assets/imgs/icon/tempmail.png" alt="FreeTempMail Logo" class="w-12 h-12"/>
            <h1 class="ml-2 text-xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-blue-700 bg-clip-text text-transparent">FreeTempMail</h1>
          </NuxtLink>
        </div>

        <!-- 中间：桌面端导航菜单 -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in displayMenuItems" 
            :key="item.path"
            :to="item.path"
            :class="[
              'border-b-2 inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 relative overflow-hidden',
              activeMenuItem === (item.path.startsWith('/#') ? item.path.substring(1) : item.path)
                ? 'border-green-500 text-green-600 shadow-sm'
                : 'border-transparent text-gray-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50 hover:shadow-sm rounded-t-md'
            ]"
            @click="handleSetActiveMenuItem(item.path)"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- 右侧：语言切换器和移动端菜单按钮 -->
        <div class="flex items-center space-x-4">

          <!-- GitHub链接按钮 -->
          <a 
            href="https://github.com/PennyJoly/FreeTempMail" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hidden md:inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-200 shadow-sm"
            :aria-label="$t('common.github', 'GitHub')"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <!-- 桌面端语言切换器 -->
          <div class="hidden md:block">
            <Select v-model="currentLocale" @update:model-value="handleSwitchLanguage">
              <SelectTrigger class="w-[120px] bg-gradient-to-r from-white to-green-50 border-green-300 text-gray-700 hover:from-green-50 hover:to-blue-50 focus:ring-green-500 shadow-sm">
                <SelectValue :placeholder="$t('common.selectLanguage')" />
              </SelectTrigger>
              <SelectContent class="bg-white border-green-200 text-gray-700 shadow-lg">
                <SelectItem 
                  v-for="locale in localeOptions" 
                  :key="locale.value" 
                  :value="locale.value" 
                  class="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-green-50 data-[highlighted]:to-blue-50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-100 data-[state=checked]:to-blue-100 data-[state=checked]:text-green-700"
                >
                  {{ locale.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- 移动端汉堡菜单按钮 -->
          <button
            @click="handleToggleMobileMenu"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-all duration-200 shadow-sm"
            aria-expanded="false"
            :aria-label="isMobileMenuOpen ? $t('common.closeMenu') : $t('common.openMenu')"
          >
            <!-- 汉堡图标 -->
            <svg 
              :class="[isMobileMenuOpen ? 'hidden' : 'block', 'h-6 w-6 transition-transform duration-200']"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- 关闭图标 -->
            <svg 
              :class="[isMobileMenuOpen ? 'block' : 'hidden', 'h-6 w-6 transition-transform duration-200 rotate-180']"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden bg-gradient-to-br from-white via-green-50 to-blue-50 border-t border-green-200 shadow-inner"
      >
        <!-- 导航链接 -->
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="item in displayMenuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:translate-x-2',
              activeMenuItem === (item.path.startsWith('/#') ? item.path.substring(1) : item.path)
                ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border-l-4 border-green-500 shadow-sm'
                : 'text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 hover:shadow-sm'
            ]"
            @click="handleSetActiveMenuItem(item.path)"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

         <!-- 移动端GitHub链接 -->
         <div class="px-2 py-3 border-t border-green-200">
          <a 
            href="https://github.com/PennyJoly/FreeTempMail" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 hover:shadow-sm transition-all duration-200 transform hover:translate-x-2"
          >
            <svg class="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        
        <!-- 移动端语言切换器 -->
        <div class="px-2 pb-4 border-t border-green-200 pt-4 bg-gradient-to-r from-green-50 to-blue-50">
          <div class="px-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('common.language') }}
            </label>
            <Select v-model="currentLocale" @update:model-value="handleSwitchLanguage">
              <SelectTrigger class="w-full bg-white border-green-300 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 focus:ring-green-500 shadow-sm">
                <SelectValue :placeholder="$t('common.selectLanguage')" />
              </SelectTrigger>
              <SelectContent class="bg-white border-green-200 text-gray-700 shadow-lg">
                <SelectItem 
                  v-for="locale in localeOptions" 
                  :key="locale.value" 
                  :value="locale.value" 
                  class="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-green-50 data-[highlighted]:to-blue-50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-100 data-[state=checked]:to-blue-100 data-[state=checked]:text-green-700"
                >
                  {{ locale.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#components'
import { useSwitchLocalePath } from '#imports'

// 定义允许的语言类型
type LocaleType = 'zh-CN' | 'en-US' | 'JP'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// 状态管理
const currentLocale = useState<LocaleType>('locale', () => locale.value as LocaleType)
const activeMenuItem = ref<string>('')
const isMobileMenuOpen = ref<boolean>(false)

// 定义语言选项
const localeOptions = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
  { value: 'JP', label: '日本語' }
]

// 验证语言类型
const isValidLocale = (locale: string): locale is LocaleType => {
  return ['zh-CN', 'en-US', 'JP'].includes(locale)
}

// 切换语言方法
const handleSwitchLanguage = async (newLocale: unknown) => {
  if (!newLocale || typeof newLocale !== 'string' || !isValidLocale(newLocale)) return
  
  currentLocale.value = newLocale
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
  
  const path = switchLocalePath(newLocale)
  if (path) {
    await router.push({
      path,
      hash: route.hash,
      query: route.query
    })
  }
}

// 切换移动端菜单
const handleToggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 设置活动菜单项
const handleSetActiveMenuItem = async (path: string) => {
  const targetPath = path.startsWith('/#') ? path.substring(1) : path
  activeMenuItem.value = targetPath
  
  // 构建目标路径，保持当前语言
  const currentPath = path.startsWith('/') ? path : '/' + path
  const targetLocale = currentLocale.value
  const localePrefix = targetLocale === 'en-US' ? '' : `/${targetLocale}`
  
  // 如果是锚点链接
  if (path.startsWith('/#')) {
    const hash = path.substring(1)
    await router.push({ path: localePrefix || '/', hash: hash })
  } else {
    const finalPath = `${localePrefix}${currentPath}`
    await router.push(finalPath)
  }
  
  // 关闭移动端菜单
  isMobileMenuOpen.value = false
}

// 路由监听
watch(
  () => route.fullPath,
  async (newPath: string) => {
    // 更新活动菜单项
    if (route.hash) {
      activeMenuItem.value = route.hash
    } else {
      activeMenuItem.value = route.path
    }

    // 确保语言设置正确
    const routeLocale = route.params.locale as string || 'en-US'
    if (isValidLocale(routeLocale) && routeLocale !== currentLocale.value) {
      const path = switchLocalePath(currentLocale.value)
      if (path) {
        await router.push({
          path,
          hash: route.hash,
          query: route.query
        })
      }
    }
  },
  { immediate: true }
)

// 组件挂载时的处理
onMounted(() => {
  // 从 localStorage 恢复语言设置
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale && isValidLocale(savedLocale)) {
    currentLocale.value = savedLocale
    locale.value = savedLocale
  }
})

// 根据状态动态显示菜单项
const displayMenuItems = computed(() => {
  const menuItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.features'), path: '/#features' },
    { name: t('header.testimonials'), path: '/#testimonials' },
    { name: t('header.faq'), path: '/#faq' },
  ]

  return menuItems
})
</script>

<style scoped>
/* 确保内容不会被固定导航栏遮挡 */
:global(body) {
  padding-top: 64px;
}

/* 确保导航栏固定且始终可见 */
nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}

/* 确保下拉内容在移动端正确显示 */
:global(.select-content) {
  z-index: 51;
  position: relative;
}

/* 移动端菜单动画 */
.md\:hidden {
  transition: all 0.3s ease-in-out;
}

/* 确保模态框在所有内容之上 */
:global(.z-60) { 
  z-index: 60; 
}

/* 导航链接悬停效果 */
nav a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
  transition: left 0.5s;
}

nav a:hover::before {
  left: 100%;
}
</style>