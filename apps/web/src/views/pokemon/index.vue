<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const moreOptions = [
  { text: '第一世代', type: 'scope', value: '第一世代' },
  { text: '第二世代', type: 'scope', value: '第二世代' },
  { text: '第三世代', type: 'scope', value: '第三世代' },
  { text: '第四世代', type: 'scope', value: '第四世代' },
  { text: '第五世代', type: 'scope', value: '第五世代' },
  { text: '第六世代', type: 'scope', value: '第六世代' },
  { text: '第七世代', type: 'scope', value: '第七世代' },
  { text: '第八世代', type: 'scope', value: '第八世代' },
  { text: '第九世代', type: 'scope', value: '第九世代' },
  { text: '最初的伙伴', type: 'filter', value: '最初的伙伴' },
  { text: '化石宝可梦', type: 'filter', value: '化石宝可梦' },
  { text: '大器晚成宝可梦', type: 'filter', value: '大器晚成' },
  { text: '传说宝可梦', type: 'filter', value: '传说宝可梦·神兽' },
  { text: '幻之宝可梦', type: 'filter', value: '幻之宝可梦·幻兽' },
  { text: '究极异兽', type: 'filter', value: '究极异兽' },
  { text: '悖谬宝可梦', type: 'filter', value: '悖谬宝可梦' },
  { text: '超级进化', type: 'filter', value: '超级' },
  { text: '超极巨化', type: 'filter', value: '超极巨化' },
  { text: '阿罗拉的样子', type: 'filter', value: '(阿罗拉)' },
  { text: '伽勒尔的样子', type: 'filter', value: '伽勒尔' },
  { text: '洗翠的样子', type: 'filter', value: '洗翠' },
  { text: '帕底亚的样子', type: 'filter', value: '帕底亚的样子' },
  { text: 'HP排序', type: 'sort', value: 5 },
  { text: '攻击排序', type: 'sort', value: 4 },
  { text: '防御排序', type: 'sort', value: 3 },
  { text: '特攻排序', type: 'sort', value: 2 },
  { text: '特防排序', type: 'sort', value: 1 },
  { text: '速度排序', type: 'sort', value: 0 },
  { text: '种族值排序', type: 'sort', value: -1 },
]

const selectedScopes = ref([])
const selectedFilters = ref([])
const selectedSort = ref()

const keyword = ref('')

const pokemonList = ref([])
const searchResults = ref([])

const { containerProps, wrapperProps, list, scrollTo } = useVirtualList(searchResults, {
  itemHeight: 102,
  overscan: 6,
})

const scrollTop = ref(0)

const handleSearch = () => {
  const query = keyword.value.trim().replace(/\s+/, ' ')
  searchResults.value = pokemonList.value.filter((pokemon) => {
    if (selectedScopes.value.length && !selectedScopes.value.includes(pokemon.sidai)) return false
    if (
      selectedFilters.value.length &&
      !selectedFilters.value.includes(pokemon.othertype) &&
      !selectedFilters.value.some((filter) => pokemon.cName.includes(filter))
    ) {
      return false
    }
    if (query && /^\d+$/.test(query) && !pokemon.nationalCode.includes(query)) {
      return false
    }
    if (
      query &&
      !/^\d+$/.test(query) &&
      !pokemon.cName.toLowerCase().includes(query) &&
      !pokemon.shuxing.join(' ').includes(query)
    ) {
      return false
    }
    return true
  })
  if (selectedSort.value !== undefined) {
    searchResults.value.sort((a, b) => getSortValue(b) - getSortValue(a))
  }
  scrollTo(0)
}

const onClickLeft = () => {
  searchResults.value = searchResults.value.reverse()
  scrollTo(0)
}

const onSelectMore = ({ scopes, filters, sort }) => {
  selectedScopes.value = scopes
  selectedFilters.value = filters
  selectedSort.value = sort
  handleSearch()
}

const onScroll = (event) => {
  scrollTop.value = event.currentTarget.scrollTop
}

const getImage = (pokemon) => {
  const imageName = pokemon.picName || `a${pokemon.nationalCode}`
  return `/images/pokemon/${imageName}.png`
}

const getSortText = () => {
  return moreOptions.find((option) => option.value === selectedSort.value).text.replace('排序', '')
}

const getSortValue = (pokemon) => {
  return selectedSort.value === -1
    ? pokemon.zhongzuzhi.reduce((sum, stat) => sum + stat, 0)
    : pokemon.zhongzuzhi[selectedSort.value]
}

onMounted(async () => {
  pokemonList.value = await request.get('/pokemon')
  searchResults.value = [...pokemonList.value]
})

onActivated(() => {
  containerProps.ref.value.scrollTop = scrollTop.value
})
</script>

<template>
  <page-layout
    class="pokemon-page"
    :navbar-more-options="moreOptions"
    @click-navbar-left="onClickLeft"
    @select-navbar-more="onSelectMore"
  >
    <van-search
      v-model="keyword"
      placeholder="输入全国编号/名称/属性(支持双属性)"
      :clearable="false"
      left-icon=""
      @update:model-value="handleSearch"
    ></van-search>
    <div
      v-bind="containerProps"
      @scroll="onScroll"
      class="h-[calc(100dvh-148px)] scrollbar-none overflow-y-auto px-2 font-['Noto_Sans_SC','Microsoft_YaHei',sans-serif]"
    >
      <div v-bind="wrapperProps" class="flex flex-col gap-y-1.5">
        <div
          v-for="{ data: pokemon, index } in list"
          :key="index"
          class="border-border bg-background flex h-24 cursor-pointer items-center gap-2.5 rounded-md border pl-1"
        >
          <van-image class="size-22" :src="getImage(pokemon)"></van-image>
          <div class="text-foreground flex flex-col gap-y-0.5 text-[13px] leading-4.5">
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
            <div v-if="selectedSort !== undefined" class="text-primary flex gap-x-2">
              <span>{{ getSortText() }}:</span>
              <span>
                {{ getSortValue(pokemon) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style scoped></style>
