export function mergeClassNames(...names: (string | boolean)[]) {
  return names.filter(Boolean).join(' ')
}

export function randomStr(len = 16) {
  const l = Math.max(1, Math.min(100, len))
  let str = '_'

  while (str.length < l) {
    str += Math.random()
      .toString(36)
      .slice(2)
  }

  return str.slice(0, l)
}

export function sleep(ms = 1000) {
  return new Promise<void>(resolve => {
    const t = setTimeout(() => {
      clearTimeout(t)
      resolve()
    }, ms)
  })
}

export function navigateToPage(pageName: string, params?: Record<string, string | number>) {}
