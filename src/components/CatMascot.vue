<script setup>
import { ref } from 'vue'

const catState = ref('idle')
const isChatOpen = ref(false)
const isFeedOpen = ref(false)

const pet = () => {
  catState.value = 'petted'
  setTimeout(() => { catState.value = 'idle' }, 1500)
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) catState.value = 'thinking'
  else catState.value = 'idle'
}

const toggleFeed = () => {
  isFeedOpen.value = !isFeedOpen.value
}
</script>

<template>
  <div class="hidden md:block">
    <div class="fixed bottom-20 right-20 z-[9999] flex flex-col items-center group cursor-grab active:cursor-grabbing" draggable="false">
      <div class="relative">
        <div class="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            @click="toggleChat"
            class="bg-white/90 dark:bg-slate-700/90 p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform border border-gray-100 dark:border-slate-600 text-blue-500 hover:text-blue-600 flex items-center justify-center backdrop-blur-sm"
            title="聊天"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <button
            @click="toggleFeed"
            class="bg-white/90 dark:bg-slate-700/90 p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform border border-gray-100 dark:border-slate-600 flex items-center justify-center backdrop-blur-sm"
            title="喂小鱼干"
          >
            <span class="text-xl leading-none">🐟</span>
          </button>
        </div>
        <div class="w-[120px] h-[120px] relative cursor-pointer" @click="pet">
          <div
            class="cat-sprite w-full h-full"
            :class="{
              'cat-idle': catState === 'idle',
              'cat-petted': catState === 'petted',
              'cat-thinking': catState === 'thinking',
            }"
            style="background-image: url('/siamese-cat.png'); background-size: 300% 300%; background-repeat: no-repeat; image-rendering: pixelated;"
          ></div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
            戳戳我～
          </div>
        </div>
      </div>
    </div>

    <!-- Chat dialog -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="isChatOpen" class="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm" @click="isChatOpen = false">
          <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20 dark:border-white/10" @click.stop>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">AI 助手</h3>
              <button @click="isChatOpen = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">&times;</button>
            </div>
            <div class="h-48 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-4 overflow-y-auto text-sm text-slate-600 dark:text-slate-300">
              你好呀！我是 zhuyu 的 AI 助手，有什么可以帮你的吗？
            </div>
            <div class="flex gap-2">
              <input type="text" placeholder="输入消息..." class="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
               <button class="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors">发送</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.cat-idle {
  animation: catIdle 1.2s infinite;
  background-position-y: 0%;
}
.cat-petted {
  animation: catPet 0.8s infinite;
  background-position-y: 50%;
}
.cat-thinking {
  animation: catIdle 0.6s infinite;
  background-position-y: 0%;
}
</style>
