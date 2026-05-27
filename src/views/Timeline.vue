<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const timelineItems = [
  { year: '2026', month: '05', title: '音乐板块完成', desc: '为网站添加了音乐播放功能。', link: '/chatter/chatter_1777019505' },
  { year: '2026', month: '04', title: '南昌五一摄影', desc: '记录南昌的五一假期。', link: '/posts/photo_202604' },
  { year: '2026', month: '03', title: '网站重构上线', desc: '基于 Next.js 重构个人网站。', link: '/chatter/chatter_1776240745' },
  { year: '2026', month: '02', title: 'GROMACS 模拟研究', desc: '开始分子动力学模拟研究。', link: '/posts/draft_1775049966680' },
]

const goTo = (link) => {
  if (link && link !== '#') router.push(link)
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">归档</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">时间线记录</p>
    <div class="relative">
      <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2"></div>
      <div v-for="(item, idx) in timelineItems" :key="idx" class="relative mb-8 md:flex md:items-center" :class="idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
        <div class="hidden md:block md:w-1/2" :class="idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12'">
          <div @click="goTo(item.link)" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer">
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{{ item.year }}.{{ item.month }}</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ item.title }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ item.desc }}</p>
          </div>
        </div>
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 shadow-lg z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2">
          <div class="w-3 h-3 rounded-full bg-white"></div>
        </div>
        <div class="md:hidden flex-1 ml-2">
          <div @click="goTo(item.link)" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 transition-all duration-500 hover:scale-[1.02] group cursor-pointer">
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{{ item.year }}.{{ item.month }}</span>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ item.title }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>