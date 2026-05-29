<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import MiniPlayer from '../components/MiniPlayer.vue'
import QuoteBar from '../components/QuoteBar.vue'
import { getAllPosts } from '../composables/usePosts.js'
import { getAllChatter } from '../composables/useChatter.js'
import { albums } from '../data/albums.js'

const router = useRouter()

const props = defineProps({
  isDark: Boolean,
})
const emit = defineEmits(['toggleDark'])

const allPosts = getAllPosts()
const posts = ref(allPosts.length > 0 ? allPosts.map(p => ({
  id: p.id,
  title: p.title,
  date: p.date ? p.date.replace(/写作时间：/, '') : '',
  summary: p.description || '',
  image: p.image || 'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg',
  link: `/posts/${p.id}`,
})) : [
  { id: 1, title: 'Leetcode一百题——单词搜索', date: '2026.05.12 16:25', summary: '遍历加搜索', image: 'https://bu.dusays.com/2026/05/12/6a02e3a107b1a.png', link: '/posts/post_1778574324' },
  { id: 2, title: 'Leetcode一百题——动态规划', date: '2026.05.10 14:20', summary: '动态规划经典题目解析', image: 'https://bu.dusays.com/2026/05/12/6a02e3a107b1a.png', link: '/posts/post_1778574325' },
])

const allChatters = getAllChatter()
const chaters = ref(allChatters.length > 0 ? allChatters.map(c => ({
  id: c.id,
  title: c.title,
  date: c.date || '',
  content: c.summary || '',
  image: c.image || 'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg',
  link: `/chatter/${c.id}`,
})) : [
  { id: 1, title: '音乐板块完成', date: '2026.04.24 16:31', content: '本来没想做音乐模块的，但是感觉缺点什么，花了一下午把音乐模块构建出来了', image: 'https://bu.dusays.com/2026/04/24/69eb2a5a6e185.jpg', link: '/chatter/chatter_1777019505' },
])

const photos = ref(albums.map(a => ({
  title: a.title,
  desc: a.desc,
  image: a.photos[0],
  link: `/photowall/${a.id}`,
})))

const postIdx = ref(0)
const photoIdx = ref(0)
const chatterIdx = ref(0)

let postTimer, photoTimer, chatterTimer

function resetPostTimer() {
  clearInterval(postTimer)
  postTimer = setInterval(() => postIdx.value = (postIdx.value + 1) % posts.value.length, 5000)
}
function resetPhotoTimer() {
  clearInterval(photoTimer)
  photoTimer = setInterval(() => photoIdx.value = (photoIdx.value + 1) % photos.value.length, 12000)
}
function resetChatterTimer() {
  clearInterval(chatterTimer)
  chatterTimer = setInterval(() => chatterIdx.value = (chatterIdx.value + 1) % chaters.value.length, 7000)
}

function setPost(i) { postIdx.value = i; resetPostTimer() }
function setPhoto(i) { photoIdx.value = i; resetPhotoTimer() }
function setChatter(i) { chatterIdx.value = i; resetChatterTimer() }

onMounted(() => {
  resetPostTimer()
  resetPhotoTimer()
  resetChatterTimer()
})

