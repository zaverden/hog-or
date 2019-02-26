import { expect } from 'chai'
import { parseGroups } from '../src/parser'

describe('parseGroups', () => {
  it('should parse single field', () => {
    const group = parseGroups('some.path : some value ')
    expect(group).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single and group', () => {
    const group = parseGroups('some.path : some value AND another.path : another value ')
    expect(group).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single and group', () => {
    const group = parseGroups('some.path : some value AND another.path : another value OR some.path : another value')
    expect(group).to.be.an.instanceOf(Array).that.has.length(2)
  })
})
