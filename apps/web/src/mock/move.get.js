import { defineHandler } from 'nitro'
import moveList from '../data/move.json'

export default defineHandler(() => {
  return moveList.skill
})
