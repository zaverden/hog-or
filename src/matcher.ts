import { AndGroup, QueryField } from './types'

export function matchGroups(groups: AndGroup[], obj: any): boolean {
  for (const group of groups) {
    if (matchAndGroup(group, obj)) {
      return true
    }
  }
  return false
}

export function matchAndGroup(group: AndGroup, obj: any): boolean {
  for (const field of group.fields) {
    if (!matchField(field, obj)) {
      return false
    }
  }
  return true
}

export function matchField(field: QueryField, obj: any): boolean {
  const { regex, valueSelector } = field
  const objValue = valueSelector(obj)
  if (objValue === '') {
    return regex === null
  }
  return regex !== null && !!objValue.match(regex)
}
