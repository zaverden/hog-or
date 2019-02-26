export type ValueSelector = (obj: any) => string

export interface QueryField {
  path: string
  value: string
  regex: RegExp | null
  isEmpty: boolean
  valueSelector: ValueSelector
}

export interface AndGroup {
  fields: QueryField[]
}

export interface Query {
  match(obj: any): boolean
  andGroups: AndGroup[]
}
