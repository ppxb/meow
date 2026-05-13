import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type FloatingNavItem = {
  id: string
  icon: LucideIcon
}

type FloatingNavProps = {
  items: FloatingNavItem[]
  activeId?: string
  className?: string
  onItemSelect?: (item: FloatingNavItem) => void
}

export function FloatingNav({ items, activeId, className, onItemSelect }: FloatingNavProps) {
  const currentId = activeId ?? items[0].id

  return (
    <div
      className={cn(
        'fixed top-1/2 left-6 z-50 -translate-y-1/2 rounded-full border bg-background/80 p-1',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        {items.map(item => {
          const isActive = item.id === currentId

          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className="size-10 rounded-full"
              onClick={() => onItemSelect?.(item)}
            >
              <item.icon className="size-5" />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
