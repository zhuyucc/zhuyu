<script setup>
const moments = [
  { content: '完成了音乐模块的构建，感觉网站越来越完整了😶‍🌫️', date: '2026-04-24 16:31', type: 'update' },
  { content: '南昌的五一真的很美，拍了很多照片📸', date: '2026-05-01 10:00', type: 'photo' },
  { content: 'GROMACS 模拟跑了一整夜，终于出结果了🔬', date: '2026-03-15 08:30', type: 'research' },
]
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">说说</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">随手记录的点滴</p>
    <div class="space-y-6">
      <div v-for="(item, idx) in moments" :key="idx" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden">
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{{ item.type }}</span>
            <span class="text-xs text-slate-400 font-mono">{{ item.date }}</span>
          </div>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
