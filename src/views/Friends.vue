<script setup>
const friends = [
  { name: '友人A', desc: '一个有趣的朋友', avatar: 'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg', link: '#' },
  { name: '友人B', desc: '技术爱好者', avatar: 'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg', link: '#' },
]
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">友链</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">我的朋友们</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(friend, idx) in friends"
        :key="idx"
        :href="friend.link"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6 flex items-center gap-4 transition-all duration-500 hover:scale-[1.02] group"
      >
        <img :src="friend.avatar" class="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
        <div>
          <h3 class="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ friend.name }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ friend.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>
