import Taro from '@tarojs/taro'
import queryString from 'query-string'

export function mergeClassNames(...classNames: (string | boolean | undefined | Record<string, boolean | undefined>)[]) {
  return classNames
    .map(item => {
      if (typeof item === 'object' && Object.keys(item).length > 0) {
        const res: string[] = []
        for (const key in item) {
          if (item[key]) res.push(key)
        }
        return res.join(' ')
      } else {
        return item
      }
    })
    .filter(Boolean)
    .join(' ')
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

export function navigateToPage(path: string, query?: queryString.StringifiableRecord): void {
  // 如果路径中包含 / ，则是一个绝对路径
  // 否则，path 会被当成路由名称
  const isAbsolutePath = path.indexOf('/') !== -1
  const url = queryString.stringifyUrl({ url: isAbsolutePath ? path : `/pages/${path}/index`, query })
  Taro.navigateTo({ url })
}
