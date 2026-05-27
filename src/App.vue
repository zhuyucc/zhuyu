<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMusicPlayer } from './stores/music.js'
import { pendingScrollResolve } from './router/index.js'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BackgroundEffects from './components/BackgroundEffects.vue'
import CatMascot from './components/CatMascot.vue'
import MobileNav from './components/MobileNav.vue'
import FloatingPlayer from './components/FloatingPlayer.vue'
import ClockBar from './components/ClockBar.vue'
import Footer from './components/Footer.vue'

const isDark = ref(false)

const onAfterLeave = () => {
  if (pendingScrollResolve) pendingScrollResolve()
}

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  if (pendingScrollResolve) pendingScrollResolve()
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const { setAudioElement, onTimeUpdate, onLoadedMetadata, onEnded } = useMusicPlayer()

const onAudioRef = (el) => {
  if (el) setAudioElement(el)
}

const { currentSong } = useMusicPlayer()
</script>

<template>
  <BackgroundEffects :is-dark="isDark" />
  <NavBar :is-dark="isDark" />
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
      <transition name="fade" mode="out-in" @after-leave="onAfterLeave">
        <component :is="Component" :key="route.path" :is-dark="isDark" @toggle-dark="toggleDark" />
      </transition>
    </router-view>
    <ClockBar />
    <Footer />
  </div>
  <CatMascot />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
