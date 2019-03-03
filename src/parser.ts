import { ValueSelector, QueryField, AndGroup, OrGroup, ParseOptions } from './types'
import { escapeRegExp } from './re'

export const IS_EMPTY_ALIAS = '!@'
export const ARRAY_ITEMS_DELIMITER = '~'

export function parseOrGroup(queryStr: string, options: ParseOptions): OrGroup {
  const orParts = queryStr.split(' OR ')
  return { andGroups: orParts.map(part => parseAndGroup(part, options)) }
}

export function parseAndGroup(groupStr: string, options: ParseOptions): AndGroup {
  const andParts = groupStr.split(' AND ')
  return { fields: andParts.map(part => parseField(part, options)) }
}

export function parseField(fieldStr: string, options: ParseOptions): QueryField {
  const [pathOrAlias] = fieldStr.split(':')
  const value = fieldStr.slice(pathOrAlias.length + 1).trim() // +1 to cut ':' too
  const isEmpty = value === IS_EMPTY_ALIAS
  const path = resolveAlias(pathOrAlias.trim(), options.pathAliases)
  return {
    value,
    path,
    regex: isEmpty ? null : new RegExp(value, 'i'),
    valueSelector: buildValueSelector(path, options),
  }
}

export function buildValueSelector(path: string, { caseSensitiveFields }: ParseOptions): ValueSelector {
  const fields = path.split('.')
  return fields.length === 1
    ? (obj: any) => convertToString(getFieldValue(obj, fields[0], caseSensitiveFields))
    : (obj: any) => get(obj, fields, caseSensitiveFields)
}

function get(obj: any, path: string[], caseSensitiveFields: boolean): string {
  const [field, ...other] = path
  const value = getFieldValue(obj, field, caseSensitiveFields)
  if (other.length === 0 || value === null || value === undefined) {
    return convertToString(value)
  }
  return Array.isArray(value)
    ? value.map(v => get(v, other, caseSensitiveFields)).join(ARRAY_ITEMS_DELIMITER)
    : get(value, other, caseSensitiveFields)
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

function getFieldValue(obj: any, field: string, caseSensitiveFields: boolean): any {
  if (caseSensitiveFields) {
    return obj[field]
  }
  const fieldRe = new RegExp(`^${escapeRegExp(field)}$`, 'i')
  const key = Array.from(Object.keys(obj)).find(key => !!key.match(fieldRe))
  return key === undefined ? null : obj[key]
}

function resolveAlias(fieldOrAlias: string, pathAliases: { [key: string]: string } | undefined) {
  if (pathAliases === undefined) {
    return fieldOrAlias
  }
  const field = getFieldValue(pathAliases, fieldOrAlias, true) as string | undefined
  return field === undefined ? fieldOrAlias : field
}
