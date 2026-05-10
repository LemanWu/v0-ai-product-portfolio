import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react"

const features = [
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "违规风险检测",
    description: "实时识别夸大宣传、虚假承诺、敏感词汇等违规内容，避免笔记被限流或下架",
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "AI 种草力评分",
    description: "从共鸣感、信任度、行动力三个维度量化内容质量，给出 0-100 分综合评分",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "优化建议生成",
    description: "针对每处问题给出具体修改建议，帮助快速提升内容质量",
  },
]

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>返回</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">智能文案编辑器</h1>
          <div className="w-16" />
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            自用工具 Demo
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">智能文案编辑器</h2>
          <p className="mt-2 text-muted-foreground">实时违规风险检测 · AI 种草力评分</p>
        </div>

        {/* Video Demo */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="border-b border-border bg-secondary/50 px-4 py-3">
            <h3 className="text-sm font-medium text-foreground">功能演示</h3>
          </div>
          <div className="relative aspect-video w-full bg-muted">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID_20260510200415151-Pe955JZlyotgb9cszFCL9It0ejBDz4.MP4"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">核心功能</h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h4 className="mb-2 font-medium text-foreground">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h3 className="mb-4 font-medium text-foreground">产品思路</h3>
          <p className="leading-relaxed text-muted-foreground">
            日常写内容时用的辅助工具，做成了可体验的 Demo。写作时实时检测违规风险、AI 评分种草力，帮助快速判断内容质量。体现了 <span className="font-medium text-primary">AI 在内容生产环节实时干预</span>的产品思路：不是等内容发布后再审核，而是在创作过程中就给予反馈，降低违规风险的同时提升内容质量。
          </p>
        </div>
      </div>
    </main>
  )
}
