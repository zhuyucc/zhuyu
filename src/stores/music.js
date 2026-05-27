import { reactive, computed, ref } from 'vue'

const playlist = [
  { id: 1, title: '我不知道 (Live)', artist: '梁博', src: '/music/梁博/梁博 - 我不知道 (Live).mp3', lrc: '/music/梁博/梁博 - 我不知道 (Live).lrc' },
  { id: 2, title: '日落大道', artist: '梁博', src: '/music/梁博/梁博 - 日落大道.mp3', lrc: '/music/梁博/梁博 - 日落大道.lrc' },
]

const state = reactive({
  currentIndex: 0,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
})

// Lyrics state
const lyricsData = ref([])
const showLyrics = ref(false)

const currentSong = computed(() => playlist[state.currentIndex])
const progressPercent = computed(() => {
  if (!state.duration) return 0
  return (state.currentTime / state.duration) * 100
})

const currentLyricIndex = computed(() => {
  const lines = lyricsData.value
  if (!lines.length) return -1
  const t = state.currentTime * 1000
  let idx = -1
  for (let i = 0; i < lines.length; i++) {
    if (t >= lines[i].time) idx = i
  }
  return idx
})

const currentLyricLine = computed(() => {
  const idx = currentLyricIndex.value
  return idx >= 0 ? lyricsData.value[idx].text : ''
})

const formatTime = (t) => {
  if (!t || isNaN(t)) return '00:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
}

// LRC parser
const parseLRC = (text) => {
  const lines = text.split('\n')
  const result = []
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  for (const line of lines) {
    const match = line.match(timeRegex)
    if (match) {
      const m = parseInt(match[1])
      const s = parseInt(match[2])
      const ms = parseInt(match[3].padEnd(3, '0'))
      const time = m * 60000 + s * 1000 + ms
      const text = line.replace(timeRegex, '').trim()
      if (text) {
        result.push({ time, text })
      }
    }
  }
  result.sort((a, b) => a.time - b.time)
  return result
}

const loadLyrics = async () => {
  const lrcUrl = currentSong.value.lrc
  if (!lrcUrl) {
    lyricsData.value = []
    showLyrics.value = false
    return
  }
  try {
    const res = await fetch(lrcUrl)
    const text = await res.text()
    lyricsData.value = parseLRC(text)
    showLyrics.value = lyricsData.value.length > 0
  } catch {
    lyricsData.value = []
    showLyrics.value = false
  }
}

let audioEl = null

const setAudioElement = (el) => {
  audioEl = el
  audioEl.volume = state.volume
  if (state.isPlaying) {
    audioEl.play().catch(() => {})
  }
}

const play = () => {
  if (audioEl) {
    audioEl.play()
    state.isPlaying = true
  }
}

const pause = () => {
  if (audioEl) {
    audioEl.pause()
    state.isPlaying = false
  }
}

const togglePlay = () => {
  state.isPlaying ? pause() : play()
}

const prev = () => {
  state.currentIndex = (state.currentIndex - 1 + playlist.length) % playlist.length
  resetAndPlay()
}

const next = () => {
  state.currentIndex = (state.currentIndex + 1) % playlist.length
  resetAndPlay()
}

const selectSong = (idx) => {
  state.currentIndex = idx
  resetAndPlay()
}

const resetAndPlay = () => {
  loadLyrics()
  if (audioEl) {
    audioEl.load()
    play()
  }
}

const seek = (pct) => {
  if (audioEl && state.duration) {
    audioEl.currentTime = pct * state.duration
  }
}

const toggleMute = () => {
  state.isMuted = !state.isMuted
  if (audioEl) audioEl.muted = state.isMuted
}

const setVolume = (v) => {
  state.volume = v
  if (audioEl) {
    audioEl.volume = v
    state.isMuted = false
    audioEl.muted = false
  }
}

const onTimeUpdate = () => {
  if (audioEl) state.currentTime = audioEl.currentTime
}

const onLoadedMetadata = () => {
  if (audioEl) state.duration = audioEl.duration
}

const onEnded = () => {
  next()
}

// Load lyrics on first call
loadLyrics()

export function useMusicPlayer() {
  return {
    playlist,
    state,
    currentSong,
    progressPercent,
    formatTime,
    lyricsData,
    showLyrics,
    currentLyricIndex,
    currentLyricLine,
    setAudioElement,
    play,
    pause,
    togglePlay,
    prev,
    next,
    selectSong,
    seek,
    toggleMute,
    setVolume,
    onTimeUpdate,
    onLoadedMetadata,
    onEnded,
  }
}
