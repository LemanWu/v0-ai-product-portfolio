import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

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
            content: `你是一个小红书爆款内容分析专家。请深度分析以下笔记内容，拆解其爆款公式。

内容：
${content}

请按以下JSON格式返回（不要包含markdown代码块标记）：
{
  "viralScore": 0-100的整数（爆款指数）,
  "emotionHook": "情绪钩子描述（一句话）",
  "targetUser": "目标用户画像（一句话）",
  "metrics": {
    "resonance": 0-100（共鸣感得分）,
    "trust": 0-100（信任信号得分）,
    "action": 0-100（行动驱动得分）
  },
  "structure": [
    "步骤1：开篇钩子描述",
    "步骤2：...",
    "步骤3：...",
    "步骤4：...",
    "步骤5：收尾号召"
  ],
  "tags": [
    { "label": "标签名", "level": "high" | "medium" | "low" }
  ],
  "monetization": [
    "变现路径1",
    "变现路径2",
    "变现路径3"
  ],
  "brief": {
    "topic": "选题方向（一句话描述适合的内容方向）",
    "hook": "标题公式（可复用的爆款标题模板）",
    "angle": "切入角度（独特的内容视角）",
    "cta": "互动引导（结尾号召行动的话术）",
    "avoid": "避坑指南（需要避免的常见错误）"
  }
}

level说明：
- high: 高热度话题（红色）
- medium: 中等热度（黄色）
- low: 长尾话题（绿色）

请返回5-8个话题标签。直接返回JSON，不要有其他文字。`,
          },
        ],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || "{}"
    
    try {
      const result = JSON.parse(text)
      return NextResponse.json(result)
    } catch {
      return NextResponse.json({
        viralScore: 75,
        emotionHook: "引发好奇与共鸣",
        targetUser: "追求品质生活的年轻女性",
        metrics: { resonance: 80, trust: 70, action: 75 },
        structure: [
          "开篇：用痛点引发共鸣",
          "铺垫：建立个人经历可信度",
          "核心：分享干货内容",
          "证据：展示效果/数据",
          "收尾：引导互动与收藏",
        ],
        tags: [
          { label: "好物分享", level: "high" },
          { label: "生活方式", level: "medium" },
          { label: "干货", level: "low" },
        ],
        monetization: ["品牌合作", "好物推荐", "知识付费"],
        brief: {
          topic: "好物分享类内容，聚焦个人真实体验",
          hook: "【数字】+ 痛点 + 解决方案，如「3个月回购5次的神器」",
          angle: "以「踩坑后的真实分享」建立信任感",
          cta: "「你们有没有同款经历？评论区聊聊」引导互动",
          avoid: "避免硬广感，减少「强烈推荐」等直接推销词汇",
        },
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
