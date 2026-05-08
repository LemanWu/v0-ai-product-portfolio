import Link from "next/link"
import { ArrowLeft, BookOpen, Mic, FileText, Zap, FolderTree, Brain, Workflow } from "lucide-react"

const features = [
  {
    icon: <Mic className="h-5 w-5" />,
    title: "说话即记录",
    description: "语音转文字，想法不丢失。手机端豆包输入法 + 电脑端闪电说，随时随地记录灵感。",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI 自动整理",
    description: "一句话触发，AI 提取认知、情绪、待办，分类归档到对应文件夹，不需要手动整理。",
  },
  {
    icon: <FolderTree className="h-5 w-5" />,
    title: "结构化知识库",
    description: "收件箱 → 素材库 → 方法论，内容创作的完整链路。每次创作都在已有积累上叠加。",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Skills 自动化",
    description: "预设工作流，一句话触发多步操作。「处理日记」「写文章」「拆解笔记」，AI 自动执行。",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "方法论沉淀",
    description: "从对标拆解、课程、实战中提炼规律。AI 基于你的方法论写作，越用越懂你。",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "本地 + 私有",
    description: "数据存在本地 Markdown 文件，不上传云端。永不被锁定，即使软件停服文件仍可用。",
  },
]

const workflow = [
  {
    step: "01",
    title: "说",
    description: "语音记录灵感、复盘、想法",
    detail: "手机豆包输入法 / 电脑闪电说，不用打字，说出来就行",
  },
  {
    step: "02",
    title: "记",
    description: "自动存入 Obsidian 日记",
    detail: "文字自动写入日记文件，按月归档，不用手动分类",
  },
  {
    step: "03",
    title: "整理",
    description: "AI 提取要点，分类归档",
    detail: "一句「处理日常输入」，AI 自动提取认知、选题、待办",
  },
  {
    step: "04",
    title: "复盘",
    description: "周/月复盘自动生成",
    detail: "汇总本周输入，生成认知变化、情绪曲线、下周建议",
  },
]

const structure = [
  { name: "00-收件箱", desc: "灵感、碎片想法先丢这里", color: "bg-gray-100" },
  { name: "01-赛道研究", desc: "受众画像、对标账号拆解", color: "bg-blue-50" },
  { name: "02-选题库", desc: "所有选题想法汇总", color: "bg-green-50" },
  { name: "03-内容生产", desc: "写作工作台", color: "bg-yellow-50" },
  { name: "04-已发布", desc: "发布后归档复盘", color: "bg-orange-50" },
  { name: "05-素材库", desc: "金句、案例、故事", color: "bg-purple-50" },
  { name: "06-方法论", desc: "可复用的经验规律", color: "bg-pink-50" },
  { name: "CLAUDE.md", desc: "AI 的工作手册", color: "bg-primary/10" },
]

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                搭建中
              </span>
              <h1 className="mb-2 text-3xl font-bold text-foreground">AI 知识库体系</h1>
              <p className="text-primary/70">Obsidian + Claude Code · 个人知识管理系统</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Core Concept */}
        <section className="mb-12 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">核心理念</h2>
          <p className="leading-relaxed text-foreground">
            大多数人用 AI 的方式是：有想法 → 问 AI → 得到答案 → 发布 → 忘记。这是<span className="font-semibold text-primary">碎片化</span>的用法，每次都在重新发明轮子。
          </p>
          <p className="mt-3 leading-relaxed text-foreground">
            而 Obsidian + Claude Code 的方式是：有想法 → 记录到知识库 → AI 基于已有积累生成内容 → 发布 → 数据复盘 → 沉淀方法论。
            这是<span className="font-semibold text-primary">系统化</span>的创作，每次创作都在原有积累上叠加，越用越强。
          </p>
          <p className="mt-4 text-sm font-medium text-primary">
            把 AI 从一次性工具变成终身助手。
          </p>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">系统能力</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">日记复盘流程</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="rounded-xl border border-border bg-card p-5">
                  <span className="mb-2 block text-3xl font-bold text-primary/30">{item.step}</span>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">{item.description}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-2xl text-primary/30 lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Folder Structure */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">知识库结构</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {structure.map((folder) => (
                <div
                  key={folder.name}
                  className={`rounded-lg ${folder.color} p-4 transition-all hover:scale-[1.02]`}
                >
                  <p className="font-mono text-sm font-semibold text-foreground">{folder.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{folder.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Skills 自动化</h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="mb-4 text-muted-foreground">
              Skills 是给 AI 的标准操作手册（SOP）。预设好工作流程，一句话触发多步操作。
            </p>
            <div className="space-y-3">
              {[
                { trigger: "「处理日常输入」", action: "扫描日记 → 提取认知/情绪/待办 → 分类归档 → 更新素材库" },
                { trigger: "「帮我写篇文章」", action: "确认选题 → 搜集素材 → 写大纲 → 写正文 → 质检" },
                { trigger: "「拆解这篇笔记」", action: "分析标题技巧 → 拆解开头钩子 → 总结正文结构 → 挖掘选题" },
                { trigger: "「做周复盘」", action: "汇总本周输入 → 生成认知变化 → 分析情绪曲线 → 输出建议" },
              ].map((skill) => (
                <div key={skill.trigger} className="flex gap-4 rounded-lg bg-secondary p-4">
                  <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {skill.trigger}
                  </span>
                  <p className="text-sm text-muted-foreground">{skill.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
          <p className="font-medium text-yellow-800">
            该系统正在搭建中，完整内容将在后续更新
          </p>
          <p className="mt-2 text-sm text-yellow-700">
            目前已完成：环境搭建、文件夹结构、日记复盘流程、部分 Skills
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            AI 知识库体系 · Obsidian + Claude Code
          </p>
        </div>
      </footer>
    </main>
  )
}
