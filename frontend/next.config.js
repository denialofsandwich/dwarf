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
      urlPattern: /^https?:\/\/[^\/]*\/(?!_).*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-cache',
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?:\/\/[^\/]*\/(?:_django_static).*/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-cache',
        expiration: {
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?:\/\/[^\/]*\/(?:_api).*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
        expiration: {
          maxAgeSeconds: 3 * 24 * 60 * 60,
        },
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
  [withOffline, {workboxOpts, dontAutoRegisterSw: true}],
], nextConfig);