import { useState } from 'react'
import {
  BadgeQuestionMarkIcon,
  BoxIcon,
  DownloadIcon,
  SettingsIcon,
  type LucideIcon
} from 'lucide-react'

import { FloatingNav, type FloatingNavItem } from '@/components/floating-nav'

type Section = {
  id: string
  title: string
  eyebrow: string
  description: string
  accent: string
  icon: LucideIcon
}

const sections: Section[] = [
  {
    id: 'downloads',
    title: '正在下载',
    eyebrow: 'Downloads',
    description:
      '用于承接当前进行中的下载任务，比如进度、速度、剩余时间和失败重试，通常会作为最常驻的工作视图。',
    accent: '把下载过程放在最靠前的位置，用户更容易形成“正在执行什么”的掌控感。',
    icon: DownloadIcon
  },
  {
    id: 'tasks',
    title: '所有任务',
    eyebrow: 'Tasks',
    description:
      '聚合展示全部下载记录、已完成项和排队任务，适合作为总览页，也方便后续增加筛选和批量操作。',
    accent: '把“现在在做”和“过去做过”分层展示，会比单一列表更清晰。',
    icon: BoxIcon
  },
  {
    id: 'settings',
    title: '设置',
    eyebrow: 'Settings',
    description: '集中管理下载目录、并发数、代理、通知等偏好项，通常属于低频但关键的系统配置入口。',
    accent: '设置入口可以保持克制，但需要在任何页面都稳定可达。',
    icon: SettingsIcon
  },
  {
    id: 'about',
    title: '关于',
    eyebrow: 'About',
    description: '用于放版本信息、更新日志、项目说明和外部链接，相对独立，适合放在导航的末尾位置。',
    accent: '把“关于”放在收尾位置，会更符合桌面工具的导航习惯。',
    icon: BadgeQuestionMarkIcon
  }
]

const navItems: FloatingNavItem[] = sections.map(({ id, icon }) => ({
  id,
  icon
}))

function App() {
  const [activeItemId, setActiveItemId] = useState(navItems[0]?.id ?? '')

  function handleNavSelect(item: FloatingNavItem) {
    setActiveItemId(item.id)
    document.getElementById(item.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <>
      <main className="min-h-screen text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-24 py-10">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 px-6 py-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:px-10 xl:py-10">
            <div className="relative flex max-w-3xl flex-col gap-5">
              <div className="space-y-3">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Floating Menu Test
                </h1>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                  “正在下载”适合默认高亮，承担应用主工作区入口。
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                  “所有任务”承接全量列表，比首页卡片更像管理视角。
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                  “设置”和“关于”保留在导航下段，更符合工具型产品习惯。
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            {sections.map(section => (
              <article
                id={section.id}
                key={section.id}
                className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.5)] backdrop-blur"
              >
                <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.08),transparent_70%)]" />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                      <section.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase">
                        {section.eyebrow}
                      </p>
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{section.description}</p>
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm text-slate-700">
                    {section.accent}
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>

      <FloatingNav items={navItems} activeId={activeItemId} onItemSelect={handleNavSelect} />
    </>
  )
}

export default App
