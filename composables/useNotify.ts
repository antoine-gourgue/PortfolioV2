interface Notice {
  id: number
  icon: string
  title: string
  message: string
}

let timer: ReturnType<typeof setTimeout> | undefined
let counter = 0

/**
 * macOS/iOS-style system notifications (in place of generic toasts).
 * One banner at a time, auto-dismissed after 4.5s.
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
