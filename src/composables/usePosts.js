import { marked } from 'marked'

const modules = import.meta.glob('../content/posts/*.md', { eager: true, as: 'raw' })

function parseFrontmatter(raw) {
  const data = {}
  let content = raw

  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (match) {
    content = match[2]
    const fm = match[1]
    let currentKey = null
    for (const line of fm.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue
      const kv = trimmed.match(/^(\w+):\s*(.*)$/)
      if (kv) {
        currentKey = kv[1]
        let val = kv[2]
        if (val.startsWith('[')) {
          try { val = JSON.parse(val.replace(/'/g, '"')) } catch { val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')) }
        } else if (val === 'true') val = true
        else if (val === 'false') val = false
        data[currentKey] = val
      } else if (currentKey && trimmed.startsWith('- ')) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = []
        data[currentKey].push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ''))
      }
    }
  }

  return { data, content }
}

const posts = {}

for (const [path, raw] of Object.entries(modules)) {
  try {
    const id = path.split('/').pop().replace('.md', '')
    const { data, content } = parseFrontmatter(raw)
    posts[id] = {
      ...data,
      content: marked.parse(content),
      recommended: data.recommended || null,
      toc: data.toc || null,
    }
  } catch (e) {
    console.error('[usePosts] failed to load:', path, e)
  }
}

export function getPost(id) {
  return posts[id] || null
}

export function getAllPosts() {
  return Object.entries(posts).map(([id, post]) => ({ id, ...post }))
}
