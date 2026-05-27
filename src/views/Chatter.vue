<script setup>
const articles = [
  {
    title: '音乐板块完成',
    date: '2026.04.24 16:31',
    content: '本来没想做音乐模块的，但是感觉缺点什么，花了一下午把音乐模块构建出来了\n\n😶‍🌫️😶‍🌫️😶‍🌫️',
  },
  {
    title: '网站重构完成',
    date: '2026.03.20 14:00',
    content: '基于 Next.js 完成了网站的重构，体验更好了',
  },
]
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">杂谈</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">一些随想与记录</p>
    <div class="space-y-6">
      <div v-for="(article, idx) in articles" :key="idx" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden">
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Records</span>
            <span class="text-xs text-slate-400 font-mono">{{ article.date }}</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{{ article.title }}</h2>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{{ article.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
