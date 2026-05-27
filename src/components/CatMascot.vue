<script setup>
import { ref, nextTick } from 'vue'

const catState = ref('idle')
const isChatOpen = ref(false)
const bubbleText = ref('')
const bubbleVisible = ref(false)
const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const chatBody = ref(null)

const petMessages = [
  '唔…别戳啦～',
  '喵～？',
  '干嘛呀～',
  '好困…zzz',
  '再戳我就生气啦！',
  '嘿嘿～',
  '耳朵痒痒的…',
]

const feedMessages = [
  '小鱼干真好吃！',
  '再来一条～',
  '你对我最好啦！',
  '咔嚓咔嚓…',
  '还有吗还有吗？',
  '吃饱了，想睡觉…',
  '鱼鱼永远的神！',
]

let bubbleTimer = null

const showBubble = (text) => {
  bubbleText.value = text
  bubbleVisible.value = true
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => { bubbleVisible.value = false }, 3000)
}

const pet = () => {
  catState.value = 'petted'
  showBubble(petMessages[Math.floor(Math.random() * petMessages.length)])
  setTimeout(() => { catState.value = 'idle' }, 1500)
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    catState.value = 'thinking'
    if (messages.value.length === 0) {
      messages.value.push({ role: 'assistant', content: '你好呀！我是 zhuyu 的 AI 助手欢欢，有什么可以帮你的吗？' })
    }
  } else {
    catState.value = 'idle'
  }
}

const feed = () => {
  catState.value = 'petted'
  showBubble(feedMessages[Math.floor(Math.random() * feedMessages.length)])
  setTimeout(() => { catState.value = 'idle' }, 1500)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  inputText.value = ''
  messages.value.push({ role: 'user', content: text })
  loading.value = true
  messages.value.push({ role: 'assistant', content: '' })
  await scrollToBottom()

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value.filter(m => m.content).map(m => ({ role: m.role, content: m.content })),
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Request failed')
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              messages.value[messages.value.length - 1].content += delta
              await scrollToBottom()
            }
          } catch { }
        }
      }
    }
  } catch (err) {
    messages.value[messages.value.length - 1].content = '呜…出错了，稍后再试试吧～'
  } finally {
    loading.value = false
    catState.value = 'idle'
    await scrollToBottom()
  }
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
            @click="feed"
            class="bg-white/90 dark:bg-slate-700/90 p-2.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform border border-gray-100 dark:border-slate-600 flex items-center justify-center backdrop-blur-sm"
            title="喂小鱼干"
          >
            <span class="text-xl leading-none">🐟</span>
          </button>
        </div>
        <div class="w-[120px] h-[120px] relative cursor-pointer" @click="pet">
          <transition name="bubble-fade">
            <div v-if="bubbleVisible" class="absolute -top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div class="bg-white dark:bg-slate-700 text-slate-700 dark:text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 dark:border-slate-600 whitespace-nowrap max-w-[160px] truncate">
                {{ bubbleText }}
              </div>
              <div class="w-2.5 h-2.5 bg-white dark:bg-slate-700 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-slate-200 dark:border-slate-600"></div>
            </div>
          </transition>
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
            <div ref="chatBody" class="h-48 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-4 overflow-y-auto text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'text-right' : ''">
                <span :class="msg.role === 'user' ? 'bg-indigo-500 text-white px-3 py-1.5 rounded-2xl inline-block max-w-[80%]' : 'text-slate-600 dark:text-slate-300'">
                  {{ msg.content || (loading && i === messages.length - 1 ? '…' : '') }}
                </span>
              </div>
            </div>
            <form class="flex gap-2" @submit.prevent="sendMessage">
              <input v-model="inputText" type="text" placeholder="输入消息..." :disabled="loading" class="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50" />
              <button type="submit" :disabled="loading" class="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50">发送</button>
            </form>
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

.bubble-fade-enter-active,
.bubble-fade-leave-active {
  transition: all 0.25s ease;
}
.bubble-fade-enter-from,
.bubble-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
