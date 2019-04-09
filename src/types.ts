export type ValueSelector = (obj: any) => string

export interface QueryField {
  readonly not: boolean
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
  /** Defines whether field name should be matched case sensitive
   * Default value is true
  */
  caseSensitiveFields: boolean
  pathAliases?: { [key: string]: string }
}
