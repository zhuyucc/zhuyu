import { marked } from 'marked'

const modules = import.meta.glob('../content/chatter/*.md', { eager: true, as: 'raw' })

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

const chatterEntries = {}

for (const [path, raw] of Object.entries(modules)) {
  try {
    const id = path.split('/').pop().replace('.md', '')
    const { data, content } = parseFrontmatter(raw)
    chatterEntries[id] = {
      ...data,
      content: marked.parse(content),
      recommended: data.recommended || null,
      toc: data.toc || null,
    }
  } catch (e) {
    console.error('[useChatter] failed to load:', path, e)
  }
}

export function getChatter(id) {
  return chatterEntries[id] || null
}

export function getAllChatter() {
  return Object.entries(chatterEntries).map(([id, entry]) => ({ id, ...entry }))
}
