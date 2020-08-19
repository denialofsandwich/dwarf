const { withPlugins } = require('next-compose-plugins');
const withOffline = require('next-offline')
const withManifest = require('next-manifest');
const {withIcons, getManifestIcons} = require('./lib/next-icons');

const iconConfig = {
  src: "public/gnome.png",
};

const manifest = {
  output: '.next/static', // DONT CHANGE

  name: "Django with a React Frontend",
  short_name: "DWARF",
  description: "This is the default description of DWARF.",
  orientation: "any",
  icons: getManifestIcons({}),
  start_url: '/',
  display: 'standalone',
  theme_color: "#00c853",
  background_color: "#33333d",
  dir: 'ltr',
  lang: 'en',
}

const workboxOpts = {
  swDest: 'static/service-worker.js', // DONT CHANGE

  // Define runtime caching rules.
  runtimeCaching: [
    {
      urlPattern: /^https?:\/\/[^\/]*\/(?!_api).*/,
      handler: 'CacheFirst'
    },
    {
      urlPattern: /^https?:\/\/[^\/]*\/(?:_api).*/,
      handler: 'NetworkFirst',
      options: {
        cacheableResponse: {
          statuses: [0, 200],
        }
      },
    }
  ]
}

const nextConfig = {
  env: {
    appName: manifest.short_name,
    description: manifest.description,
    themeColor: manifest.theme_color,
  },
}

module.exports = withPlugins([
  [withIcons, {iconConfig}],
  [withManifest, {manifest}],
  [withOffline, {workboxOpts}],
], nextConfig);