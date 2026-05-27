<script setup>
import { ref, watch, nextTick } from 'vue'
import { useMusicPlayer } from '../stores/music.js'

const { state, lyricsData, currentLyricIndex } = useMusicPlayer()
const containerRef = ref(null)
const lineRefs = ref([])

watch(currentLyricIndex, async () => {
  await nextTick()
  const idx = currentLyricIndex.value
  if (idx >= 0 && containerRef.value && lineRefs.value[idx]) {
    const container = containerRef.value
    const line = lineRefs.value[idx]
    const offset = line.offsetTop - container.offsetHeight / 2 + line.offsetHeight / 2
    container.scrollTo({ top: offset, behavior: 'smooth' })
  }
})
</script>

<template>
  <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6">
    <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">歌词</h2>
    <div
      ref="containerRef"
      class="lyrics-scroll h-[400px] overflow-y-auto overflow-x-hidden scroll-smooth space-y-3"
    >
      <div v-if="!lyricsData.length" class="flex items-center justify-center h-full text-slate-400 text-sm">
        暂无歌词
      </div>
      <div
        v-for="(line, idx) in lyricsData"
        :key="idx"
        :ref="el => { if (el) lineRefs[idx] = el }"
        class="transition-all duration-300 py-2 px-4 rounded-lg text-lg md:text-xl leading-relaxed"
        :class="{
          'text-indigo-600 dark:text-indigo-400 font-bold scale-110': idx === currentLyricIndex,
          'text-slate-600 dark:text-slate-400': idx === currentLyricIndex - 1 || idx === currentLyricIndex + 1,
          'text-slate-400 dark:text-slate-500': idx < currentLyricIndex - 1 || idx > currentLyricIndex + 1,
        }"
      >
        {{ line.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.lyrics-scroll {
  scrollbar-width: thin;
  scrollbar-color: #a5b4fc transparent;
}
.dark .lyrics-scroll {
  scrollbar-color: #6366f1 transparent;
}
.lyrics-scroll::-webkit-scrollbar {
  width: 6px;
}
.lyrics-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.lyrics-scroll::-webkit-scrollbar-thumb {
  background: #a5b4fc;
  border-radius: 999px;
}
.lyrics-scroll::-webkit-scrollbar-thumb:hover {
  background: #818cf8;
}
.dark .lyrics-scroll::-webkit-scrollbar-thumb {
  background: #6366f1;
}
.dark .lyrics-scroll::-webkit-scrollbar-thumb:hover {
  background: #818cf8;
}
</style>
