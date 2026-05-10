"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, Sparkles, TrendingUp, Users, Heart, Target, Copy, Check } from "lucide-react"

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

export default function AnalyzerPage() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!url.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-viral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

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
      case "high": return "bg-red-100 text-red-700 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low": return "bg-green-100 text-green-700 border-green-200"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-lg font-semibold text-foreground">爆款笔记分析仪</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Input Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="输入小红书笔记链接或直接粘贴笔记内容..."
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || isAnalyzing}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                拆解爆款
              </>
            )}
          </button>
        </div>

        {/* Empty State */}
        {!result && !isAnalyzing && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-card">
            <div className="text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">输入笔记内容，AI 将拆解爆款公式</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">AI 正在拆解爆款公式...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="flex flex-col gap-6">
            {/* Top Metrics */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{result.viralScore}</p>
                  <p className="text-xs text-muted-foreground">爆款指数</p>
                </div>
              </div>
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-lg">
                <Heart className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{result.metrics.resonance}%</p>
                  <p className="text-xs text-muted-foreground">共鸣度</p>
                </div>
              </div>
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-lg">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{result.metrics.trust}%</p>
                  <p className="text-xs text-muted-foreground">信任度</p>
                </div>
              </div>
              <div className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-lg">
                <Target className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-3xl font-bold text-foreground">{result.metrics.action}%</p>
                  <p className="text-xs text-muted-foreground">行动力</p>
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                {/* Emotion Hook */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-medium text-foreground">情绪钩子</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{result.emotionHook}</p>
                </div>

                {/* Target User */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-medium text-foreground">目标用户</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{result.targetUser}</p>
                </div>

                {/* Content Structure */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-medium text-foreground">内容结构</h3>
                  <div className="flex flex-col gap-2">
                    {result.structure.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {/* Tags */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-medium text-foreground">爆款标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getTagColor(tag.level)}`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Monetization */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-3 text-sm font-medium text-foreground">变现方向</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.monetization.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Brief */}
                <div className="relative rounded-xl border border-primary bg-primary/5 p-6">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
