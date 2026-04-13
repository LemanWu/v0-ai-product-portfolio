import { ProjectCard } from "@/components/project-card"
import { PenLine, TrendingUp, ShieldAlert, Music } from "lucide-react"

const projects = [
  {
    title: "智能文案编辑器",
    tags: ["内容生态", "违规检测"],
    description: "实时检测违规风险，AI评分种草力",
    icon: <PenLine className="h-5 w-5" />,
  },
  {
    title: "爆款笔记分析仪",
    tags: ["用户洞察", "种草经济"],
    description: "拆解爆款公式，生成可复用创作Brief",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "内容风险巡查Agent",
    tags: ["AI Agent", "平台治理"],
    description: "自动扫描违规内容，生成结构化风险报告",
    icon: <ShieldAlert className="h-5 w-5" />,
  },
  {
    title: "KTV智能运营系统",
    tags: ["商业落地", "真实场景"],
    description: "Booths Karaoke真实部署的AI预订管理系统",
    icon: <Music className="h-5 w-5" />,
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

      {/* Projects Grid */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tags={project.tags}
              description={project.description}
              icon={project.icon}
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
