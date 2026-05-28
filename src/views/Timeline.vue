<script setup>
import { ref, computed } from 'vue'

const PASSWORD = '0912'
const input = ref('')
const unlocked = ref(sessionStorage.getItem('timeline_unlocked') === '1')

const error = ref(false)

function check() {
  if (input.value === PASSWORD) {
    unlocked.value = true
    error.value = false
    sessionStorage.setItem('timeline_unlocked', '1')
  } else {
    error.value = true
  }
}

const timelineItems = [
  { year: '2020', month: '', day: '', title: '开发之路', desc: '20岁开始从事开发工作。' },
  { year: '2019', month: '', day: '', title: '疫情·恋爱·新道路', desc: '19岁，疫情开始，谈了恋爱，并开始新的道路。' },
  { year: '2015', month: '', day: '', title: '进入社会', desc: '15岁开始进入社会上班。' },
  { year: '2000', month: '10', day: '15', title: '人生开始', desc: '2000年10月15日，来到这个世界。' },
]

function formatDate(item) {
  if (item.day) return `${item.year}.${item.month}.${item.day}`
  if (item.month) return `${item.year}.${item.month}`
  return item.year
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">时间线</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">人生时间线</p>

    <div v-if="!unlocked" class="flex flex-col items-center justify-center py-20">
      <div class="w-full max-w-sm rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8">
        <p class="text-slate-700 dark:text-slate-300 text-sm mb-6 text-center">请输入密码查看时间线</p>
        <form @submit.prevent="check" class="flex flex-col gap-4">
          <input
            v-model="input"
            type="text"
            class="w-full px-4 py-3 rounded-2xl bg-white/60 dark:bg-slate-700/60 border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-center text-lg"
            :class="error ? 'border-red-400 ring-red-400/50' : 'border-white/40 dark:border-white/10'"
            placeholder="请输入密码"
            autocomplete="off"
          />
          <p v-if="error" class="text-red-500 text-xs text-center">密码错误</p>
          <button type="submit" class="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors">解锁</button>
        </form>
      </div>
    </div>

    <template v-else>
      <div class="relative">
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2"></div>
        <div v-for="(item, idx) in timelineItems" :key="idx" class="relative mb-8 md:flex md:items-center" :class="idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
          <div class="hidden md:block md:w-1/2" :class="idx % 2 === 0 ? 'pr-12 text-right' : 'pl-12'">
            <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 transition-all duration-500 group">
              <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{{ formatDate(item) }}</span>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1">{{ item.title }}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ item.desc }}</p>
            </div>
          </div>
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 shadow-lg z-10 mx-4 md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <div class="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <div class="md:hidden flex-1 ml-2">
            <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 transition-all duration-500 group">
              <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400">{{ formatDate(item) }}</span>
              <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1">{{ item.title }}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
