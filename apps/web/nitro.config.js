import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './src/mock',
  routesDir: '.',
  routeRules: {
    '/**': {
      cors: true,
    },
  },
  prerender: {
    routes: ['/pokemon', '/item'],
  },
  output: {
    publicDir: './dist/data',
  },
  publicAssets: [{ dir: './public', ignore: ['**'] }],
  hooks: {
    'prerender:generate'(route) {
      if (route.route === '/pokemon') {
        route.fileName = 'pokemon.json'
      }
    },
  },
})
