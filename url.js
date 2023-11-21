import fetch from 'node-fetch'
import express from 'express'

const app = express()

const parseTitle = (body) => {
  let match = body.match(/<title>([^<]*)<\/title>/)
  if (!match || typeof match[1] !== 'string') throw new Error('Unable to parse the title tag')
  return match[1]
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.get('/', (req, res) => {
  const { url } = req.query
  if (!url) return res.status(400).end('missing url query parameter')

  fetch(url)
    .then((res) => res.text())
    .then((body) => parseTitle(body))
    .then((title) => res.send(title))
    .catch((e) => res.status(500).end(e.message))
})

app.listen(3000)
