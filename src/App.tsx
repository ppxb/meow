import { useMemo, useState } from 'react'
import {
  BadgeQuestionMarkIcon,
  BoxIcon,
  DownloadIcon,
  FolderCogIcon,
  ListTreeIcon,
  RouteIcon,
  SettingsIcon,
  ShieldCheckIcon,
  type LucideIcon
} from 'lucide-react'
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router'

import { AboutDialog } from '@/components/about-dialog'
import { AppPage } from '@/components/app-page'
import { FloatingNav, type FloatingNavItem } from '@/components/floating-nav'

type RoutePageId = 'downloads' | 'tasks' | 'settings'

type PageSection = {
  title: string
  description: string
  note: string
  icon: LucideIcon
}

type RoutePage = {
  id: RoutePageId
  path: `/${string}`
  navIcon: LucideIcon
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  cards: PageSection[]
}

const routePages: RoutePage[] = [
  {
    id: 'downloads',
    path: '/downloads',
    navIcon: DownloadIcon,
    eyebrow: 'Downloads',
    title: '正在下载',
    description:
      '把当前执行中的下载任务集中到一个工作视图里，优先展示进度、速度、剩余时间和异常重试，让用户一眼知道应用正在做什么。',
    highlights: [
      '默认进入下载页，更符合工具型应用的主工作流。',
      '状态信息集中展示，比散落在多个入口里更容易排障。',
      '后续接真实数据时，这一页最适合承接轮询和任务状态同步。'
    ],
    cards: [
      {
        title: '任务进度',
        description: '适合放下载条目、传输进度、实时速率和剩余时长等高频信息。',
        note: '这里建议优先保证可扫描性，不要让主列表承担过多次级操作。',
        icon: DownloadIcon
      },
      {
        title: '异常恢复',
        description: '可以收口失败重试、网络异常、磁盘空间不足等需要立刻处理的问题。',
        note: '错误提示最好直接给出下一步动作，减少用户自己判断的成本。',
        icon: ShieldCheckIcon
      }
    ]
  },
  {
    id: 'tasks',
    path: '/tasks',
    navIcon: BoxIcon,
    eyebrow: 'Tasks',
    title: '所有任务',
    description:
      '把进行中、已完成和排队中的任务统一管理，适合作为全量总览页，也方便后续加入筛选、排序和批量操作。',
    highlights: [
      '“全部任务”更适合做管理视角，而不是首页装饰性概览。',
      '统一列表结构后，后面扩展搜索和筛选会顺很多。',
      '如果未来支持任务详情页，这里也最适合成为列表入口。'
    ],
    cards: [
      {
        title: '筛选视图',
        description: '后续可以自然增加全部、进行中、已完成、失败等任务筛选。',
        note: '建议尽早统一任务状态枚举，后面列表和详情页都会复用。',
        icon: ListTreeIcon
      },
      {
        title: '批量操作',
        description: '删除记录、重新下载、导出信息等能力都更适合挂在任务总览页。',
        note: '批量动作要和单条操作分开，避免误触时破坏主流程。',
        icon: RouteIcon
      }
    ]
  },
  {
    id: 'settings',
    path: '/settings',
    navIcon: SettingsIcon,
    eyebrow: 'Settings',
    title: '设置',
    description:
      '集中管理下载目录、并发限制、代理、通知和其他偏好配置，保持入口稳定但不过度打扰主流程。',
    highlights: [
      '设置页适合稳定承载低频但关键的系统配置。',
      '桌面工具的设置通常更像控制面板，需要清晰分组。',
      '以后接表单和持久化时，这一页会是状态管理的重要落点。'
    ],
    cards: [
      {
        title: '下载偏好',
        description: '建议把保存目录、命名规则、并发数等基础选项放在同一个分组里。',
        note: '偏好项最好有默认值和即时反馈，降低首次使用门槛。',
        icon: FolderCogIcon
      },
      {
        title: '系统行为',
        description: '通知、开机启动、代理策略和更新行为等更适合放在系统层设置中。',
        note: '系统级配置一旦生效范围较大，界面上要尽量明确影响范围。',
        icon: SettingsIcon
      }
    ]
  }
]

const routePathById: Record<RoutePageId, RoutePage['path']> = {
  downloads: '/downloads',
  tasks: '/tasks',
  settings: '/settings'
}

const navItems: FloatingNavItem[] = [
  ...routePages.map(page => ({
    id: page.id,
    icon: page.navIcon
  })),
  {
    id: 'about',
    icon: BadgeQuestionMarkIcon
  }
]

function RoutedPage({ pageId }: { pageId: RoutePageId }) {
  const page = routePages.find(candidate => candidate.id === pageId)

  if (!page) {
    return null
  }

  return (
    <AppPage
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      highlights={page.highlights}
      cards={page.cards}
    />
  )
}

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [aboutOpen, setAboutOpen] = useState(false)

  const activeRouteId = useMemo<RoutePageId>(() => {
    const matchedPage = routePages.find(page => page.path === location.pathname)
    return matchedPage?.id ?? 'downloads'
  }, [location.pathname])

  function handleNavSelect(item: FloatingNavItem) {
    if (item.id === 'about') {
      setAboutOpen(true)
      return
    }

    const nextPath = routePathById[item.id as RoutePageId]

    if (!nextPath) {
      return
    }

    setAboutOpen(false)

    if (nextPath !== location.pathname) {
      navigate(nextPath)
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_38%,#f8fafc_100%)] text-foreground">
        <Outlet />
      </main>

      <FloatingNav
        items={navItems}
        activeId={activeRouteId}
        onItemSelect={handleNavSelect}
      />

      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/downloads" replace />} />
        <Route path="/downloads" element={<RoutedPage pageId="downloads" />} />
        <Route path="/tasks" element={<RoutedPage pageId="tasks" />} />
        <Route path="/settings" element={<RoutedPage pageId="settings" />} />
        <Route path="*" element={<Navigate to="/downloads" replace />} />
      </Route>
    </Routes>
  )
}
