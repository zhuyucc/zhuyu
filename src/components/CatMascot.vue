<script setup>
import { ref, computed, nextTick } from 'vue'
import { useMusicPlayer } from '../stores/music.js'

const { state: musicState } = useMusicPlayer()
const isPlaying = computed(() => musicState.isPlaying)

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

const isMinimized = ref(false)

const toggleChat = () => {
  if (isMinimized.value) {
    isMinimized.value = false
    isChatOpen.value = true
    catState.value = 'thinking'
    return
  }
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    catState.value = 'thinking'
    if (messages.value.length === 0) {
      messages.value.push({ role: 'assistant', content: '你好呀！我是 zhuyu 的 AI 助手包子，有什么可以帮你的吗？' })
    }
  } else {
    catState.value = 'idle'
  }
}

const minimizeChat = () => {
  isMinimized.value = true
  isChatOpen.value = false
  catState.value = 'idle'
}

const feed = () => {
  catState.value = 'petted'
  showBubble(feedMessages[Math.floor(Math.random() * feedMessages.length)])
  setTimeout(() => { catState.value = 'idle' }, 1500)
}

const toastVisible = ref(false)
const toastText = ref('')
const status = ref('')

const showToast = (text) => {
  toastText.value = text
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2000)
}

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showToast('已复制')
  } catch {}
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
  status.value = '正在思考...'
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
            const choice = parsed.choices?.[0]
            const delta = choice?.delta
            if (delta?.tool_calls) {
              if (status.value !== '正在生成回复...') status.value = '正在搜索...'
            }
            if (delta?.content) {
              if (status.value) status.value = '正在生成回复...'
              messages.value[messages.value.length - 1].content += delta.content
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
    status.value = ''
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
          <svg
            class="cat-svg w-full h-full"
            :class="{
              'cat-idle': catState === 'idle' && !isPlaying,
              'cat-petted': catState === 'petted',
              'cat-thinking': catState === 'thinking',
              'cat-listening': isPlaying,
            }"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- tail (behind body) -->
            <path d="M76 82 Q92 76 94 60 Q95 50 88 53" fill="#1a1a1a" stroke="none" />
            <!-- body -->
            <path d="M60 48 C69 48 75 56 81 64 C86 74 84 84 78 92 C70 98 50 98 42 92 C36 84 34 74 39 64 C45 56 51 48 60 48Z" fill="white" stroke="#ddd" stroke-width="0.6" />
            <!-- head -->
            <circle cx="60" cy="34" r="20" fill="white" stroke="#ddd" stroke-width="0.6" />
            <!-- black patch on head top -->
            <ellipse cx="60" cy="18" rx="7" ry="4.5" fill="#1a1a1a" />
            <!-- black patch on head top -->
            <ellipse cx="60" cy="18" rx="7" ry="4.5" fill="#1a1a1a" />
            <!-- left ear -->
            <path d="M43 26 Q41 14 46 11 Q52 10 55 20Z" fill="#1a1a1a" />
            <path d="M45 25 Q44 16 47 13 Q51 12 53 20Z" fill="#f5a0b0" />
            <!-- right ear -->
            <path d="M77 26 Q79 14 74 11 Q68 10 65 20Z" fill="#1a1a1a" />
            <path d="M75 25 Q76 16 73 13 Q69 12 67 20Z" fill="#f5a0b0" />
            <!-- eyes -->
            <ellipse cx="52" cy="35" rx="4.5" ry="5" fill="#2d2d2d" />
            <ellipse cx="68" cy="35" rx="4.5" ry="5" fill="#2d2d2d" />
            <circle cx="50.5" cy="33.5" r="1.8" fill="white" />
            <circle cx="66.5" cy="33.5" r="1.8" fill="white" />
            <!-- nose -->
            <path d="M59 41 L61 43 L57 43Z" fill="#f5a0b0" />
            <!-- mouth -->
            <path d="M61 43 C63 45 65 44 66 42" stroke="#555" stroke-width="0.8" fill="none" stroke-linecap="round" />
            <path d="M61 43 C59 45 57 44 54 42" stroke="#555" stroke-width="0.8" fill="none" stroke-linecap="round" />
            <!-- whiskers -->
            <line x1="40" y1="37" x2="26" y2="35" stroke="#aaa" stroke-width="0.6" stroke-linecap="round" />
            <line x1="40" y1="40" x2="26" y2="41" stroke="#aaa" stroke-width="0.6" stroke-linecap="round" />
            <line x1="80" y1="37" x2="94" y2="35" stroke="#aaa" stroke-width="0.6" stroke-linecap="round" />
            <line x1="80" y1="40" x2="94" y2="41" stroke="#aaa" stroke-width="0.6" stroke-linecap="round" />
            <!-- headphones -->
            <g v-if="isPlaying" class="cat-headphones">
              <path d="M38 26 Q60 5 82 26" stroke="#6366f1" stroke-width="3.5" fill="none" stroke-linecap="round" />
              <rect x="32" y="22" width="12" height="18" rx="4" fill="#6366f1" />
              <rect x="76" y="22" width="12" height="18" rx="4" fill="#6366f1" />
            </g>
            <!-- left paw -->
            <ellipse cx="50" cy="94" rx="5" ry="3" fill="white" stroke="#ddd" stroke-width="0.5" />
            <!-- right paw -->
            <ellipse cx="70" cy="94" rx="5" ry="3" fill="white" stroke="#ddd" stroke-width="0.5" />
          </svg>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
            戳戳我～
          </div>
        </div>
      </div>
    </div>

    <!-- Minimized tab -->
    <transition name="toast-fade">
      <div v-if="isMinimized" @click="toggleChat" class="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] bg-white dark:bg-slate-800 border border-r-0 border-slate-200 dark:border-slate-700 rounded-l-xl shadow-lg px-3 py-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex flex-col items-center gap-1" title="打开AI助手">
        <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd"/></svg>
        <span class="text-[10px] text-slate-500 dark:text-slate-400" style="writing-mode:vertical-rl">AI助手</span>
      </div>
    </transition>

    <!-- Chat dialog -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="isChatOpen" class="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-xl w-full mx-4 shadow-2xl border border-white/20 dark:border-white/10" @click.stop>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-slate-800 dark:text-white">AI 助手</h3>
              <div class="flex items-center gap-2">
                <button @click="minimizeChat" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg leading-none" title="最小化">─</button>
                <button @click="isChatOpen = false; isMinimized = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg leading-none" title="关闭">&times;</button>
              </div>
            </div>
            <div ref="chatBody" class="chat-scroll h-72 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 mb-4 overflow-y-auto text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <div v-for="(msg, i) in messages" :key="i" :class="msg.role === 'user' ? 'text-right' : ''">
                <span v-if="msg.role === 'user'" class="bg-indigo-500 text-white px-3 py-1.5 rounded-2xl inline-block max-w-[80%] text-left">
                  {{ msg.content }}
                </span>
                <span v-else class="text-slate-600 dark:text-slate-300">
                  {{ msg.content || (loading && i === messages.length - 1 ? '…' : '') }}
                  <span v-if="!loading || i !== messages.length - 1" class="inline-flex gap-0.5 align-middle ml-1">
                    <button @click="copyText(msg.content)" class="inline-flex items-center px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-500 dark:text-slate-300 transition-colors" title="复制">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </button>
                  </span>
                </span>
              </div>
            </div>
            <div v-if="loading && status" class="text-center text-[10px] text-slate-400 dark:text-slate-500 mb-2 italic animate-pulse">{{ status }}</div>
            <form class="flex gap-2" @submit.prevent="sendMessage">
              <input v-model="inputText" type="text" placeholder="输入消息..." :disabled="loading" class="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50" />
              <button type="submit" :disabled="loading" class="px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors disabled:opacity-50">发送</button>
            </form>
            <transition name="toast-fade">
              <div v-if="toastVisible" class="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs px-3 py-1.5 rounded-lg shadow-lg">
                {{ toastText }}
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.cat-svg {
  overflow: visible;
}
.cat-idle {
  animation: catIdle 2s ease-in-out infinite;
}
.cat-petted {
  animation: catPet 0.6s ease-in-out;
}
.cat-thinking {
  animation: catThink 1.5s ease-in-out infinite;
}
.cat-listening {
  animation: catListen 1.2s ease-in-out infinite;
}

@keyframes catIdle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes catPet {
  0% { transform: scale(1) rotate(0); }
  30% { transform: scale(0.92) rotate(-4deg); }
  60% { transform: scale(1.05) rotate(2deg); }
  100% { transform: scale(1) rotate(0); }
}
@keyframes catThink {
  0%, 100% { transform: translateY(0) rotate(0); }
  25% { transform: translateY(-2px) rotate(-3deg); }
  75% { transform: translateY(-1px) rotate(3deg); }
}
@keyframes catListen {
  0%, 100% { transform: rotate(-0.8deg); }
  50% { transform: rotate(0.8deg); }
}

.chat-scroll::-webkit-scrollbar {
  width: 4px;
}
.chat-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
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

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

<style>
.dark .chat-scroll::-webkit-scrollbar-thumb {
  background: #475569;
}
</style>
