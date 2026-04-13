"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  tags: string[]
  description: string
  icon: React.ReactNode
  href?: string
}

export function ProjectCard({ title, tags, description, icon, href }: ProjectCardProps) {
  const Wrapper = href ? Link : "div"
  const wrapperProps = href ? { href } : {}
  
  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative block rounded-xl border border-border bg-card p-6",
        "transition-all duration-300 ease-out cursor-pointer",
        "hover:border-primary hover:shadow-[0_0_30px_rgba(255,36,66,0.15)]"
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </Wrapper>
  )
}
