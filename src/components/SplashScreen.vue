<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(true)
const faded = ref(false)

const emit = defineEmits(['done'])

onMounted(() => {
  const hasSeen = sessionStorage.getItem('hasSeenSplash') === 'true'
  if (hasSeen) {
    visible.value = false
    emit('done')
    return
  }
  setTimeout(() => {
    faded.value = true
    setTimeout(() => {
      visible.value = false
      sessionStorage.setItem('hasSeenSplash', 'true')
      emit('done')
    }, 800)
  }, 2500)
})
</script>

<template>
  <Transition name="splash-fade">
    <div v-if="visible" class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950" :class="{ 'opacity-0 transition-opacity duration-800': faded }">
      <div class="flex gap-1 mb-8">
        <div class="w-4 h-4 bg-indigo-500 pixel animate-bounce" style="animation-delay:0s"></div>
        <div class="w-4 h-4 bg-purple-500 pixel animate-bounce" style="animation-delay:0.15s"></div>
        <div class="w-4 h-4 bg-pink-500 pixel animate-bounce" style="animation-delay:0.3s"></div>
        <div class="w-4 h-4 bg-cyan-500 pixel animate-bounce" style="animation-delay:0.45s"></div>
        <div class="w-4 h-4 bg-green-500 pixel animate-bounce" style="animation-delay:0.6s"></div>
      </div>
      <div class="relative">
        <pre class="text-indigo-400 text-xs sm:text-sm leading-tight font-mono select-none pixel-text animate-pulse">
<span class="text-indigo-300">┌──────────────────────────┐</span>
<span class="text-indigo-300">│</span>   <span class="text-white font-bold">ZHUVU'S BLOG</span>    <span class="text-indigo-300">│</span>
<span class="text-indigo-300">│</span>  <span class="text-slate-400">loading...</span>  <span class="text-indigo-300">│</span>
<span class="text-indigo-300">└──────────────────────────┘</span>
        </pre>
      </div>
      <div class="mt-6 flex gap-0.5">
        <div v-for="i in 12" :key="i" class="w-2 h-5 bg-indigo-500 pixel bar" :style="{ animationDelay: i * 0.1 + 's' }"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pixel {
  image-rendering: pixelated;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
}
.pixel-text {
  image-rendering: pixelated;
  letter-spacing: 0;
}
.bar {
  animation: bar-load 1s ease-in-out infinite alternate;
}
@keyframes bar-load {
  0% { height: 4px; }
  100% { height: 20px; }
}
.splash-fade-leave-active {
  transition: opacity 0.8s ease;
}
.splash-fade-leave-to {
  opacity: 0;
}
</style>
