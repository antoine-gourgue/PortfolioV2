interface Notice {
  id: number
  icon: string
  title: string
  message: string
}

let timer: ReturnType<typeof setTimeout> | undefined
let counter = 0

/**
 * Notifications système façon macOS / iOS (remplace les toasts génériques).
 * Une seule bannière à la fois, auto-disparition après 4,5 s.
 */
export function useNotify() {
  const current = useState<Notice | null>('notification', () => null)

  const notify = (opts: { icon?: string; title: string; message: string }) => {
    current.value = {
      id: ++counter,
      icon: opts.icon ?? 'finder',
      title: opts.title,
      message: opts.message,
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      current.value = null
    }, 4500)
  }

  const dismiss = () => {
    if (timer) clearTimeout(timer)
    current.value = null
  }

  return { current, notify, dismiss }
}
