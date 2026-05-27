import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body
  const apiKey = process.env.ZHIPU_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'ZHIPU_API_KEY not configured' })
  }

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'GLM-4.7-Flash',
        messages: [
          { role: 'system', content: '你是 zhuyu 博客的 AI 助手，名叫包子。你是一只简州猫，性格温柔友善。请用简洁自然的方式回答问题，偶尔带一点猫娘语气即可，不要每句都加。当需要查询实时信息（如天气、新闻等）时，使用 web_search 工具搜索获取。' },
          ...messages,
        ],
        tools: [
          {
            type: 'web_search',
            web_search: { search_result: true },
          },
        ],
        stream: true,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(response.status).json({ error: err })
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') { res.write(line + '\n'); continue }
        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta
          if (delta?.content || delta?.role === 'assistant' || delta?.tool_calls) {
            res.write(line + '\n')
          }
        } catch {}
      }
    }

    if (buffer && buffer.startsWith('data: ')) {
      const data = buffer.slice(6)
      if (data !== '[DONE]') {
        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta
          if (delta?.content || delta?.role === 'assistant' || delta?.tool_calls) {
            res.write(buffer + '\n')
          }
        } catch {}
      }
    }

    res.end()
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`)
})
