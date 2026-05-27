<script setup>
const props = defineProps({
  isDark: Boolean,
})
const emit = defineEmits(['toggle'])
</script>

<template>
  <div
    @click="emit('toggle')"
    class="rounded-3xl backdrop-blur-md border shadow-xl p-6 flex flex-col justify-center items-center transition-all duration-500 hover:scale-[1.05] cursor-pointer group relative overflow-hidden h-full w-full"
    :class="isDark ? 'bg-slate-800/40 border-slate-600/50' : 'bg-white/40 border-white/40'"
  >
    <div class="relative w-20 h-20 rounded-full overflow-hidden mb-3 shadow-inner flex-shrink-0">
      <div
        class="absolute inset-0 transition-transform duration-700"
        :class="isDark ? '-translate-y-full' : 'translate-y-0'"
        style="background: linear-gradient(to bottom right, #7dd3fc, #fef08a)"
      ></div>
      <div
        class="absolute inset-0 transition-transform duration-700"
        :class="isDark ? 'translate-y-0' : 'translate-y-full'"
        style="background: linear-gradient(to bottom right, #3730a3, #1e293b)"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
        :class="isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'"
      >
        <span class="text-3xl drop-shadow-md">☀️</span>
      </div>
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
        :class="isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'"
      >
        <span class="text-3xl drop-shadow-md">🌸</span>
      </div>
    </div>
    <div class="text-center z-10 mt-auto">
      <h3 class="text-xl font-bold transition-colors duration-500" :class="isDark ? 'text-white' : 'text-slate-800'">夜间模式</h3>
      <p class="text-sm font-medium mt-1 transition-colors duration-500" :class="isDark ? 'text-slate-400' : 'text-slate-500'">
        {{ isDark ? '流萤飞舞的深夜' : '晴空万里的白昼' }}
      </p>
    </div>
  </div>
</template>
