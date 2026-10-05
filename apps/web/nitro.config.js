import { defineConfig } from 'nitro'

const prerenderRoutes = ['/pokemon', '/item']

export default defineConfig({
  serverDir: './src/mock',
  routesDir: '.',
  routeRules: {
    '/**': {
      cors: true,
    },
  },
  prerender: {
    routes: prerenderRoutes,
  },
  output: {
    publicDir: './dist/data',
  },
  publicAssets: [{ dir: './public', ignore: ['**'] }],
  hooks: {
    'prerender:generate'(prerenderRoute) {
      if (prerenderRoutes.includes(prerenderRoute.route)) {
        prerenderRoute.fileName = `${prerenderRoute.route.slice(1)}.json`
      }
    },
  },
})
