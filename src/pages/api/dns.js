import fs from 'fs'

export default function handler(req, res) {
    const file = "public/posts/prueba.md"
    const content = fs.readFileSync(file, 'utf8')
    res.send(content)
  }
  