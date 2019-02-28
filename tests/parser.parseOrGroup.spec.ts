import { expect } from 'chai'
import { parseOrGroup } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { pathAliases: null, caseSensitiveFields: true }

describe('parseOrGroup', () => {
  it('should parse single field', () => {
    const group = parseOrGroup('some.path : some value ', csOptions)
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single AND group', () => {
    const group = parseOrGroup('some.path : some value AND another.path : another value ', csOptions)
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse several AND groups', () => {
    const group = parseOrGroup(
      'some.path : some value AND another.path : another value OR some.path : another value',
      csOptions,
    )
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(2)
  })
})
