import { defineHandler } from 'nitro'
import itemList from '../data/item.json'

export default defineHandler(() => {
  return itemList.pokeball
})
