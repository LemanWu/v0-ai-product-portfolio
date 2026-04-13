import { ProjectCard } from "@/components/project-card"
import { PenLine, TrendingUp, ShieldAlert, Music } from "lucide-react"

const projects = [
  {
    title: "智能文案编辑器",
    tags: ["内容生态", "违规检测"],
    description: "实时检测违规风险，AI评分种草力",
    icon: <PenLine className="h-5 w-5" />,
    href: "/editor",
  },
  {
    title: "爆款笔记分析仪",
    tags: ["用户洞察", "种草经济"],
    description: "拆解爆款公式，生成可复用创作Brief",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/analyzer",
  },
  {
    title: "内容风险巡查Agent",
    tags: ["AI Agent", "平台治理"],
    description: "自动扫描违规内容，生成结构化风险报告",
    icon: <ShieldAlert className="h-5 w-5" />,
    href: "/agent",
  },
  {
    title: "KTV智能运营系统",
    tags: ["商业落地", "真实场景"],
    description: "Booths Karaoke真实部署的AI预订管理系统",
    icon: <Music className="h-5 w-5" />,
    href: "/ktv",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Leman · AI Product Portfolio
          </h1>
          <p className="text-lg text-muted-foreground">
            AI 产品落地 · 真实场景 · 可交互 Demo
          </p>
        </div>
      </header>

      {/* Personal Intro */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-8">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-foreground">伍乐漫</h2>
            <p className="mt-2 text-primary">
              墨尔本大学数学与统计学硕士 · AI产品落地实践者
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              具备统计建模与AI双重背景，在内容平台治理、商业运营两个真实场景完成AI系统从0到1落地。以下项目均为真实部署或可交互Demo。
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tags={project.tags}
              description={project.description}
              icon={project.icon}
              href={project.href}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            以上项目均为真实落地应用，非模拟演示
          </p>
        </div>
      </footer>
    </main>
  )
}
