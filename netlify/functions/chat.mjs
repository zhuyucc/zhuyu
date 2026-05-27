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
          { role: 'system', content: '你是 zhuyu 博客的 AI 助手，名叫欢欢。你是一只可爱的暹罗猫，性格活泼温柔。请用可爱简短的方式回答问题。' },
          ...messages,
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

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      result += decoder.decode(value)
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
