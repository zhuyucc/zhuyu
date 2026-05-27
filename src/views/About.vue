<script setup>
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">关于</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">关于我 & 这个网站</p>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
          <div class="flex items-center gap-6 mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg">
              <img src="https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg" alt="avatar" class="w-full h-full rounded-xl object-cover bg-white" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-slate-900 dark:text-white">zhuyu</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">代码 / 学术 / 分子动力学模拟</p>
            </div>
          </div>
          <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>在代码、学术与分子动力学模拟间穿梭的普通人。近期正埋头于 GROMACS 模拟研究与神经网络计算。</p>
            <p>这个网站是我分享技术、生活与思考的小天地。希望能与志同道合的朋友交流学习。</p>
            <p>如果你有任何问题或想法，欢迎通过邮件或社交平台联系我。</p>
          </div>
        </div>
      </div>
      <div class="lg:col-span-1">
        <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
          <h3 class="font-bold text-slate-900 dark:text-white mb-4">联系方式</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              <span class="text-slate-600 dark:text-slate-400">GitHub</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="text-slate-600 dark:text-slate-400">bilibiliwuwuwu@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
