import { TauriIcon } from '@/icons'
import packageJson from '../../package.json'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Badge } from './ui/badge'
import { BadgeCheck } from 'lucide-react'

type AboutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const stacks = [
  {
    name: 'React',
    icon: BadgeCheck
  },
  {
    name: 'Tauri',
    icon: TauriIcon
  }
]

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">关于</DialogTitle>
          <DialogDescription className="text-xs">
            全功能下载管理器，使用 React 和 Rust 构建。
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-sm font-semibold">Meow 版本</p>
            <p className="mt-2 text-sm font-medium">v{packageJson.version}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-sm font-semibold">Aria2 版本</p>
            <p className="mt-2 text-sm font-medium">v1.36.0</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div>技术栈</div>
          <div className="flex gap-2">
            {stacks.map(item => (
              <Badge variant="secondary" key={item.name}>
                <item.icon />
                {item.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <span>© 2026 ppxb.</span>
          <span>Inspired by</span>
          <a
            href="https://github.com/AnInsomniacy/motrix-next"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 underline"
          >
            Motrix Next
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
