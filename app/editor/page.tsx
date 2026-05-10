"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle, Info, Loader2, Sparkles } from "lucide-react"

interface Issue {
  type: "error" | "warning" | "success"
  message: string
  suggestion?: string
}

interface AnalysisResult {
  score: number
  issues: Issue[]
  summary: string
}

export default function EditorPage() {
  const [content, setContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100 border-green-200"
    if (score >= 60) return "bg-yellow-100 border-yellow-200"
    return "bg-red-100 border-red-200"
  }

  const getTypeColor = (type: Issue["type"]) => {
    switch (type) {
      case "error": return "bg-red-100 text-red-700 border-red-200"
      case "warning": return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "success": return "bg-green-100 text-green-700 border-green-200"
    }
  }

  const getTypeIcon = (type: Issue["type"]) => {
    switch (type) {
      case "error": return <AlertTriangle className="h-4 w-4" />
      case "warning": return <Info className="h-4 w-4" />
      case "success": return <CheckCircle className="h-4 w-4" />
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
          <h1 className="text-lg font-semibold text-foreground">智能文案编辑器</h1>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Editor Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">输入文案内容</h2>
              <span className="text-xs text-muted-foreground">{content.length} 字</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在这里输入你的小红书笔记内容，AI 将实时检测违规风险并评估种草力..."
              className="h-80 w-full resize-none rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleAnalyze}
              disabled={!content.trim() || isAnalyzing}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI 分析中...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  开始分析
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-foreground">分析结果</h2>

            {!result && !isAnalyzing && (
              <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-border bg-card">
                <p className="text-sm text-muted-foreground">输入内容后点击分析，查看 AI 评估结果</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex h-80 items-center justify-center rounded-xl border border-border bg-card">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">AI 正在分析内容...</p>
                </div>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="flex flex-col gap-4">
                {/* Score */}
                <div className={`rounded-xl border p-6 text-center ${getScoreBg(result.score)}`}>
                  <p className="text-sm text-muted-foreground">种草力评分</p>
                  <p className={`mt-2 text-5xl font-bold ${getScoreColor(result.score)}`}>
                    {result.score}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
                </div>

                {/* Issues */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-medium text-foreground">检测结果</h3>
                  {result.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 rounded-lg border p-4 ${getTypeColor(issue.type)}`}
                    >
                      <div className="mt-0.5">{getTypeIcon(issue.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{issue.message}</p>
                        {issue.suggestion && (
                          <p className="mt-1 text-xs opacity-80">建议：{issue.suggestion}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
