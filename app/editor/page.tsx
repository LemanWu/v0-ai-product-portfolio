"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkle, FileText, Utensils, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Issue {
  type: "error" | "warning" | "success"
  title: string
  quote: string
  suggestion: string
}

interface AnalysisResult {
  score: number
  scoreDesc: string
  issues: Issue[]
}

const examples = [
  { label: "护肤推荐", icon: <Sparkle className="h-4 w-4" />, title: "换季必囤！这款精华真的绝了", body: "姐妹们！我真的要疯狂安利这款精华！用了一周皮肤状态直接起飞，毛孔细了、痘痘少了，关键是价格还很美丽～绝对是学生党的福音！谁用谁知道，不买后悔一辈子！" },
  { label: "减肥餐测评", icon: <Utensils className="h-4 w-4" />, title: "7天瘦10斤！我的减脂餐食谱", body: "宝子们我真的找到了减肥的终极秘诀！按照这个食谱吃一周直接瘦10斤，不用运动不用节食，躺着就能瘦！配方是我花大价钱从营养师那买的，今天免费分享给你们！" },
  { label: "素人变美", icon: <User className="h-4 w-4" />, title: "普通人逆袭！我的变美日记", body: "从小就被说丑的我，终于逆袭成功了！分享我的变美秘诀：每天坚持护肤、学会化妆、注意穿搭。这些方法任何人都能做到，关键是要坚持，相信自己一定可以变美！" },
]

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleExample = (example: typeof examples[0]) => {
    setTitle(example.title)
    setBody(example.body)
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!title.trim() && !body.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeLabel = (type: Issue["type"]) => {
    switch (type) {
      case "error": return "违规风险"
      case "warning": return "优化建议"
      case "success": return "种草技巧"
    }
  }

  const getTypeColor = (type: Issue["type"]) => {
    switch (type) {
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "success": return "bg-green-500/20 text-green-400 border-green-500/30"
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
          <h1 className="text-lg font-semibold text-foreground">智能文案编辑器</h1>
          <div className="w-16" />
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Editor */}
          <div className="flex flex-col gap-6">
            {/* Example buttons */}
            <div className="flex flex-wrap gap-3">
              {examples.map((example) => (
                <button
                  key={example.label}
                  onClick={() => handleExample(example)}
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {example.icon}
                  {example.label}
                </button>
              ))}
            </div>

            {/* Title input */}
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 20))}
                placeholder="写下标题，最多20字"
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            {/* Body textarea */}
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="写下你的笔记正文…"
                rows={12}
                className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {body.length} 字
              </div>
            </div>

            {/* Analyze button */}
            <Button
              onClick={handleAnalyze}
              disabled={loading || (!title.trim() && !body.trim())}
              className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "分析中..." : "AI 检测"}
            </Button>
          </div>

          {/* Right: Report */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-6 text-lg font-semibold text-foreground">检测报告</h2>

            {result ? (
              <div className="flex flex-col gap-6">
                {/* Score ring */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <svg className="h-full w-full -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-secondary"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(result.score / 100) * 352} 352`}
                        className="text-primary"
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold text-foreground">{result.score}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.scoreDesc}</p>
                </div>

                {/* Issues */}
                <div className="flex flex-col gap-4">
                  {result.issues.map((issue, idx) => (
                    <div key={idx} className="rounded-lg border border-border bg-secondary/30 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className={cn("rounded-full border px-2 py-0.5 text-xs", getTypeColor(issue.type))}>
                          {getTypeLabel(issue.type)}
                        </span>
                        <span className="font-medium text-foreground">{issue.title}</span>
                      </div>
                      <p className="mb-2 rounded bg-secondary px-3 py-2 text-sm text-muted-foreground">
                        &ldquo;{issue.quote}&rdquo;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary">建议：</span>{issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center gap-4 text-muted-foreground">
                <FileText className="h-12 w-12 opacity-50" />
                <p>输入文案后点击AI检测</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
