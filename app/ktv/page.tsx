import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Zap, Clock, Star, CalendarCheck } from "lucide-react"

const metrics = [
  {
    icon: <Zap className="h-5 w-5" />,
    label: "预订处理效率",
    value: "+60%",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "人工客服时间",
    value: "-40%",
  },
  {
    icon: <Star className="h-5 w-5" />,
    label: "客户满意度",
    value: "4.8/5",
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    label: "月均处理预订",
    value: "200+",
  },
]

const screenshots = [
  {
    title: "预订管理系统界面一",
    path: "/screenshots/Room manager1.PNG",
  },
  {
    title: "预订管理系统界面二",
    path: "/screenshots/Room manager2.PNG",
  },
]

export default function KTVPage() {
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
            KTV 智能运营系统
          </h1>
          <p className="mt-2 text-muted-foreground">
            Booths Karaoke · 澳大利亚墨尔本 · 真实部署运行
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Project Background */}
          <section className="rounded-xl border border-border bg-[#1A1A1A] p-6">
            <p className="leading-relaxed text-foreground/90">
              作为 Booths Karaoke 的运营者，我将 AI 引入实际业务——从预订管理到客户反馈分析，真实解决了人工排班效率低、客户需求分析缺失的问题
            </p>
          </section>

          {/* Key Metrics */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">关键数据</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {metric.icon}
                  </div>
                  <span className="mb-1 text-2xl font-bold text-primary">{metric.value}</span>
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshots */}
          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">真实系统截图</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {screenshots.map((screenshot) => (
                <div key={screenshot.title} className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="border-b border-border bg-[#1A1A1A] px-4 py-3">
                    <h3 className="text-sm font-medium text-foreground">{screenshot.title}</h3>
                  </div>
                  <div className="relative aspect-video w-full bg-[#0D0D0D]">
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
            以上为 Booths Karaoke 真实运行系统截图
          </p>
        </div>
      </footer>
    </main>
  )
}
