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
      <div v-for="(item, idx) in moments" :key="idx" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 transition-all duration-500 hover:scale-[1.01]">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">X</div>
          <div class="flex-1">
            <p class="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">{{ item.content }}</p>
            <div class="flex items-center gap-3 mt-3">
              <span class="text-xs text-slate-400">{{ item.date }}</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase">{{ item.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
