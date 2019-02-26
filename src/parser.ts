import { ValueSelector, AndGroup, QueryField } from './types'

export const IS_EMPTY_ALIAS = '!@'
export const ARRAY_ITEMS_DELIMITER = '~'

export function parseQuery(queryStr: string): AndGroup[] {
  const orParts = queryStr.split(' OR ')
  return orParts.map(parseAndGroup)
}

function parseAndGroup(groupStr: string): AndGroup {
  const andParts = groupStr.split(' AND ')
  return { fields: andParts.map(parseField) }
}

function parseField(fieldStr: string): QueryField {
  const [field] = fieldStr.split(':')
  const value = fieldStr.slice(field.length + 1).trim() // +1 to cut ':' too
  const isEmpty = value === IS_EMPTY_ALIAS
  return {
    value,
    isEmpty,
    path: field.trim(),
    regex: isEmpty ? null : new RegExp(value, 'i'),
    valueSelector: buildValueSelector(field.trim()),
  }
}

export function buildValueSelector(path: string): ValueSelector {
  // TODO: not implemented yet
  const fields = path.split('.')
  return (obj: any) => obj[fields[0]]
}

function get(obj: any, path: string[]): string {
  const [field, ...other] = path
  const value = obj[field]
  if (other.length === 0 || value === null || value === undefined) {
    return convertToString(value)
  }
  return Array.isArray(value)
    ? value.map(v => get(v, other)).join(ARRAY_ITEMS_DELIMITER)
    : get(value, other)
}

function convertToString(value: any): string {
  if (value === null || value === undefined) {
    return ''
  }
  if (typeof(value) === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return value.join(ARRAY_ITEMS_DELIMITER)
  }
  return `${value}`
}
