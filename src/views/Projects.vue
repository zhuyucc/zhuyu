<script setup>
const projects = [
  {
    title: 'zhuyu 个人网站',
    desc: '基于 Next.js 构建的个人博客与作品集网站，支持暗色模式、响应式设计',
    tags: ['Next.js', 'React', 'Tailwind'],
    link: 'https://github.com/heiehiehi',
  },
  {
    title: '分子动力学模拟研究',
    desc: '使用 GROMACS 进行蛋白质分子动力学模拟，分析构象变化与相互作用',
    tags: ['GROMACS', 'Python', 'MD'],
    link: '#',
  },
  {
    title: '神经网络计算项目',
    desc: '基于 PyTorch 的神经网络模型训练与推理，涵盖分类与回归任务',
    tags: ['PyTorch', 'Python', 'AI'],
    link: '#',
  },
]
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">项目</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">一些有趣的项目与研究工具</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(proj, idx) in projects" :key="idx" class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ proj.title }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{{ proj.desc }}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in proj.tags" :key="tag" class="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full">{{ tag }}</span>
        </div>
        <a :href="proj.link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
          查看详情
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>
  </div>
</template>
