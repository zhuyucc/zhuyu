<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isPost = computed(() => route.path.startsWith('/posts'))

const entries = {
  post_1778574324: {
    title: 'Leetcode一百题——单词搜索',
    date: '写作时间：2026-05-12 16:25:24',
    image: 'https://bu.dusays.com/2026/05/12/6a02e3a107b1a.png',
    tags: ['Leetcode', 'C++', '题解', '工作'],
    tagColor: 'pink',
    content: `<p>给定一个 <code>m x n</code> 二维字符网格 <code>board</code> 和一个字符串单词 <code>word</code> 。如果 <code>word</code> 存在于网格中，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>
<p>单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。</p>
<br/><p>示例</p>
<p><strong>示例 1：</strong></p>
<pre><code>输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCCED"
输出：true
</code></pre>
<p><strong>示例 2：</strong></p>
<pre><code>输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "SEE"
输出：true
</code></pre>
<p><strong>示例 3：</strong></p>
<pre><code>输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCB"
输出：false
</code></pre>
<br/><p>示例</p>
<h3>1. 算法核心思想</h3>
<p>本题是一道典型的二维矩阵回溯（Backtracking）题目。其核心在于：以矩阵中的每一个点作为潜在起点，尝试向四个方向"嗅探"目标单词的路径。</p>
<h3>2. 代码逻辑拆解</h3>
<ul>
<li><strong>第一阶段：全图扫描寻起点</strong></li>
<li><strong>第二阶段：防御性剪枝与匹配判定</strong></li>
<li><strong>第三阶段：标记与扩散</strong></li>
<li><strong>第四阶段：撤销选择（回溯灵魂）</strong></li>
</ul>
<h3>3. 复杂度分析</h3>
<ul>
<li><strong>时间复杂度：</strong> O(N·3^L)</li>
<li><strong>空间复杂度：</strong> O(N)</li>
</ul>`,
    recommended: [
      { title: 'GROMACS 2025 分子动力学模拟初步', date: '2026-03-24 07:00:45', link: '/posts/2222' },
      { title: 'Computational Chemistry Tool 工具介绍', date: '2026-04-01 07:00:23', link: '/posts/draft_1775049966680' },
      { title: 'Leetcode一百题——字母异位词分组', date: '2026-04-07 15:34:18', link: '/posts/draft_1775546951004' },
    ],
    toc: ['1. 算法核心思想', '2. 代码逻辑拆解', '3. 复杂度分析'],
    recentRecords: null,
  },
  photo_202604: {
    title: '南昌五一摄影',
    date: '写作时间：2026-05-07 10:00:00',
    image: 'https://bu.dusays.com/2026/05/07/69fc46808a782.jpg',
    tags: ['摄影', '生活', '南昌', '五一'],
    tagColor: 'pink',
    content: `<p>五一假期去了南昌，拍了一些照片记录生活。</p>
<p>南昌的春天真的很美，滕王阁、八一广场、秋水广场……每一个地方都充满了故事。</p>
<p>随手拍了一些照片，分享一下。</p>
<p>希望下次还能再来南昌看看。</p>`,
    recommended: [
      { title: 'Leetcode一百题——单词搜索', date: '2026-05-12 16:25:24', link: '/posts/post_1778574324' },
      { title: '春日随拍', date: '2026-04-24 16:31:45', link: '/chatter/chatter_1777019505' },
      { title: 'GROMACS 2025 分子动力学模拟初步', date: '2026-03-24 07:00:45', link: '/posts/2222' },
    ],
    toc: null,
    recentRecords: null,
  },
  draft_1775049966680: {
    title: 'GROMACS 分子动力学模拟研究',
    date: '写作时间：2026-03-15 08:30:00',
    image: 'https://bu.dusays.com/2026/03/24/69c26fe4acdb5.jpg',
    tags: ['GROMACS', '科研', '分子动力学'],
    tagColor: 'pink',
    content: `<p>最近在研究使用 GROMACS 进行蛋白质分子动力学模拟。</p>
<p>GROMACS 是一个功能强大的分子动力学模拟软件包，广泛应用于蛋白质、脂质、核酸等生物大分子的模拟研究。</p>
<h3>研究背景</h3>
<p>分子动力学模拟能够从原子级别揭示生物大分子的运动规律，对于理解蛋白质功能、药物设计等具有重要意义。</p>
<h3>模拟步骤</h3>
<ol>
<li>准备结构文件（PDB）</li>
<li>拓扑文件生成</li>
<li>能量最小化</li>
<li>平衡模拟（NVT、NPT）</li>
<li>生产模拟</li>
<li>轨迹分析</li>
</ol>
<h3>初步结果</h3>
<p>经过一夜的计算，终于得到了初步结果。蛋白质的构象变化符合预期，RMSD 在合理范围内波动。</p>`,
    recommended: [
      { title: 'Leetcode一百题——单词搜索', date: '2026-05-12 16:25:24', link: '/posts/post_1778574324' },
      { title: 'Computational Chemistry Tool 工具介绍', date: '2026-04-01 07:00:23', link: '/posts/draft_1775049966681' },
    ],
    toc: ['研究背景', '模拟步骤', '初步结果'],
    recentRecords: null,
  },
  chatter_1777019505: {
    title: '音乐板块完成',
    date: '2026-04-24 16:31:45',
    image: 'https://bu.dusays.com/2026/04/24/69eb2a5a6e185.jpg',
    tags: ['博客更新', '博客运行'],
    tagColor: 'slate',
    mood: '💢心情：平静',
    content: `<p>本来没想做音乐模块的，但是感觉缺点什么，花了一下午把音乐模块构建出来了</p>
<p>😶🌫️😶🌫️😶🌫️</p>`,
    recommended: null,
    toc: null,
    recentRecords: [
      { title: '实现了解耦，为最终上线准备', date: '2026-04-24 10:42:05', link: '/chatter/chatter_1776998525' },
      { title: '归档模组重建', date: '2026-04-15 16:12:25', link: '/chatter/chatter_1776240745' },
      { title: '弹幕背景', date: '2026-04-15 11:25:08', link: '/chatter/chatter_1776223508' },
    ],
  },
  chatter_1776240745: {
    title: '网站重构上线',
    date: '2026-03-20 14:00:00',
    image: 'https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg',
    tags: ['博客更新', '前端'],
    tagColor: 'slate',
    mood: '😊心情：开心',
    content: `<p>基于 Next.js 完成了网站的重构，体验更好了。</p>
<p>新的架构更加清晰，加载速度也提升了不少。这次重构主要优化了以下几个方面：</p>
<ul>
<li>使用 Next.js App Router 替代 Pages Router</li>
<li>优化了图片加载策略</li>
<li>改进了暗色模式的支持</li>
<li>新增了音乐播放功能</li>
</ul>
<p>后续还会继续完善其他功能模块。</p>`,
    recommended: null,
    toc: null,
    recentRecords: [
      { title: '音乐板块完成', date: '2026-04-24 16:31:45', link: '/chatter/chatter_1777019505' },
      { title: '归档模组重建', date: '2026-04-15 16:12:25', link: '/chatter/chatter_1776240745' },
    ],
  },
}

