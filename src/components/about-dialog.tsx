import packageJson from '../../package.json'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type AboutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">关于 Meow</DialogTitle>
          <DialogDescription className="text-xs">
            这是当前桌面下载工具的基础壳层，已经接入左侧导航、页面路由和独立的关于弹层。
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">版本</p>
            <p className="mt-2 text-sm font-medium text-slate-900">v{packageJson.version}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
              技术栈
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">Tauri + React Router</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
          当前建议把“关于”视为全局动作，而不是主内容页面。这样它可以独立展示版本、更新记录和项目说明，不会干扰主路由结构。
        </div>
      </DialogContent>
    </Dialog>
  )
}
