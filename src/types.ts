export type ValueSelector = (obj: any) => string

export interface QueryField {
  path: string
  value: string
  regex: RegExp | null
  valueSelector: ValueSelector
}

export interface AndGroup {
  fields: QueryField[]
}

export interface OrGroup {
  andGroups: AndGroup[]
}

export interface ParseOptions {
  caseSensitiveFields: boolean
  pathAliases: { [key: string]: string } | null
}
