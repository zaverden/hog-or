import { expect } from 'chai'
import { parseField, IS_EMPTY_ALIAS } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { pathAliases: null, caseSensitiveFields: true }

describe('parseField', () => {
  it('should parse field', () => {
    const field = parseField('some.path : some value ', csOptions)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
  it('should parse empty value', () => {
    const field = parseField(`some.path : ${IS_EMPTY_ALIAS} `, csOptions)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', IS_EMPTY_ALIAS)
    expect(field).to.have.property('regex', null)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
})
