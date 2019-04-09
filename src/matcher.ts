import { AndGroup, QueryField, OrGroup } from './types'

export function matchOrGroup<T>(group: OrGroup, obj: T): boolean {
  for (const andGroup of group.andGroups) {
    if (matchAndGroup(andGroup, obj)) {
      return true
    }
  }
  return false
}

export function matchAndGroup<T>(group: AndGroup, obj: T): boolean {
  for (const field of group.fields) {
    if (!matchField(field, obj)) {
      return false
    }
  }
  return true
}

export function matchField<T>(field: QueryField, obj: T): boolean {
  const { regex, valueSelector } = field
  const objValue = valueSelector(obj)
  if (objValue === '') {
    // regex === null means we want to match empty value
    return regex === null
  }
  return regex !== null && !!objValue.match(regex)
}
