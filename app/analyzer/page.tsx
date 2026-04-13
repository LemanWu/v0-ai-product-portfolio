"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkle, Utensils, Dumbbell, FileText, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Brief {
  topic: string
  hook: string
  angle: string
  cta: string
  avoid: string
}

interface AnalysisResult {
  viralScore: number
  emotionHook: string
  targetUser: string
  metrics: {
    resonance: number
    trust: number
    action: number
  }
  structure: string[]
  tags: { label: string; level: "high" | "medium" | "low" }[]
  monetization: string[]
  brief: Brief | string
}

const examples = [
  { 
    category: "美妆", 
    icon: <Sparkle className="h-5 w-5" />,
    title: "黄皮显白口红合集",
    content: "姐妹们！作为资深黄皮，踩过无数雷终于总结出这份显白口红清单！从日常到约会全覆盖，每一支都是我回购过3次以上的真爱！第一支是...",
  },
  { 
    category: "美食", 
    icon: <Utensils className="h-5 w-5" />,
    title: "一人食晚餐灵感",
    content: "下班后只想躺平？这10道快手晚餐拯救你！15分钟搞定，好吃不胖还省钱～作为独居5年的社畜，我的厨房只做简单又满足的料理...",
  },
  { 
    category: "健身", 
    icon: <Dumbbell className="h-5 w-5" />,
    title: "帕梅拉一周计划",
    content: "跟着帕梅拉跳了3个月，腰围真的细了！分享我的一周训练安排，周一练腹、周二臀腿、周三手臂...配合这个食谱效果翻倍！",
  },
]

export default function AnalyzerPage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleExample = async (example: typeof examples[0]) => {
    setInput(`${example.title}\n\n${example.content}`)
    await analyze(`${example.title}\n\n${example.content}`)
  }

  const analyze = async (text: string) => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/analyze-viral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = () => analyze(input)

  const handleCopy = () => {
    if (result?.brief) {
      let textToCopy: string
      if (typeof result.brief === "object") {
        textToCopy = `【创作Brief】\n\n选题方向：${result.brief.topic}\n\n标题公式：${result.brief.hook}\n\n切入角度：${result.brief.angle}\n\n互动引导：${result.brief.cta}\n\n避坑指南：${result.brief.avoid}`
      } else {
        textToCopy = result.brief
      }
      navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getTagColor = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>返回</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">爆款笔记分析仪</h1>
          <div className="w-16" />
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Input */}
          <div className="flex flex-col gap-6">
            {/* Example cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {examples.map((example) => (
                <button
                  key={example.category}
                  onClick={() => handleExample(example)}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-[0_0_20px_rgba(255,36,66,0.1)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {example.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{example.category}</span>
                  <span className="text-xs text-muted-foreground">{example.title}</span>
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="flex flex-col gap-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="粘贴爆款笔记内容进行分析..."
                rows={10}
                className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Button
                onClick={handleAnalyze}
                disabled={loading || !input.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "分析中..." : "AI 深度分析"}
              </Button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="flex flex-col gap-6">
            {result ? (
              <>
                {/* Score and hooks */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Viral score */}
                  <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
                    <span className="text-sm text-muted-foreground">爆款指数</span>
                    <div className="relative flex h-24 w-24 items-center justify-center">
                      <svg className="h-full w-full -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" />
                        <circle
                          cx="48" cy="48" r="40"
                          fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={`${(result.viralScore / 100) * 251} 251`}
                          className="text-primary"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-foreground">{result.viralScore}</span>
                    </div>
                  </div>

                  {/* Emotion & target */}
                  <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
                    <div>
                      <span className="text-xs text-muted-foreground">情绪钩子</span>
                      <p className="mt-1 text-sm font-medium text-foreground">{result.emotionHook}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">目标用户</span>
                      <p className="mt-1 text-sm font-medium text-foreground">{result.targetUser}</p>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex flex-col gap-4">
                    {[
                      { label: "共鸣感", value: result.metrics.resonance },
                      { label: "信任信号", value: result.metrics.trust },
                      { label: "行动驱动", value: result.metrics.action },
                    ].map((metric) => (
                      <div key={metric.label} className="flex items-center gap-4">
                        <span className="w-20 text-sm text-muted-foreground">{metric.label}</span>
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-8 text-right text-sm font-medium text-foreground">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Structure */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-sm font-medium text-foreground">爆款内容结构</h3>
                  <div className="flex flex-col gap-2">
                    {result.structure.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-sm font-medium text-foreground">话题标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={cn("rounded-full border px-3 py-1 text-xs", getTagColor(tag.level))}
                      >
                        #{tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Monetization */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-sm font-medium text-foreground">商业变现路径</h3>
                  <ul className="flex flex-col gap-2">
                    {result.monetization.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brief */}
                <div className="relative rounded-xl border border-[#FF2442] bg-[#3D0A0A] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">创作Brief（可复用）</h3>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "已复制" : "复制"}
                    </button>
                  </div>
                  {typeof result.brief === "object" && result.brief ? (
                    <div className="flex flex-col gap-4">
                      {[
                        { label: "选题方向", value: result.brief.topic },
                        { label: "标题公式", value: result.brief.hook },
                        { label: "切入角度", value: result.brief.angle },
                        { label: "互动引导", value: result.brief.cta },
                        { label: "避坑指南", value: result.brief.avoid },
                      ].map((item) => (
                        <div key={item.label}>
                          <span className="text-xs font-medium text-primary">{item.label}</span>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                            {item.value || "暂无数据"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {typeof result.brief === "string" ? result.brief : "分析暂时不可用，请稍后重试"}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card text-muted-foreground">
                <FileText className="h-12 w-12 opacity-50" />
                <p>选择示例或输入内容进行分析</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
