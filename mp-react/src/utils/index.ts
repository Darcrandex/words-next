export function mergeClassNames(...names: (string | boolean)[]) {
  return names.filter(Boolean).join(' ')
}