onUnmounted(() => {
  clearInterval(postTimer)
  clearInterval(photoTimer)
  clearInterval(chatterTimer)
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10">
    <div v-if="false" class="relative w-full max-w-2xl mx-auto mb-10 z-[100]">
      <SearchBar />
    </div>

    <main class="flex flex-col gap-6 w-full mt-6">
      <!-- Hero & Profile Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <div class="col-span-1 lg:col-span-7 flex flex-col">
          <div class="md:col-span-7 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] cursor-pointer group relative overflow-hidden h-full min-h-[180px] md:min-h-[220px]">
            <div class="flex items-start gap-4 md:gap-6 relative z-10">
              <div class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-3">
                <img src="/img/my-logo.jpg" alt="avatar" class="w-full h-full rounded-lg md:rounded-xl object-cover bg-white" />
              </div>
              <div class="mt-1">
                <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 leading-snug tracking-wider transition-colors duration-700 truncate">zhuyu</h1>
                <p class="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-md transition-colors duration-700">一个松散的人，梦想自由自在，希望世界和平</p>
              </div>
            </div>
            <div class="flex gap-2 sm:gap-6 px-2 sm:px-0 relative z-10">
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
          </div>
        </div>

        <!-- Mini Player -->
        <div class="col-span-1 lg:col-span-5 flex flex-col">
          <MiniPlayer />
        </div>
      </div>

      <!-- Quote Bar -->
      <QuoteBar />

      <!-- Featured Post + Photo Card + Chatter + Theme -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <!-- Left: Featured Post Carousel -->
        <div class="col-span-1 lg:col-span-4 flex flex-col min-h-[300px]">
          <div class="md:col-span-4 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden relative group min-h-[420px] h-full flex flex-col">
            <a class="absolute inset-0 z-20 cursor-pointer" :aria-label="'阅读 ' + posts[postIdx].title" @click.prevent="router.push(posts[postIdx].link)"></a>
            <div class="absolute inset-0 z-0 carousel-image-wrap">
              <Transition name="carousel-fade" mode="out-in">
                <img :key="postIdx" :src="posts[postIdx].image" class="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105 carousel-image" :alt="posts[postIdx].title" />
              </Transition>
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            </div>
            <div class="relative z-10 flex flex-col justify-end p-6 w-full mt-auto h-full pointer-events-none">
              <Transition name="carousel-fade" mode="out-in">
                <div :key="postIdx" class="flex flex-col">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-indigo-500/80 backdrop-blur-lg rounded-full text-[10px] text-white font-black uppercase tracking-widest shadow-lg">Latest Insight</span>
                    <span class="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white/90 font-mono tracking-wider">{{ posts[postIdx].date }}</span>
                  </div>
                  <h2 class="text-2xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform drop-shadow-md">{{ posts[postIdx].title }}</h2>
                  <p class="text-sm text-gray-300 line-clamp-3 drop-shadow-sm mb-6">{{ posts[postIdx].summary }}</p>
                </div>
              </Transition>
            </div>
            <div class="absolute bottom-4 right-6 z-30 flex gap-2">
              <button
                v-for="(_, idx) in posts"
                :key="idx"
                class="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                :class="idx === postIdx ? 'w-6 bg-indigo-400' : 'w-2 bg-white/40 hover:bg-white/80'"
                @click.stop="setPost(idx)"
              ></button>
            </div>
          </div>
        </div>

        <!-- Right: Photo + Chatter + ThemeToggle -->
        <div class="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <!-- Photo Card Carousel -->
          <div class="w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-700 hover:scale-[1.02] relative group min-h-[200px] sm:min-h-[220px] flex-shrink-0 cursor-pointer carousel-image-wrap" @click.prevent="router.push(photos[photoIdx].link)">
            <Transition name="carousel-fade" mode="out-in">
              <img :key="photoIdx" :src="photos[photoIdx].image" class="w-full h-full absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 carousel-image" />
            </Transition>
            <div class="absolute inset-0 bg-black/30 dark:bg-black/50 group-hover:bg-black/10 transition-colors duration-500"></div>
            <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-6">
              <Transition name="carousel-fade" mode="out-in">
                <div :key="photoIdx">
                  <h3 class="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 underline decoration-pink-400">{{ photos[photoIdx].title }}</h3>
                  <p class="text-white/90 text-sm sm:text-lg line-clamp-1">{{ photos[photoIdx].desc }}</p>
                </div>
              </Transition>
            </div>
            <div class="absolute bottom-4 right-4 z-30 flex gap-2">
              <button
                v-for="(_, idx) in photos"
                :key="idx"
                class="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                :class="idx === photoIdx ? 'w-6 bg-pink-400' : 'w-2 bg-white/40 hover:bg-white/80'"
                @click.stop="setPhoto(idx)"
              ></button>
            </div>
          </div>

          <!-- Chatter + ThemeToggle Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full flex-1">
            <div class="sm:col-span-2 flex flex-col min-h-[200px]">
              <div class="w-full h-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden relative group min-h-[220px] flex flex-col">
                <a class="absolute inset-0 z-20 cursor-pointer" :aria-label="'查看杂谈: ' + chaters[chatterIdx].title" @click.prevent="router.push(chaters[chatterIdx].link)"></a>
                <div class="absolute inset-0 z-0 carousel-image-wrap">
                  <Transition name="carousel-fade" mode="out-in">
                    <img :key="chatterIdx" :src="chaters[chatterIdx].image" class="w-full h-full object-cover opacity-80 dark:opacity-60 transition-transform duration-1000 group-hover:scale-105 carousel-image" alt="Chatter Cover" />
                  </Transition>
                  <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div>
                </div>
                <div class="relative z-10 flex flex-col justify-center p-6 md:p-8 h-full pointer-events-none w-full md:w-[85%]">
                  <Transition name="carousel-fade" mode="out-in">
                    <div :key="chatterIdx" class="flex flex-col">
                      <div class="flex items-end gap-2 mb-2">
                        <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 shadow-sm">Records</span>
                        <span class="text-[11px] font-mono text-slate-300 drop-shadow-md">{{ chaters[chatterIdx].date }}</span>
                      </div>
                      <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-1 drop-shadow-md">{{ chaters[chatterIdx].title }}</h3>
                      <p class="text-sm text-slate-300 font-medium leading-relaxed drop-shadow-md line-clamp-2" style="white-space: pre-line">{{ chaters[chatterIdx].content }}</p>
                    </div>
                  </Transition>
                </div>
                <div class="absolute bottom-5 right-6 z-30 flex gap-2">
                  <button
                    v-for="(_, idx) in chaters"
                    :key="idx"
                    class="h-1.5 rounded-full transition-all duration-500 shadow-sm cursor-pointer"
                    :class="idx === chatterIdx ? 'w-6 bg-indigo-400' : 'w-2 bg-white/40 hover:bg-white/80'"
                    @click.stop="setChatter(idx)"
                  ></button>
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

<style scoped>
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.5s ease;
}
.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}
</style>
