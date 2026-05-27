<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const quotes = [
  '路漫漫其修远兮，吾将上下而求索。 ——屈原《离骚》',
  '乘风破浪会有时，直挂云帆济沧海。 ——李白《行路难》',
  '会当凌绝顶，一览众山小。 ——杜甫《望岳》',
  '问渠那得清如许，为有源头活水来。 ——朱熹《观书有感》',
  '纸上得来终觉浅，绝知此事要躬行。 ——陆游《冬夜读书示子聿》',
  '人生自古谁无死，留取丹心照汗青。 ——文天祥《过零丁洋》',
  '山重水复疑无路，柳暗花明又一村。 ——陆游《游山西村》',
  '不识庐山真面目，只缘身在此山中。 ——苏轼《题西林壁》',
  '落红不是无情物，化作春泥更护花。 ——龚自珍《己亥杂诗》',
  '天行健，君子以自强不息。 ——《周易》',
  '千磨万击还坚劲，任尔东西南北风。 ——郑燮《竹石》',
  '举杯邀明月，对影成三人。 ——李白《月下独酌》',
  '海内存知己，天涯若比邻。 ——王勃《送杜少府之任蜀州》',
  '莫愁前路无知己，天下谁人不识君。 ——高适《别董大》',
  '春蚕到死丝方尽，蜡炬成灰泪始干。 ——李商隐《无题》',
  '采菊东篱下，悠然见南山。 ——陶渊明《饮酒》',
  '天生我材必有用，千金散尽还复来。 ——李白《将进酒》',
  '安得广厦千万间，大庇天下寒士俱欢颜。 ——杜甫《茅屋为秋风所破歌》',
  '先天下之忧而忧，后天下之乐而乐。 ——范仲淹《岳阳楼记》',
  '业精于勤荒于嬉，行成于思毁于随。 ——韩愈《进学解》',
  '书山有路勤为径，学海无涯苦作舟。 ——韩愈',
  '少年辛苦终身事，莫向光阴惰寸功。 ——杜荀鹤《题弟侄书堂》',
  '大鹏一日同风起，扶摇直上九万里。 ——李白《上李邕》',
  '此曲只应天上有，人间能得几回闻。 ——杜甫《赠花卿》',
  '看似寻常最奇崛，成如容易却艰辛。 ——王安石《题张司业诗》',
  '咬定青山不放松，立根原在破岩中。 ——郑燮《竹石》',
  '不畏浮云遮望眼，自缘身在最高层。 ——王安石《登飞来峰》',
  '青山一道同云雨，明月何曾是两乡。 ——王昌龄《送柴侍御》',
  '同是天涯沦落人，相逢何必曾相识。 ——白居易《琵琶行》',
  '欲穷千里目，更上一层楼。 ——王之涣《登鹳雀楼》',
  '黑发不知勤学早，白首方悔读书迟。 ——颜真卿《劝学》',
  '宝剑锋从磨砺出，梅花香自苦寒来。 ——《警世贤文》',
  '沉舟侧畔千帆过，病树前头万木春。 ——刘禹锡《酬乐天扬州初逢席上见赠》',
  '旧时王谢堂前燕，飞入寻常百姓家。 ——刘禹锡《乌衣巷》',
  '世事洞明皆学问，人情练达即文章。 ——曹雪芹《红楼梦》',
  '雄关漫道真如铁，而今迈步从头越。 ——毛泽东《忆秦娥·娄山关》',
  '数风流人物，还看今朝。 ——毛泽东《沁园春·雪》',
  '一花独放不是春，百花齐放春满园。 ——《古今贤文》',
  '月落乌啼霜满天，江枫渔火对愁眠。 ——张继《枫桥夜泊》',
  '等闲识得东风面，万紫千红总是春。 ——朱熹《春日》',
  '接天莲叶无穷碧，映日荷花别样红。 ——杨万里《晓出净慈寺送林子方》',
  '停车坐爱枫林晚，霜叶红于二月花。 ——杜牧《山行》',
  '但愿人长久，千里共婵娟。 ——苏轼《水调歌头》',
  '两情若是久长时，又岂在朝朝暮暮。 ——秦观《鹊桥仙》',
  '衣带渐宽终不悔，为伊消得人憔悴。 ——柳永《蝶恋花》',
  '众里寻他千百度，蓦然回首，那人却在灯火阑珊处。 ——辛弃疾《青玉案》',
  '江山代有才人出，各领风骚数百年。 ——赵翼《论诗》',
  '何须浅碧深红色，自是花中第一流。 ——李清照《鹧鸪天》',
  '人生如逆旅，我亦是行人。 ——苏轼《临江仙》',
  '世事一场大梦，人生几度秋凉。 ——苏轼《西江月》',
]

const displayText = ref('')
const currentIndex = ref(0)
let intervalId = null

const typeQuote = (text, callback) => {
  let i = 0
  displayText.value = ''
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (i <= text.length) {
      displayText.value = text.slice(0, i)
      i++
    } else {
      clearInterval(intervalId)
      if (callback) setTimeout(callback, 10000)
    }
  }, 80)
}

const nextQuote = () => {
  currentIndex.value = (currentIndex.value + 1) % quotes.length
  typeQuote(quotes[currentIndex.value], nextQuote)
}

onMounted(() => {
  typeQuote(quotes[0], nextQuote)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="w-full rounded-3xl bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-xl border border-white/10 dark:border-slate-700/50 shadow-2xl p-5 flex items-center justify-between transition-all duration-700 hover:shadow-indigo-500/20 group h-20">
    <div class="flex items-center justify-center gap-1.5 h-8 w-16">
      <div v-for="i in 5" :key="i"
        class="w-1 rounded-full bg-indigo-400/60 ink-drop"
        :style="{ animationDelay: i * 300 + 'ms' }"
      ></div>
    </div>
    <div class="flex-1 px-8 flex justify-center items-center overflow-hidden">
      <p class="text-white text-sm md:text-base lg:text-lg font-bold tracking-widest truncate drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">
        {{ displayText }}<span class="inline-block w-[3px] h-5 bg-indigo-400 align-middle ml-1 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-cursor"></span>
      </p>
    </div>
    <div class="w-16 flex justify-end">
      <svg class="w-6 h-6 text-indigo-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-cursor {
  animation: cursorBlink 0.8s step-end infinite;
}
@keyframes inkDrop {
  0%, 100% { height: 8px; opacity: 0.3; }
  50% { height: 24px; opacity: 0.8; }
}
.ink-drop {
  animation: inkDrop 2.4s ease-in-out infinite;
}
</style>
