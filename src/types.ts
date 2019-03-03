export type ValueSelector = (obj: any) => string

export interface QueryField {
  readonly path: string
  readonly value: string
  readonly regex: RegExp | null
  readonly valueSelector: ValueSelector
}

export interface AndGroup {
  readonly fields: QueryField[]
}

export interface OrGroup {
  readonly andGroups: AndGroup[]
}

export interface ParseOptions {
  caseSensitiveFields: boolean
  pathAliases?: { [key: string]: string }
}
