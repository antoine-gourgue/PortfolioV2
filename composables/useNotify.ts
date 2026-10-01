interface Notice {
  id: number
  icon: string
  title: string
  message: string
  action?: () => void
}

let timer: ReturnType<typeof setTimeout> | undefined
let counter = 0

/**
 * macOS/iOS-style system notifications (in place of generic toasts).
 * One banner at a time, auto-dismissed after `duration` ms (4.5s by
 * default). A notice with an `action` runs it when the banner is clicked,
 * like a real notification opening its app.
 */
export function useNotify() {
  const current = useState<Notice | null>('notification', () => null)

  const notify = (opts: {
    icon?: string
    title: string
    message: string
    action?: () => void
    duration?: number
  }) => {
    current.value = {
      id: ++counter,
      icon: opts.icon ?? 'finder',
      title: opts.title,
      message: opts.message,
      action: opts.action,
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      current.value = null
    }, opts.duration ?? 4500)
  }

  const dismiss = () => {
    if (timer) clearTimeout(timer)
    current.value = null
  }

  // Click on the banner: run its action, if any, then let it go
  const activate = () => {
    const action = current.value?.action
    dismiss()
    action?.()
  }

  return { current, notify, dismiss, activate }
}
