import { defineHandler } from 'nitro'
import pokemonList from '../data/pokemon.json'

export default defineHandler(() => {
  return pokemonList.pokemon
})
