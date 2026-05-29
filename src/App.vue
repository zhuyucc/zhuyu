<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMusicPlayer } from './stores/music.js'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BackgroundEffects from './components/BackgroundEffects.vue'
import CatMascot from './components/CatMascot.vue'
import MobileNav from './components/MobileNav.vue'
import FloatingPlayer from './components/FloatingPlayer.vue'
import ClockBar from './components/ClockBar.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

const splashDone = ref(false)

const themeMode = ref('system')
const systemDark = ref(false)

const isDark = computed(() => {
  if (themeMode.value === 'system') return systemDark.value
  return themeMode.value === 'dark'
})

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark)
}

function cycleTheme() {
  const order = ['system', 'light', 'dark']
  const idx = order.indexOf(themeMode.value)
  themeMode.value = order[(idx + 1) % 3]
  localStorage.setItem('themeMode', themeMode.value)
  applyTheme(isDark.value)
}

const { setAudioElement, onTimeUpdate, onLoadedMetadata, onEnded } = useMusicPlayer()

const onAudioRef = (el) => {
  if (el) setAudioElement(el)
}

const { currentSong } = useMusicPlayer()

const mql = window.matchMedia('(prefers-color-scheme: dark)')

function updateSystemDark(e) {
  systemDark.value = e.matches
  if (themeMode.value === 'system') applyTheme(e.matches)
}

onMounted(() => {
  const saved = localStorage.getItem('themeMode')
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    themeMode.value = saved
  }
  systemDark.value = mql.matches
  applyTheme(isDark.value)
  mql.addEventListener('change', updateSystemDark)
})
</script>

<template>
  <SplashScreen @done="splashDone = true" />
  <div :class="splashDone ? 'opacity-100' : 'opacity-0'" class="transition-opacity duration-1000 min-h-screen flex flex-col">
    <BackgroundEffects :is-dark="isDark" />
    <NavBar :is-dark="isDark" :theme-mode="themeMode" @toggle-dark="cycleTheme" />
    <MobileNav />

    <audio
      :ref="onAudioRef"
      :src="currentSong.src"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
      preload="metadata"
    ></audio>

    <FloatingPlayer />
    <div class="relative z-10 flex-1 flex flex-col">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" :is-dark="isDark" :theme-mode="themeMode" @toggle-dark="cycleTheme" />
      </router-view>
      <ClockBar />
      <Footer />
    </div>
    <CatMascot />
  </div>
</template>
