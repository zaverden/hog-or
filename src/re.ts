const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = new RegExp(reRegExpChar.source)

export function re(pattern: string, flags: string | undefined = undefined, escape: boolean = true): RegExp {
  return new RegExp(
    escape ? escapeRegExp(pattern) : pattern,
    flags,
  )
}

export function escapeRegExp(pattern: string): string {
  return (pattern && reHasRegExpChar.test(pattern))
    ? pattern.replace(reRegExpChar, '\\$&')
    : pattern
}
