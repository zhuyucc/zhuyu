<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import MiniPlayer from '../components/MiniPlayer.vue'

const router = useRouter()

const props = defineProps({
  isDark: Boolean,
})
const emit = defineEmits(['toggleDark'])

const posts = ref([
  {
    id: 1,
    title: 'Leetcode一百题——单词搜索',
    date: '2026.05.12 16:25',
    summary: '遍历加搜索',
    image: 'https://bu.dusays.com/2026/05/12/6a02e3a107b1a.png',
    link: '/posts/post_1778574324',
  },
  {
    id: 2,
    title: 'Leetcode一百题——动态规划',
    date: '2026.05.10 14:20',
    summary: '动态规划经典题目解析',
    image: 'https://bu.dusays.com/2026/05/12/6a02e3a107b1a.png',
    link: '/posts/post_1778574325',
  },
])

const chaters = ref([
  {
    id: 1,
    title: '音乐板块完成',
    date: '2026.04.24 16:31',
    content: '本来没想做音乐模块的，但是感觉缺点什么，花了一下午把音乐模块构建出来了\n\n😶‍🌫️😶‍🌫️😶‍🌫️',
    image: 'https://bu.dusays.com/2026/04/24/69eb2a5a6e185.jpg',
    link: '/chatter/chatter_1777019505',
  },
])

const featuredPostIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    featuredPostIndex.value = (featuredPostIndex.value + 1) % posts.value.length
  }, 5000)
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
    <div class="relative w-full max-w-2xl mx-auto mb-10 z-[100]">
      <SearchBar />
    </div>

    <main class="flex flex-col gap-6 w-full mt-6">
      <!-- Hero & Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <div class="col-span-1 lg:col-span-7 flex flex-col">
          <div class="md:col-span-7 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] cursor-pointer group relative overflow-hidden h-full min-h-[220px] md:min-h-[280px]">
            <div class="flex items-start justify-between relative z-10">
              <div class="flex items-center gap-4 md:gap-6 w-full">
                <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-3">
                  <img src="/img/my-logo.jpg" alt="avatar" class="w-full h-full rounded-lg md:rounded-xl object-cover bg-white" />
                </div>
                <div class="flex-1 min-w-0">
                  <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2 pb-1 leading-snug tracking-wider transition-colors duration-700 truncate">zhuyu</h1>
                  <p class="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-md transition-colors duration-700 line-clamp-2 md:line-clamp-none">在代码、学术与分子动力学模拟间穿梭的普通人。近期正埋头于 GROMACS 模拟研究与神经网络计算。</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center md:items-end justify-between mt-6 md:mt-8 gap-5 md:gap-6 relative z-10">
              <div class="flex gap-2 sm:gap-6 w-full md:w-auto justify-between sm:justify-around md:justify-start px-2 sm:px-0">
                <div class="text-center group/stat px-2">
                  <div class="text-xl md:text-2xl font-black text-indigo-600 dark:text-indigo-400 transition-transform group-hover/stat:scale-110">77</div>
                  <div class="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">文章</div>
                </div>
                <div class="w-px h-8 md:h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block"></div>
                <div class="text-center group/stat px-2">
                  <div class="text-xl md:text-2xl font-black text-purple-600 dark:text-purple-400 transition-transform group-hover/stat:scale-110">16</div>
                  <div class="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">杂谈</div>
                </div>
                <div class="w-px h-8 md:h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block"></div>
                <div class="text-center group/stat px-2">
                  <div class="text-xl md:text-2xl font-black text-pink-600 dark:text-pink-400 transition-transform group-hover/stat:scale-110">11</div>
                  <div class="text-[9px] md:text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">照片</div>
                </div>
              </div>
              <div class="flex gap-2 md:gap-3 flex-wrap justify-center md:justify-end w-full md:w-auto">
                <a href="https://github.com/heiehiehi" target="_blank" rel="noopener noreferrer">
                  <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="github">
                    <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path></svg>
                  </div>
                </a>
                <a href="https://github.com/heiehiehi" target="_blank" rel="noopener noreferrer">
                  <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="gitee">
                    <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482c0-.326.266-.592.592-.592h6.81c.328 0 .593.266.593.592v3.408a4.74 4.74 0 0 1-4.741 4.74H7.11A4.74 4.74 0 0 1 2.37 14.81V9.186a4.74 4.74 0 0 1 4.74-4.741h10.963v.888z"></path></svg>
                  </div>
                </a>
                <a href="mailto:bilibiliwuwuwu@gmail.com" target="_blank" rel="noopener noreferrer">
                  <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="google">
                    <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                  </div>
                </a>
                <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="email">
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="qq">
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4.418 0-8 3.582-8 8 0 1.25.289 2.433.805 3.49-1.024 1.708-1.53 3.843-1.021 5.308.203.585.806.84 1.341.57.828-.418 1.625-1.025 2.296-1.722 1.335.539 2.862.854 4.579.854 1.716 0 3.243-.315 4.578-.854.671.697 1.468 1.304 2.296 1.722.535.27 1.138.015 1.341-.57.509-1.465.003-3.6-1.021-5.308C19.71 12.433 20 11.25 20 10c0-4.418-3.582-8-8-8zm-2.5 8c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zm5 0c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z"></path></svg>
                </div>
                <div class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm" title="wechat">
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5 13.5c-3.59 0-6.5-2.42-6.5-5.4 0-2.98 2.91-5.4 6.5-5.4s6.5 2.42 6.5 5.4c0 2.98-2.91 5.4-6.5 5.4zm7.5 7.8c-2.76 0-5-2.02-5-4.5 0-2.48 2.24-4.5 5-4.5s5 2.02 5 4.5c0 2.48-2.24 4.5-5 4.5z"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mini Player -->
        <div class="col-span-1 lg:col-span-5 flex flex-col">
          <MiniPlayer />
        </div>
      </div>

      <!-- Featured Post + Photo Card + Chatter + Theme -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <!-- Left: Featured Post -->
        <div class="col-span-1 lg:col-span-4 flex flex-col min-h-[300px]">
          <div class="md:col-span-4 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden relative group min-h-[420px] h-full flex flex-col">
            <a class="absolute inset-0 z-20 cursor-pointer" :aria-label="'阅读 ' + posts[featuredPostIndex].title" @click.prevent="router.push(posts[featuredPostIndex].link)"></a>
            <div class="absolute inset-0 z-0">
              <img :src="posts[featuredPostIndex].image" class="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" :alt="posts[featuredPostIndex].title" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            </div>
            <div class="relative z-10 flex flex-col justify-end p-6 w-full mt-auto h-full pointer-events-none">
              <div class="flex items-center gap-2 mb-3">
                <span class="px-3 py-1 bg-indigo-500/80 backdrop-blur-lg rounded-full text-[10px] text-white font-black uppercase tracking-widest shadow-lg">Latest Insight</span>
                <span class="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white/90 font-mono tracking-wider">{{ posts[featuredPostIndex].date }}</span>
              </div>
              <h2 class="text-2xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform drop-shadow-md">{{ posts[featuredPostIndex].title }}</h2>
              <p class="text-sm text-gray-300 line-clamp-3 drop-shadow-sm mb-6">{{ posts[featuredPostIndex].summary }}</p>
            </div>
            <div class="absolute bottom-4 right-6 z-30 flex gap-2">
              <button
                v-for="(_, idx) in posts"
                :key="idx"
                class="h-1.5 rounded-full transition-all duration-500"
                :class="idx === featuredPostIndex ? 'w-6 bg-indigo-400' : 'w-2 bg-white/40 hover:bg-white/80'"
                :aria-label="'切换到第 ' + (idx + 1) + ' 篇文章'"
              ></button>
            </div>
          </div>
        </div>

        <!-- Right: Photo + Chatter + ThemeToggle -->
        <div class="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <!-- Photo Card -->
          <a class="w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-700 hover:scale-[1.02] relative group min-h-[200px] sm:min-h-[220px] flex-shrink-0 cursor-pointer" @click.prevent="router.push('/photowall')">
            <img src="https://bu.dusays.com/2026/05/07/69fc46808a782.jpg" class="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
            <div class="absolute inset-0 bg-black/30 dark:bg-black/50 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-6">
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 underline decoration-pink-400">二六年南昌五一摄影</h3>
              <p class="text-white/90 text-sm sm:text-lg line-clamp-1">随便拍拍</p>
            </div>
          </a>

          <!-- Chatter + ThemeToggle Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full flex-1">
            <div class="sm:col-span-2 flex flex-col min-h-[200px]">
              <div v-for="chatter in chaters" :key="chatter.id" class="w-full h-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden relative group min-h-[220px] flex flex-col">
                <a class="absolute inset-0 z-20 cursor-pointer" :aria-label="'查看杂谈: ' + chatter.title" @click.prevent="router.push(chatter.link)"></a>
                <div class="absolute inset-0 z-0">
                  <img :src="chatter.image" class="w-full h-full object-cover opacity-80 dark:opacity-60 transition-transform duration-1000 group-hover:scale-105" alt="Chatter Cover" />
                  <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div>
                </div>
                <div class="relative z-10 flex flex-col justify-center p-6 md:p-8 h-full pointer-events-none w-full md:w-[85%]">
                  <div class="flex items-end gap-2 mb-2">
                    <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 shadow-sm">Records</span>
                    <span class="text-[11px] font-mono text-slate-300 drop-shadow-md">{{ chatter.date }}</span>
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-1 drop-shadow-md">{{ chatter.title }}</h3>
                  <p class="text-sm text-slate-300 font-medium leading-relaxed drop-shadow-md line-clamp-2" style="white-space: pre-line">{{ chatter.content }}</p>
                </div>
                <div class="absolute bottom-5 right-6 z-30 flex gap-2">
                  <button class="h-1.5 rounded-full transition-all duration-500 shadow-sm w-6 bg-indigo-400" aria-label="跳转"></button>
                  <button class="h-1.5 rounded-full transition-all duration-500 shadow-sm w-2 bg-white/40 hover:bg-white/80" aria-label="跳转"></button>
                  <button class="h-1.5 rounded-full transition-all duration-500 shadow-sm w-2 bg-white/40 hover:bg-white/80" aria-label="跳转"></button>
                  <button class="h-1.5 rounded-full transition-all duration-500 shadow-sm w-2 bg-white/40 hover:bg-white/80" aria-label="跳转"></button>
                  <button class="h-1.5 rounded-full transition-all duration-500 shadow-sm w-2 bg-white/40 hover:bg-white/80" aria-label="跳转"></button>
                </div>
              </div>
            </div>
            <div class="sm:col-span-1 flex flex-col min-h-[120px]">
              <ThemeToggle :is-dark="props.isDark" @toggle="emit('toggleDark')" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
