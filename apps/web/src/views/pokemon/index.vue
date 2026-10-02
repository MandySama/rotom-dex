<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const moreOptions = [
  { text: '第一世代', type: 'scope', value: 1 },
  { text: '第二世代', type: 'scope', value: 2 },
  { text: '第三世代', type: 'scope', value: 3 },
  { text: '第四世代', type: 'scope', value: 4 },
  { text: '第五世代', type: 'scope', value: 5 },
  { text: '第六世代', type: 'scope', value: 6 },
  { text: '第七世代', type: 'scope', value: 7 },
  { text: '第八世代', type: 'scope', value: 8 },
  { text: '第九世代', type: 'scope', value: 9 },
  { text: '第十世代', type: 'scope', value: 10 },
  { text: '最初的伙伴', type: 'filter', value: 'partner' },
  { text: '化石宝可梦', type: 'filter', value: 'fossil' },
  { text: '大器晚成宝可梦', type: 'filter', value: 'pseudo_legendary' },
  { text: '传说宝可梦', type: 'filter', value: 'legendary' },
  { text: '幻之宝可梦', type: 'filter', value: 'mythical' },
  { text: '究极异兽', type: 'filter', value: 'ultra_beast' },
  { text: '悖谬宝可梦', type: 'filter', value: 'paradox' },
  { text: '超级进化', type: 'filter', value: 'mega' },
  { text: '超极巨化', type: 'filter', value: 'gigantamax' },
  { text: '阿罗拉的样子', type: 'filter', value: 'alola' },
  { text: '伽勒尔的样子', type: 'filter', value: 'galar' },
  { text: '洗翠的样子', type: 'filter', value: 'hisui' },
  { text: '帕底亚的样子', type: 'filter', value: 'paldea' },
  { text: 'HP排序', type: 'sort', value: 'hp' },
  { text: '攻击排序', type: 'sort', value: 'attack' },
  { text: '防御排序', type: 'sort', value: 'defense' },
  { text: '特攻排序', type: 'sort', value: 'special_attack' },
  { text: '特防排序', type: 'sort', value: 'special_defense' },
  { text: '速度排序', type: 'sort', value: 'speed' },
  { text: '种族值排序', type: 'sort', value: 'base_stats' },
]

const keyword = ref('')

const pokemonList = ref([])

const getPokemonImage = (pokemon) => {
  const imageName = pokemon.picName || `a${pokemon.nationalCode}`
  return `${import.meta.env.BASE_URL}images/pokemon/${imageName}.png`
}

const { list, containerProps, wrapperProps } = useVirtualList(pokemonList, {
  itemHeight: 102,
  overscan: 6,
})

onMounted(async () => {
  pokemonList.value = await request.get('/pokemon')
  pokemonList.value = pokemonList.value.slice(0, 151)
})
</script>

<template>
  <page-layout class="pokemon-page" :navbar-more-options="moreOptions">
    <van-search
      v-model="keyword"
      placeholder="输入全国编号/名称/属性(支持双属性)"
      :clearable="false"
      left-icon=""
    ></van-search>
    <div
      v-bind="containerProps"
      class="h-[calc(100dvh-148px)] scrollbar-none overflow-y-auto px-2 font-['Noto_Sans_SC','Microsoft_YaHei',sans-serif]"
    >
      <div v-bind="wrapperProps" class="flex flex-col gap-y-1.5">
        <div v-for="{ data: pokemon, index } in list" :key="index">
          <div
            class="border-border bg-background flex h-24 cursor-pointer items-center gap-2 rounded-md border pl-1"
          >
            <van-image class="size-22" :src="getPokemonImage(pokemon)"></van-image>
            <div class="text-foreground flex flex-col gap-y-0.5 text-[13px] leading-[18px]">
              <div class="flex gap-x-2">
                <span>编号:</span>
                <span>NO.{{ pokemon.nationalCode }}</span>
              </div>
              <div class="flex gap-x-2">
                <span>名称:</span>
                <span>{{ pokemon.cName }}</span>
              </div>
              <div class="flex gap-x-2">
                <span>属性:</span>
                <span>{{ pokemon.shuxing[0] }} {{ pokemon.shuxing[1] ?? '' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style scoped></style>
