import Link from "next/link"
import { ArrowLeft, TrendingUp, Target, FileText, Sparkles } from "lucide-react"

const features = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "爆款指数评估",
    description: "从共鸣感、信任信号、行动驱动三维度量化分析，给出 0-100 分爆款指数",
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "情绪钩子识别",
    description: "自动识别内容中的情绪触发点和目标用户画像，帮助理解爆款背后的心理机制",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "内容结构拆解",
    description: "将爆款笔记拆解为可复用的结构模板：开头钩子、痛点共鸣、解决方案、行动号召",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "创作Brief生成",
    description: "一键生成可复用的创作Brief，包含选题方向、标题公式、切入角度、互动引导",
  },
]

const analysisModules = [
  { label: "爆款指数", desc: "综合评分" },
  { label: "情绪钩子", desc: "心理触发点" },
  { label: "目标用户", desc: "用户画像" },
  { label: "内容结构", desc: "可复用框架" },
  { label: "话题标签", desc: "流量密码" },
  { label: "变现路径", desc: "商业潜力" },
]

export default function AnalyzerPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>返回</span>
          </Link>
          <h1 className="text-lg font-semibold text-foreground">爆款笔记分析仪</h1>
          <div className="w-16" />
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            自用工具 Demo
          </span>
          <h2 className="mt-4 text-3xl font-bold text-foreground">爆款笔记分析仪</h2>
          <p className="mt-2 text-muted-foreground">用户洞察 · 内容种草力量化分析</p>
        </div>

        {/* Video Demo */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="border-b border-border bg-secondary/50 px-4 py-3">
            <h3 className="text-sm font-medium text-foreground">功能演示</h3>
          </div>
          <div className="relative aspect-video w-full bg-muted">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID_20260510200737182-wcZ2cuYRuEyHodcWMHxALrZ4noSzUg.MP4"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Analysis Modules */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">分析模块</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {analysisModules.map((module) => (
              <div
                key={module.label}
                className="rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-md"
              >
                <p className="font-medium text-foreground">{module.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">核心功能</h3>
          <div className="grid gap-6 sm:grid-cols-2">
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
            日常自用的内容分析工具，做成了可体验的 Demo。输入小红书笔记，AI 拆解爆款公式，量化分析种草力指标，生成可复用的创作 Brief。帮助理解<span className="font-medium text-primary">用户如何被内容影响消费决策</span>，以及什么样的内容触点更有效。核心价值在于将「爆款直觉」转化为可量化、可复用的方法论。
          </p>
        </div>
      </div>
    </main>
  )
}
