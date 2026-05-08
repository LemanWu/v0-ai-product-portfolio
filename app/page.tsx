import Link from "next/link"
import { Building2, Shield, BarChart3, PenLine, CheckCircle, Wrench, TrendingUp, BookOpen } from "lucide-react"

const projects = [
  {
    title: "KTV 智能预订与运营系统",
    subtitle: "Booths Karaoke · 澳大利亚墨尔本 · 在职店经理",
    description:
      "在 Booths Karaoke 担任店经理期间，自主设计并部署了一套 AI 运营工具：打通房间管理系统与 Square 预订平台，自动聚合每日 booking 数据，AI 智能排列房间时间线、最优化房间利用率。早班员工此前每天需要手动对照 Square 后台整理笔记，现在一键生成当日预定信息，系统实时告知前台 walk-in 客人最快可用的房间和等待时间。目前正在扩展库存模块，计划输出销售周报，自动识别销量最好的产品品类。",
    status: "真实部署运行",
    statusType: "deployed",
    icon: <Building2 className="h-5 w-5" />,
    metrics: [
      { label: "大幅减少", desc: "早班手工整理时间" },
      { label: "实时查询", desc: "Walk-in 候室时间" },
      { label: "进行中", desc: "库存 & 销售周报扩展" },
    ],
    tags: ["AI 工作流设计", "系统集成", "运营提效", "Square API", "自动化排班", "数据聚合"],
    href: "/ktv",
  },
  {
    title: "内容风险巡查 Agent",
    subtitle: "小红书内容治理 · Claude API + 多 Agent 架构",
    description:
      "基于 Claude API 构建的自动化内容审核系统。批量扫描小红书笔记，四级风险分类，自动生成结构化 HTML 风险报告。设计了「事前风险评估 → 事中自动巡查 + 人工审查 → 事后反馈总结」完整闭环，核心是机器规则化校验 + 人工兜底的两级质量控制机制。",
    status: "真实运行输出",
    statusType: "deployed",
    icon: <Shield className="h-5 w-5" />,
    tags: ["多 Agent 架构", "评估体系设计", "Badcase 归因", "Prompt 工程", "Claude API", "自动化报告生成"],
    href: "/agent",
  },
  {
    title: "爆款笔记分析仪",
    subtitle: "用户洞察 · 内容种草力量化分析",
    description:
      "日常自用的内容分析工具，做成了可体验的 Demo。输入小红书笔记，AI 拆解爆款公式，量化分析种草力指标，生成可复用的创作 Brief。帮助理解用户如何被内容影响消费决策，以及什么样的内容触点更有效。",
    status: "自用工具 Demo",
    statusType: "demo",
    icon: <BarChart3 className="h-5 w-5" />,
    tags: ["用户行为洞察", "内容转化分析", "LLM 应用", "Prompt 设计"],
    href: "/analyzer",
  },
  {
    title: "智能文案编辑器",
    subtitle: "实时违规风险检测 · AI 种草力评分",
    description:
      "日常写内容时用的辅助工具，做成了可体验的 Demo。写作时实时检测违规风险、AI 评分种草力，帮助快速判断内容质量。体现了 AI 在内容生产环节实时干预的产品思路。",
    status: "自用工具 Demo",
    statusType: "demo",
    icon: <PenLine className="h-5 w-5" />,
    tags: ["内容质量评估", "实时 AI 打分", "LLM 应用"],
    href: "/editor",
  },
  {
    title: "AI 知识库体系",
    subtitle: "Obsidian + Claude Code · 个人知识管理系统",
    description:
      "基于 Obsidian + Claude Code 搭建的 AI 驱动知识库系统。实现「说话即记录」的日记复盘流程，通过 Skills 自动化完成内容整理、素材归档、选题生成。核心理念：把 AI 从一次性工具变成终身助手，让每次创作都在已有积累上叠加。包含完整的文件夹体系设计、CLAUDE.md 配置、方法论沉淀流程。",
    status: "搭建中",
    statusType: "demo",
    icon: <BookOpen className="h-5 w-5" />,
    tags: ["知识管理", "AI 工作流", "Obsidian", "Claude Code", "自动化", "方法论沉淀"],
    href: "/knowledge",
  },
  {
    title: "瑞幸4月运营分析",
    subtitle: "用户运营 · 知识图谱可视化",
    description:
      "对瑞幸咖啡4月公众号活动的深度拆解。分析其「向上争夺精品用户、向外渗透非咖啡圈、向深绑定存量用户」三大策略，以及产品分层、渠道分层、用户分层的精细化运营逻辑。用知识图谱方式可视化呈现各活动之间的关联。",
    status: "运营分析",
    statusType: "demo",
    icon: <TrendingUp className="h-5 w-5" />,
    tags: ["用户运营分析", "知识图谱", "策略拆解", "数据洞察"],
    href: "/luckin",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="mb-4 text-sm font-medium tracking-widest uppercase opacity-80">
            AI PRODUCT · PORTFOLIO · 2026届
          </p>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">伍乐漫</h1>
          <p className="mb-6 text-lg opacity-90">
            墨尔本大学 数学与统计学硕士 · AI 产品落地实践者
          </p>
          <div className="mb-8 flex flex-wrap gap-3">
            {["AI 产品设计", "LLM · RAG · Agent", "数据分析 & 建模", "用户运营（学习中）"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="leading-relaxed text-white/90">
              具备<span className="font-semibold text-white">统计建模 + AI 产品双重背景</span>
              ，在真实商业场景和内容平台完成 AI 系统从 0 到 1 落地。对 AI 如何在 C
              端运营场景中提效和个性化有系统性思考，正在通过学习和实践深化用户增长方法论。
            </p>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium tracking-widest text-primary uppercase">
            PROJECTS
          </p>
          <h2 className="text-3xl font-bold text-foreground">六个 AI 项目</h2>
          <p className="mt-2 text-muted-foreground">真实部署 · 可交互 Demo · 非课程作业</p>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg sm:p-8"
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                        project.statusType === "deployed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {project.statusType === "deployed" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Wrench className="h-3 w-3" />
                      )}
                      {project.status}
                    </span>
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-foreground">{project.title}</h3>
                  <p className="mb-4 text-sm text-primary/70">{project.subtitle}</p>
                  <p className="mb-4 leading-relaxed text-muted-foreground">{project.description}</p>

                  {project.metrics && (
                    <div className="mb-4 flex flex-wrap gap-6 rounded-lg bg-primary/5 p-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-semibold text-primary">{metric.label}</p>
                          <p className="text-sm text-muted-foreground">{metric.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
                    {project.statusType === "deployed" ? "查看项目详情" : "体验 Demo"} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="font-semibold">伍乐漫 · leman1lucky1017@gmail.com</p>
          <p className="text-sm opacity-80">墨尔本大学数学统计硕士 · 2026届 · AI 产品实践者</p>
        </div>
      </footer>
    </main>
  )
}
