import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { title, body } = await request.json()

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `你是一个小红书内容合规与种草力分析专家。请分析以下笔记内容，返回JSON格式的分析结果。

标题：${title}
正文：${body}

请按以下JSON格式返回（不要包含markdown代码块标记）：
{
  "score": 0-100的整数评分（综合考虑合规性和种草力）,
  "scoreDesc": "一句话评价",
  "issues": [
    {
      "type": "error" | "warning" | "success",
      "title": "问题标题",
      "quote": "原文引用",
      "suggestion": "优化建议"
    }
  ]
}

type说明：
- error: 违规风险（如夸大宣传、虚假承诺、绝对化用语等）
- warning: 优化建议（可以改进的地方）
- success: 种草技巧（文案中的亮点）

请返回3-5个issues，确保包含不同类型。直接返回JSON，不要有其他文字。`,
          },
        ],
      }),
    })

    const data = await response.json()
    const content = data.content?.[0]?.text || "{}"
    
    try {
      const result = JSON.parse(content)
      return NextResponse.json(result)
    } catch {
      return NextResponse.json({
        score: 60,
        scoreDesc: "内容基本合规，但有优化空间",
        issues: [
          {
            type: "warning",
            title: "分析暂时不可用",
            quote: "系统响应",
            suggestion: "请稍后重试",
          },
        ],
      })
    }
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    )
  }
}