const fallback = {
  title: '未找到文章',
  date: '',
  image: 'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg',
  tags: [],
  tagColor: 'slate',
  content: '<p>该文章不存在或已被删除。</p>',
  recommended: null,
  toc: null,
  recentRecords: null,
}

const detail = computed(() => {
  return entries[route.params.id] || fallback
})

const goBack = () => {
  const target = sessionStorage.getItem('back_target')
  router.replace(target && target !== route.fullPath ? target : '/')
}

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
const firstDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7
const calendarDays = computed(() => {
  const days = []
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  return days
})

const scrollToToc = (label) => {
  const headings = document.querySelectorAll('#article-content h3')
  const num = parseInt(label)
  if (headings[num - 1]) {
    headings[num - 1].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div>
    <main class="w-[95%] md:w-[90%] max-w-6xl mx-auto mt-24 md:mt-28 flex flex-col lg:flex-row gap-6 md:gap-8 relative z-10">
      <article class="flex-1 bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden transition-colors duration-700" :class="isPost ? 'rounded-3xl' : 'rounded-[40px]'">
        <div class="w-full aspect-video bg-slate-200 dark:bg-slate-700 relative group">
          <img :src="detail.image" alt="封面" class="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" />
        </div>
        <div class="p-5 md:p-12 relative">
          <button @click="goBack" class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all duration-300 group mb-8 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full w-max shadow-sm cursor-pointer outline-none">
            <svg class="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            返回上一页          </button>
          <header class="mb-6 md:mb-8 border-b border-slate-300/50 dark:border-slate-700 pb-5 md:pb-6 relative">
            <h1 class="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors duration-700 pr-16 md:pr-24 leading-snug" :class="isPost ? 'md:text-4xl font-bold' : 'md:text-5xl font-black md:leading-tight'">
              {{ detail.title }}
            </h1>
            <div class="flex flex-wrap items-center gap-2 md:gap-3">
              <div class="flex items-center gap-1.5 md:gap-2 text-indigo-700 dark:text-indigo-400 font-bold bg-white/30 dark:bg-slate-900/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full w-max text-xs md:text-sm transition-colors duration-700 shadow-sm border border-white/20 dark:border-white/5">
                <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {{ detail.date }}
              </div>
              <div v-if="detail.mood" class="flex items-center gap-1.5 md:gap-2 text-pink-600 dark:text-pink-400 font-black bg-pink-500/5 dark:bg-pink-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-2xl text-xs md:text-sm border border-pink-500/10">
                {{ detail.mood }}
              </div>
              <div v-for="tag in detail.tags" :key="tag" class="flex items-center gap-1 font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm transition-colors duration-700 shadow-sm border"
                :class="detail.tagColor === 'pink'
                  ? 'text-pink-600 dark:text-pink-400 bg-white/30 dark:bg-slate-900/50 border-white/20 dark:border-white/5'
                  : 'text-slate-500 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-400/10 border-slate-500/10'"
              >
                <span class="text-[10px] md:text-xs opacity-70">#</span>
                {{ tag }}
              </div>
            </div>
          </header>
          <div class="relative">
            <div id="article-content" class="prose prose-slate dark:prose-invert prose-base md:prose-lg max-w-none text-slate-800 dark:text-slate-200 font-serif transition-colors duration-700 leading-relaxed scroll-smooth" v-html="detail.content"></div>
          </div>
          <div class="mt-12 md:mt-16">
            <div class="w-full mt-16 relative">
              <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl rounded-full pointer-events-none z-0"></div>
              <div class="relative z-10 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <h3 class="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">评论</h3>
                <div class="text-center text-xs text-slate-400 dark:text-slate-500 py-8">暂无评论</div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <aside class="w-full lg:w-[320px] flex flex-col gap-6 flex-shrink-0">
        <div class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl text-center">
          <div class="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md mb-4 transition-transform duration-500 hover:rotate-3">
            <img src="https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg" alt="avatar" class="w-full h-full rounded-full object-cover bg-white" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">zhuyu</h3>
          <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-4">在代码、学术与分子动力学模拟间穿梭的普通人。近期正埋头于 GROMACS 模拟研究与神经网络计算。</p>
          <div class="flex gap-2 flex-wrap justify-center mt-4">
            <a href="https://github.com/heiehiehi" target="_blank" rel="noopener noreferrer">
              <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="github">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </div>
            </a>
            <a href="https://github.com/heiehiehi" target="_blank" rel="noopener noreferrer">
              <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="gitee">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482c0-.326.266-.592.592-.592h6.81c.328 0 .593.266.593.592v3.408a4.74 4.74 0 0 1-4.741 4.74H7.11A4.74 4.74 0 0 1 2.37 14.81V9.186a4.74 4.74 0 0 1 4.74-4.741h10.963v.888z" /></svg>
              </div>
            </a>
            <a href="mailto:bilibiliwuwuwu@gmail.com" target="_blank" rel="noopener noreferrer">
              <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="google">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
              </div>
            </a>
            <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="email">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="qq">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4.418 0-8 3.582-8 8 0 1.25.289 2.433.805 3.49-1.024 1.708-1.53 3.843-1.021 5.308.203.585.806.84 1.341.57.828-.418 1.625-1.025 2.296-1.722 1.335.539 2.862.854 4.579.854 1.716 0 3.243-.315 4.578-.854.671.697 1.468 1.304 2.296 1.722.535.27 1.138.015 1.341-.57.509-1.465.003-3.6-1.021-5.308C19.71 12.433 20 11.25 20 10c0-4.418-3.582-8-8-8zm-2.5 8c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zm5 0c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z" /></svg>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer" title="wechat">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5 13.5c-3.59 0-6.5-2.42-6.5-5.4 0-2.98 2.91-5.4 6.5-5.4s6.5 2.42 6.5 5.4c0 2.98-2.91 5.4-6.5 5.4zm7.5 7.8c-2.76 0-5-2.02-5-4.5 0-2.48 2.24-4.5 5-4.5s5 2.02 5 4.5c0 2.48-2.24 4.5-5 4.5z" /></svg>
            </div>
          </div>
        </div>

        <div v-if="detail.recommended" class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl">
          <h3 class="font-black text-slate-900 dark:text-white mb-4 border-l-4 border-indigo-500 pl-2 text-sm">RECOMMENDED</h3>
          <div class="space-y-4">
            <a v-for="(rec, idx) in detail.recommended" :key="idx" :href="rec.link" class="group block">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{{ rec.title }}</h4>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-bold uppercase">{{ rec.date }}</p>
            </a>
          </div>
        </div>

        <div v-if="detail.toc" class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl sticky top-28 transition-colors duration-700 max-h-[75vh] overflow-y-auto">
          <h3 class="font-black text-slate-900 dark:text-white mb-4 border-l-4 border-indigo-500 pl-2 text-sm uppercase tracking-widest">Table of Contents</h3>
          <nav class="flex flex-col gap-2 relative">
            <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700/50 rounded-full"></div>
            <button v-for="item in detail.toc" :key="item" @click="scrollToToc(item)"
              class="text-left text-sm transition-all duration-300 line-clamp-2 cursor-pointer relative pl-4 ml-4 text-xs text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400">
              {{ item }}
            </button>
          </nav>
        </div>

        <div v-if="!isPost" class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-black text-slate-800 dark:text-white tracking-wider">{{ currentYear }}年{{ currentMonth + 1 }}月</h3>
          </div>
          <div class="grid grid-cols-7 gap-1 mb-4 text-center">
            <div class="text-[10px] font-black text-slate-400 uppercase">一</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">二</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">三</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">四</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">五</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">六</div>
            <div class="text-[10px] font-black text-slate-400 uppercase">日</div>
          </div>
          <div class="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
            <template v-for="(day, idx) in calendarDays" :key="idx">
              <div class="flex justify-center items-center">
                <div v-if="day === null" class="w-8 h-8"></div>
                <div v-else class="w-8 h-8 flex items-center justify-center rounded-xl text-xs font-black transition-all duration-300"
                  :class="day === now.getDate()
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-110'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700'">
                  {{ day }}
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="detail.recentRecords" class="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-xl">
          <h3 class="font-black text-slate-900 dark:text-white mb-4 border-l-4 border-indigo-500 pl-2 text-xs tracking-widest uppercase">Recent Records</h3>
          <div class="space-y-4">
            <a v-for="(rec, idx) in detail.recentRecords" :key="idx" :href="rec.link" class="group block">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{{ rec.title }}</h4>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-bold uppercase">{{ rec.date }}</p>
            </a>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style>
.prose h1 { font-size: 1.8rem !important; font-weight: 900 !important; margin-bottom: 1.2rem !important; margin-top: 2rem !important; line-height: 1.3 !important; color: inherit !important; }
.prose h2 { font-size: 1.5rem !important; font-weight: 800 !important; margin-bottom: 1rem !important; margin-top: 1.5rem !important; color: inherit !important; }
.prose h3 { font-size: 1.2rem !important; font-weight: 700 !important; margin-bottom: 0.8rem !important; color: inherit !important; }
.prose p { font-size: 0.95rem !important; line-height: 1.75 !important; color: inherit !important; }
.prose a { color: #6366f1 !important; text-decoration: none !important; font-weight: 600 !important; border-bottom: 1px dashed #6366f1 !important; transition: all 0.3s ease !important; }
.prose a:hover { color: #4f46e5 !important; border-bottom-style: solid !important; background-color: rgba(99, 102, 241, 0.1) !important; padding: 0 0.2rem !important; border-radius: 0.2rem !important; }
.dark .prose a { color: #818cf8 !important; border-bottom-color: #818cf8 !important; }
.dark .prose a:hover { color: #a5b4fc !important; background-color: rgba(129, 140, 248, 0.15) !important; }
.prose ul { list-style-type: disc !important; padding-left: 1.5rem !important; font-size: 0.95rem !important; }
.prose ol { list-style-type: decimal !important; padding-left: 1.5rem !important; font-size: 0.95rem !important; }
.prose li { display: list-item !important; margin-bottom: 0.5rem !important; }
.prose ul ul, .prose ol ul { list-style-type: circle !important; margin-top: 0.25rem !important; margin-bottom: 0.25rem !important; }
.prose ol ol, .prose ul ol { list-style-type: lower-alpha !important; margin-top: 0.25rem !important; margin-bottom: 0.25rem !important; }
.prose del { text-decoration-color: inherit !important; opacity: 0.6; }
.prose blockquote {
  border-left: 4px solid #6366f1 !important;
  background-color: rgba(99, 102, 241, 0.05) !important;
  padding: 1rem 1.5rem !important;
  margin: 1.5rem 0 !important;
  border-radius: 0 1.25rem 1.25rem 0 !important;
  font-style: italic !important;
  color: #64748b !important;
}
.prose blockquote p { margin: 0 !important; color: inherit !important; }
.dark .prose blockquote {
  border-left-color: #818cf8 !important;
  background-color: rgba(129, 140, 248, 0.1) !important;
  color: #94a3b8 !important;
}
.prose pre {
  background-color: #282c34 !important; color: #abb2bf !important;
  padding: 1rem !important; border-radius: 0.75rem !important;
  overflow-x: auto !important; box-shadow: inset 0 0 10px rgba(0,0,0,0.3) !important;
  margin-top: 1rem !important; margin-bottom: 1rem !important;
}
.prose pre code, .prose p code, .prose li code { font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, ui-monospace, monospace !important; font-variant-ligatures: contextual !important; }
.prose pre code { background-color: transparent !important; padding: 0 !important; color: inherit !important; font-size: 0.85em !important; }
.prose code::before, .prose code::after { content: none !important; }
.prose p code, .prose li code { background-color: rgba(99, 102, 241, 0.1) !important; color: #6366f1 !important; padding: 0.1rem 0.3rem !important; border-radius: 0.25rem !important; font-weight: 600 !important; font-size: 0.85em !important; }
.dark .prose p code, .dark .prose li code { background-color: rgba(99, 102, 241, 0.2) !important; color: #818cf8 !important; }
.prose img { display: block !important; margin: 1.5rem auto !important; border-radius: 1rem !important; box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important; max-width: 100% !important; height: auto !important; }
@media (min-width: 768px) {
  .prose h1 { font-size: 3rem !important; font-weight: 950 !important; margin-bottom: 2rem !important; margin-top: 3rem !important; line-height: 1.1 !important; }
  .prose h2 { font-size: 2.2rem !important; margin-bottom: 1.5rem !important; margin-top: 2rem !important; }
  .prose h3 { font-size: 1.5rem !important; margin-bottom: 1rem !important; }
  .prose p { font-size: 1.15rem !important; line-height: 1.85 !important; }
  .prose ul, .prose ol { padding-left: 2rem !important; font-size: 1.1rem !important; }
  .prose pre { padding: 1.25rem !important; margin-top: 1.5rem !important; margin-bottom: 1.5rem !important; }
  .prose pre code { font-size: 0.9em !important; }
  .prose p code, .prose li code { padding: 0.2rem 0.4rem !important; font-size: 0.9em !important; border-radius: 0.375rem !important; }
  .prose img { margin: 2rem auto !important; border-radius: 2rem !important; box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important; }
}
</style>