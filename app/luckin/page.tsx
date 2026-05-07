"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Panel,
  Node,
  Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

// Node types with custom styling
const nodeTypes = {}

// Initial nodes representing the knowledge graph
const initialNodes: Node[] = [
  // Central node
  {
    id: "center",
    position: { x: 500, y: 300 },
    data: { label: "瑞幸4月运营策略" },
    style: {
      background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      padding: "20px 32px",
      fontSize: "18px",
      fontWeight: "bold",
      boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)",
    },
  },
  
  // Four main strategy lines
  {
    id: "line-a",
    position: { x: 150, y: 80 },
    data: { label: "主线A: 品质升级\n埃塞金烘系列" },
    style: {
      background: "#DBEAFE",
      color: "#1E40AF",
      border: "2px solid #3B82F6",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
  },
  {
    id: "line-b",
    position: { x: 850, y: 80 },
    data: { label: "主线B: 健康赛道\n苦瓜轻体/椰青冰萃" },
    style: {
      background: "#DCFCE7",
      color: "#166534",
      border: "2px solid #22C55E",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
  },
  {
    id: "line-c",
    position: { x: 150, y: 520 },
    data: { label: "主线C: IP联名破圈\n三大圈层覆盖" },
    style: {
      background: "#FEF3C7",
      color: "#92400E",
      border: "2px solid #F59E0B",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
  },
  {
    id: "line-d",
    position: { x: 850, y: 520 },
    data: { label: "主线D: 银行联名\n7家覆盖一周7天" },
    style: {
      background: "#F3E8FF",
      color: "#7C3AED",
      border: "2px solid #8B5CF6",
      borderRadius: "12px",
      padding: "16px 24px",
      fontSize: "14px",
      fontWeight: "600",
      textAlign: "center",
      whiteSpace: "pre-line",
    },
  },

  // Line A details
  {
    id: "a1",
    position: { x: -80, y: 0 },
    data: { label: "IIAC铂金奖背书" },
    style: {
      background: "#EFF6FF",
      color: "#1E40AF",
      border: "1px solid #93C5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
    },
  },
  {
    id: "a2",
    position: { x: -80, y: 60 },
    data: { label: "WBC世界亚军孙磊" },
    style: {
      background: "#EFF6FF",
      color: "#1E40AF",
      border: "1px solid #93C5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
    },
  },
  {
    id: "a3",
    position: { x: -80, y: 120 },
    data: { label: "金烘专属小棕杯" },
    style: {
      background: "#EFF6FF",
      color: "#1E40AF",
      border: "1px solid #93C5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
    },
  },
  {
    id: "a-data",
    position: { x: -80, y: 180 },
    data: { label: "转发15.7k | 点赞6032" },
    style: {
      background: "#3B82F6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      fontSize: "11px",
      fontWeight: "600",
    },
  },

  // Line B details
  {
    id: "b1",
    position: { x: 1080, y: 0 },
    data: { label: "苦瓜轻体美式\n8种果蔬24h鲜榨" },
    style: {
      background: "#F0FDF4",
      color: "#166534",
      border: "1px solid #86EFAC",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "b2",
    position: { x: 1080, y: 80 },
    data: { label: "椰青冰萃美式\n1杯≈1个椰子" },
    style: {
      background: "#F0FDF4",
      color: "#166534",
      border: "1px solid #86EFAC",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "b3",
    position: { x: 1080, y: 160 },
    data: { label: "轻椰茉莉拿铁\n夏日清爽新品" },
    style: {
      background: "#F0FDF4",
      color: "#166534",
      border: "1px solid #86EFAC",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },

  // Line C details - IP collaborations
  {
    id: "c1",
    position: { x: -100, y: 440 },
    data: { label: "蛋仔派对\n游戏二次元圈" },
    style: {
      background: "#FEF9C3",
      color: "#854D0E",
      border: "1px solid #FDE047",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "c2",
    position: { x: -100, y: 520 },
    data: { label: "自嘲熊Joke Bear\n日系治愈圈" },
    style: {
      background: "#FEF9C3",
      color: "#854D0E",
      border: "1px solid #FDE047",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "c3",
    position: { x: -100, y: 600 },
    data: { label: "陶喆×赞萌露比\n情怀+韩系双圈层" },
    style: {
      background: "#FEF9C3",
      color: "#854D0E",
      border: "1px solid #FDE047",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "c-data",
    position: { x: -100, y: 680 },
    data: { label: "陶喆联名转发32.4k\n本月峰值!" },
    style: {
      background: "#F59E0B",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "8px 14px",
      fontSize: "11px",
      fontWeight: "600",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },

  // Line D details - Bank partnerships
  {
    id: "d1",
    position: { x: 1080, y: 440 },
    data: { label: "招行/建行\n数字人民币" },
    style: {
      background: "#FAF5FF",
      color: "#6B21A8",
      border: "1px solid #C4B5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "d2",
    position: { x: 1080, y: 520 },
    data: { label: "兴业/浦发\n周二6元/周六1元" },
    style: {
      background: "#FAF5FF",
      color: "#6B21A8",
      border: "1px solid #C4B5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },
  {
    id: "d3",
    position: { x: 1080, y: 600 },
    data: { label: "平安联名卡\n拉新+留存+裂变" },
    style: {
      background: "#FAF5FF",
      color: "#6B21A8",
      border: "1px solid #C4B5FD",
      borderRadius: "8px",
      padding: "10px 16px",
      fontSize: "12px",
      whiteSpace: "pre-line",
      textAlign: "center",
    },
  },

  // Strategic insights
  {
    id: "insight-1",
    position: { x: 380, y: 0 },
    data: { label: "向上: 争夺精品咖啡用户" },
    style: {
      background: "#1E40AF",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 16px",
      fontSize: "11px",
      fontWeight: "500",
    },
  },
  {
    id: "insight-2",
    position: { x: 580, y: 0 },
    data: { label: "向外: 渗透非咖啡圈" },
    style: {
      background: "#166534",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 16px",
      fontSize: "11px",
      fontWeight: "500",
    },
  },
  {
    id: "insight-3",
    position: { x: 380, y: 600 },
    data: { label: "向深: 绑定存量用户" },
    style: {
      background: "#7C3AED",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 16px",
      fontSize: "11px",
      fontWeight: "500",
    },
  },

  // Core logic nodes
  {
    id: "logic-1",
    position: { x: 420, y: 180 },
    data: { label: "产品分层" },
    style: {
      background: "#F1F5F9",
      color: "#475569",
      border: "2px dashed #94A3B8",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  {
    id: "logic-2",
    position: { x: 550, y: 180 },
    data: { label: "渠道分层" },
    style: {
      background: "#F1F5F9",
      color: "#475569",
      border: "2px dashed #94A3B8",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
  {
    id: "logic-3",
    position: { x: 480, y: 420 },
    data: { label: "用户分层" },
    style: {
      background: "#F1F5F9",
      color: "#475569",
      border: "2px dashed #94A3B8",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: "600",
    },
  },
]

// Initial edges connecting nodes
const initialEdges: Edge[] = [
  // Center to main lines
  { id: "e-center-a", source: "center", target: "line-a", style: { stroke: "#3B82F6", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#3B82F6" } },
  { id: "e-center-b", source: "center", target: "line-b", style: { stroke: "#22C55E", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#22C55E" } },
  { id: "e-center-c", source: "center", target: "line-c", style: { stroke: "#F59E0B", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" } },
  { id: "e-center-d", source: "center", target: "line-d", style: { stroke: "#8B5CF6", strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: "#8B5CF6" } },

  // Line A details
  { id: "e-a-a1", source: "line-a", target: "a1", style: { stroke: "#93C5FD", strokeWidth: 1 } },
  { id: "e-a-a2", source: "line-a", target: "a2", style: { stroke: "#93C5FD", strokeWidth: 1 } },
  { id: "e-a-a3", source: "line-a", target: "a3", style: { stroke: "#93C5FD", strokeWidth: 1 } },
  { id: "e-a-data", source: "a3", target: "a-data", style: { stroke: "#3B82F6", strokeWidth: 1 } },

  // Line B details
  { id: "e-b-b1", source: "line-b", target: "b1", style: { stroke: "#86EFAC", strokeWidth: 1 } },
  { id: "e-b-b2", source: "line-b", target: "b2", style: { stroke: "#86EFAC", strokeWidth: 1 } },
  { id: "e-b-b3", source: "line-b", target: "b3", style: { stroke: "#86EFAC", strokeWidth: 1 } },

  // Line C details
  { id: "e-c-c1", source: "line-c", target: "c1", style: { stroke: "#FDE047", strokeWidth: 1 } },
  { id: "e-c-c2", source: "line-c", target: "c2", style: { stroke: "#FDE047", strokeWidth: 1 } },
  { id: "e-c-c3", source: "line-c", target: "c3", style: { stroke: "#FDE047", strokeWidth: 1 } },
  { id: "e-c-data", source: "c3", target: "c-data", style: { stroke: "#F59E0B", strokeWidth: 1 } },

  // Line D details
  { id: "e-d-d1", source: "line-d", target: "d1", style: { stroke: "#C4B5FD", strokeWidth: 1 } },
  { id: "e-d-d2", source: "line-d", target: "d2", style: { stroke: "#C4B5FD", strokeWidth: 1 } },
  { id: "e-d-d3", source: "line-d", target: "d3", style: { stroke: "#C4B5FD", strokeWidth: 1 } },

  // Insights connections
  { id: "e-insight-1", source: "insight-1", target: "line-a", style: { stroke: "#1E40AF", strokeWidth: 1, strokeDasharray: "4 2" } },
  { id: "e-insight-2", source: "insight-2", target: "line-b", style: { stroke: "#166534", strokeWidth: 1, strokeDasharray: "4 2" } },
  { id: "e-insight-3", source: "insight-3", target: "line-c", style: { stroke: "#7C3AED", strokeWidth: 1, strokeDasharray: "4 2" } },
  { id: "e-insight-3b", source: "insight-3", target: "line-d", style: { stroke: "#7C3AED", strokeWidth: 1, strokeDasharray: "4 2" } },

  // Logic connections
  { id: "e-logic-1", source: "center", target: "logic-1", style: { stroke: "#94A3B8", strokeWidth: 1, strokeDasharray: "4 2" } },
  { id: "e-logic-2", source: "center", target: "logic-2", style: { stroke: "#94A3B8", strokeWidth: 1, strokeDasharray: "4 2" } },
  { id: "e-logic-3", source: "center", target: "logic-3", style: { stroke: "#94A3B8", strokeWidth: 1, strokeDasharray: "4 2" } },
]

export default function LuckinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                用户运营分析
              </span>
              <h1 className="text-2xl font-bold text-foreground">瑞幸4月公众号活动分析</h1>
              <p className="mt-1 text-primary/70">运营策略拆解 · 知识图谱可视化</p>
            </div>
          </div>
        </div>
      </header>

      {/* Knowledge Graph */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="mb-2 font-semibold text-foreground">核心发现</h2>
          <p className="leading-relaxed text-muted-foreground">
            瑞幸4月运营呈现<span className="font-medium text-primary">三个方向</span>的系统性布局：
            <span className="font-medium text-blue-600">向上</span>争夺精品咖啡用户（埃塞金烘），
            <span className="font-medium text-green-600">向外</span>渗透非咖啡圈（健康饮品），
            <span className="font-medium text-purple-600">向深</span>绑定存量用户（银行联名+IP联名）。
            背后是<span className="font-medium text-foreground">产品分层、渠道分层、用户分层</span>的精细化运营逻辑。
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" style={{ height: "700px" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={2}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background color="#E2E8F0" gap={20} />
            <Controls className="!bg-card !border-border !shadow-lg" />
            <MiniMap 
              nodeColor={(node) => {
                if (node.id === "center") return "#3B82F6"
                if (node.id.startsWith("line-a") || node.id.startsWith("a")) return "#DBEAFE"
                if (node.id.startsWith("line-b") || node.id.startsWith("b")) return "#DCFCE7"
                if (node.id.startsWith("line-c") || node.id.startsWith("c")) return "#FEF3C7"
                if (node.id.startsWith("line-d") || node.id.startsWith("d")) return "#F3E8FF"
                return "#F1F5F9"
              }}
              maskColor="rgba(241, 245, 249, 0.8)"
              className="!bg-card !border-border"
            />
            <Panel position="top-right" className="flex gap-2">
              <div className="rounded-lg bg-card/90 px-3 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur-sm border border-border">
                拖拽移动 · 滚轮缩放 · 点击节点查看详情
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </section>

      {/* Key Insights Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">关键洞察</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Insight 1 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <span className="text-lg font-bold">A</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">品质升级策略</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              埃塞金烘系列不是发新品，而是用「豆的升级」带动「品的溢价」。IIAC铂金奖+孙磊背书构建专业认知，转发15.7k源于知识型+颜值内容双重动机叠加。
            </p>
          </div>

          {/* Insight 2 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <span className="text-lg font-bold">C</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">IP联名破圈</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              陶喆×Loopy联名转发32.4k为本月峰值，四要素同时触发：明星情怀 × IP视觉 × 游戏参与 × 周年节点。教科书级联名破圈案例。
            </p>
          </div>

          {/* Insight 3 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
              <span className="text-lg font-bold">D</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">银行联名矩阵</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              7家银行覆盖一周7天，本质是CAC获客成本外包模型。瑞幸将部分获客成本外包给银行，银行激活沉睡用户，双赢。
            </p>
          </div>

          {/* Insight 4 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <span className="text-lg font-bold">B</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">健康赛道扩张</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              健康线不为对标奈雪/喜茶，而是留住「不喝咖啡因」用户。同一门店扩大客群：非咖啡用户从陪朋友变为自主消费。
            </p>
          </div>

          {/* Insight 5 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <span className="text-lg font-bold">!</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">内容运营进化</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              从「产品图+价格」硬广 → 「情绪叙事+场景植入+UGC融合」高级内容。Weekly栏目内容产品化，训练用户每周一打开的阅读习惯。
            </p>
          </div>

          {/* Insight 6 */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <span className="text-lg font-bold">?</span>
            </div>
            <h3 className="mb-2 font-semibold text-foreground">我的思考</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              瑞幸护城河本质非低价，而是运营密度：同时维护7家银行+多个IP联名+周期性内容产品化，需极强团队协作能力，资本难复制。
            </p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center">
          <p className="text-sm text-primary">
            本分析基于瑞幸2024年4月公众号公开内容，用于学习研究目的
          </p>
        </div>
      </footer>
    </main>
  )
}
