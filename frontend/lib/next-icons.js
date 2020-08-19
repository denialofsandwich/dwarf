const sharp = require('sharp');
const fs = require('fs');
const { join } = require('path')
const {createElement} = require('react')

function saveImages(cfg, baseImg) {
  const dir = join(cfg.dst, "icons");
  fs.rmdirSync(dir, { recursive: true })
  fs.mkdirSync(dir)
  cfg.sizes.map(v => {
    var fname = join(dir, `${v}x${v}.png`);
    baseImg.resize(v,v).toFile(fname, function(err) {})
  })
}

const iconConfigDefaults = {
  src: "public/icon.png",
  dst: "public/",
  sizes: [
    16, 32,
    72, 96, 128, 144, 152, 192, 384, 512,
  ],
}

const withIcons = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const {
        isServer,
        dev,
        buildId,
        defaultLoaders,
        config: {
          distDir
        }
      } = options

      if (!defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const {webpack, iconConfig} = nextConfig;
      imageConfig = {
        ...iconConfigDefaults,
        ...iconConfig,
      }

      if (!isServer) {
        if (/\.svg$/.test(imageConfig.src)) {
          const { createSVGWindow } = require('svgdom')
          const window = createSVGWindow()
          const SVG = require('svg.js')(window)
          const document = window.document

          sharp(imageConfig.src).metadata().then(function(metadata) {
            var base = SVG(document.documentElement)
            base.svg(fs.readFileSync(imageConfig.src).toString())
            const maxSize = imageConfig.sizes.sort((a,b) => a-b).slice().pop();
            base = base.transform({scale: maxSize/metadata.width })

            var imgDat = Buffer.from(base.svg(), 'utf8')
            saveImages(imageConfig, sharp(imgDat))
          })
        } else {
          saveImages(imageConfig, sharp(imageConfig.src))
        }

      }

      if (typeof webpack === 'function') {
        return webpack(config, options);
      }

      return config;
    }
  })
}

module.exports = withIcons
module.exports.withIcons = withIcons
module.exports.getManifestIcons = ({
  sizes=iconConfigDefaults.sizes,
  baseLocation="/",
}) => 
  sizes.map(v => {
    return {
      "src": join(baseLocation, "icons", `${v}x${v}.png`),
      "type": "image/png",
      "sizes": `${v}x${v}`,
      "purpose": "any maskable",
    }
  })

module.exports.Favicons = ({
  sizes=[16, 32, 192],
  baseLocation="/",
}) => sizes.map(v => createElement('link', {
        rel: "icon",
        type: "image/png",
        sizes: `${v}x${v}`,
        href: join(baseLocation, "icons", `${v}x${v}.png`),
      }
    )
  ).concat([
    createElement('link', {
        rel: "apple-touch-icon",
        href: join(baseLocation, "icons", `${192}x${192}.png`),
      }
    )
  ])