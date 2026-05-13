import { ReactIcon, TailwindcssIcon, TauriIcon, ViteIcon, GithubIcon } from '@/icons'
import packageJson from '../../package.json'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type AboutDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const stacks = [
  {
    name: 'React',
    icon: ReactIcon,
    version: packageJson.dependencies.react
  },
  {
    name: 'Tauri',
    icon: TauriIcon,
    version: packageJson.dependencies['@tauri-apps/api']
  },
  {
    name: 'Vite',
    icon: ViteIcon,
    version: packageJson.devDependencies.vite
  },

  {
    name: 'Tailwind CSS',
    icon: TailwindcssIcon,
    version: packageJson.devDependencies.tailwindcss
  }
]

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">关于</DialogTitle>
          <DialogDescription className="text-xs">
            全功能的轻量下载管理器，使用 Rust 和 React 构建。
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 rounded-2xl border p-3">
            <p className="text-sm font-semibold">Meow 版本</p>
            <p className="text-xs text-muted-foreground">v{packageJson.version}</p>
            <Button asChild variant="outline" size="sm" className="mt-2 w-fit rounded-full text-xs">
              <a href="https://github.com/ppxb/meow" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-3.5" />
                GitHub
              </a>
            </Button>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl border p-3">
            <p className="text-sm font-semibold">Aria2 版本</p>
            <p className="text-xs text-muted-foreground">v1.36.0</p>
            <Button asChild variant="outline" size="sm" className="mt-2 w-fit rounded-full text-xs">
              <a href="https://github.com/aria2/aria2" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="size-3.5" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">技术栈</p>
          <div className="grid grid-cols-2 gap-2">
            {stacks.map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="size-4" /> {item.name}
                </div>
                <span className="text-muted-foreground">{item.version}</span>
              </div>
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
            className="inline-flex items-center gap-1 text-yellow-500 underline"
          >
            Motrix Next
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
