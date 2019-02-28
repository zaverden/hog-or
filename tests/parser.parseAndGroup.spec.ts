import { expect } from 'chai'
import { parseAndGroup } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { pathAliases: null, caseSensitiveFields: true }

describe('parseAndGroup', () => {
  it('should parse single field', () => {
    const group = parseAndGroup('some.path : some value ', csOptions)
    expect(group.fields).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse several field', () => {
    const group = parseAndGroup('some.path : some value AND another.path : another value ', csOptions)
    expect(group.fields).to.be.an.instanceOf(Array).that.has.length(2)
  })
})
