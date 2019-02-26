import { expect } from 'chai'
import { parseAndGroup } from '../src/parser'

describe('parseAndGroup', () => {
  it('should parse single field', () => {
    const group = parseAndGroup('some.path : some value ')
    expect(group.fields).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse several field', () => {
    const group = parseAndGroup('some.path : some value AND another.path : another value ')
    expect(group.fields).to.be.an.instanceOf(Array).that.has.length(2)
  })
})
