import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileInput, Brain, FileOutput, Users } from "lucide-react"

const architectureSteps = [
  {
    icon: <FileInput className="h-5 w-5" />,
    title: "输入层",
    description: "笔记文本/批量导入",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "分析层",
    description: "Claude API 四级风险分类",
  },
  {
    icon: <FileOutput className="h-5 w-5" />,
    title: "输出层",
    description: "HTML报告自动生成",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "应用层",
    description: "运营审核决策",
  },
]

const screenshots = [
  {
    title: "事前风险评估",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%BF%90%E8%A1%8C%E6%88%AA%E5%B1%8F-%E4%BA%8B%E5%89%8D%E9%A3%8E%E9%99%A9%E8%AF%84%E4%BC%B0-4jZEjcxcy8ffEgwNnNsR7cVoZsdlal.png",
  },
  {
    title: "事中自动巡查+人工审查",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%BF%90%E8%A1%8C%E6%88%AA%E5%B1%8F-%E4%BA%8B%E4%B8%AD%EF%BC%88%E8%87%AA%E5%8A%A8%E5%B7%A1%E6%9F%A5%2B%E4%BA%BA%E5%B7%A5%E5%AE%A1%E6%9F%A5%EF%BC%89-Ykc2jIHvkkLLKn6YK5BdV6VZkzPJg6.png",
  },
  {
    title: "事后反馈",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%BF%90%E8%A1%8C%E6%88%AA%E5%B1%8F-%E4%BA%8B%E5%90%8E%E5%8F%8D%E9%A6%88-CgD2GE47j4mzKZEuG7gOkLEza3KMbG.png",
  },
  {
    title: "事后反馈及总结",
    path: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%BF%90%E8%A1%8C%E6%88%AA%E5%B1%8F-%E4%BA%8B%E5%90%8E%E5%8F%8D%E9%A6%88%E5%8F%8A%E6%80%BB%E7%BB%93-vXrkmQwVDfKaAjkfwKQS6SrfmvEcmo.png",
  },
]

export default function AgentPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            内容风险巡查 Agent
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Project Description */}
          <section className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <p className="leading-relaxed text-foreground">
              基于 Claude Code 构建的自动化内容审核系统，可批量扫描小红书笔记，自动识别违规风险并生成结构化 HTML 报告
            </p>
          </section>

          {/* Technical Architecture */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">技术架构</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {architectureSteps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {step.icon}
                    </div>
                    <h3 className="mb-1 text-sm font-medium text-foreground">{step.title}</h3>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < architectureSteps.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 translate-x-full bg-primary/50 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Screenshots */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">真实运行截图</h2>
            <div className="flex flex-col gap-8">
              {screenshots.map((screenshot) => (
                <div key={screenshot.title} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="border-b border-border bg-secondary px-4 py-3">
                    <h3 className="text-sm font-medium text-foreground">{screenshot.title}</h3>
                  </div>
                  <div className="relative aspect-video w-full bg-muted">
                    <Image
                      src={screenshot.path}
                      alt={screenshot.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="text-sm text-primary">
            以上为 Claude Code 真实运行输出，非模拟数据
          </p>
        </div>
      </footer>
    </main>
  )
}
