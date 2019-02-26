import { expect } from 'chai'
import { parseOrGroup } from '../src/parser'

describe('parseOrGroup', () => {
  it('should parse single field', () => {
    const group = parseOrGroup('some.path : some value ')
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single AND group', () => {
    const group = parseOrGroup('some.path : some value AND another.path : another value ')
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse several AND groups', () => {
    const group = parseOrGroup('some.path : some value AND another.path : another value OR some.path : another value')
    expect(group.andGroups).to.be.an.instanceOf(Array).that.has.length(2)
  })
})
