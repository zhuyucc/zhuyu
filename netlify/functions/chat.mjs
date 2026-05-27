export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { messages } = JSON.parse(event.body)
  const apiKey = process.env.ZHIPU_API_KEY

  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'ZHIPU_API_KEY not configured' }) }
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
      return { statusCode: response.status, body: JSON.stringify({ error: err }) }
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let result = ''
    let buf = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buf += decoder.decode(value, { stream: true })
      const lines = buf.split('\n')
      buf = lines.pop() || ''

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]') { result += line + '\n'; continue }
        try {
          const parsed = JSON.parse(data)
          const delta = parsed.choices?.[0]?.delta
          if (delta?.content || delta?.role === 'assistant' || delta?.tool_calls) {
            result += line + '\n'
          }
        } catch {}
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/event-stream' },
      body: result,
    }
  } catch (err) {
    console.error('Chat error:', err)
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
