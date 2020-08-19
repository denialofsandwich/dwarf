const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const next = require('next')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

const staticFiles = [
  "/service-worker.js",
  "/manifest.json"
]

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // handle GET requests to static files
      if (staticFiles.some(x => pathname === x)) {
        app.serveStatic(req, res, join(__dirname, '.next/static', pathname))
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(3000, () => {
      console.log(`> Ready on http://localhost:${3000}`)
    })
  })
