import { expect } from 'chai'
import { parseField, IS_EMPTY_ALIAS } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { caseSensitiveFields: true }

describe('parseField', () => {
  it('should parse field', () => {
    const field = parseField('some.path : some value ', csOptions)
    expect(field).to.have.property('not', false)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
  it('should parse empty value', () => {
    const field = parseField(`some.path : ${IS_EMPTY_ALIAS} `, csOptions)
    expect(field).to.have.property('not', false)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', IS_EMPTY_ALIAS)
    expect(field).to.have.property('regex', null)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
  it('should respect aliases', () => {
    const options: ParseOptions = Object.assign({ pathAliases: { theField: 'some.path' } }, csOptions)
    const field = parseField('theField : some value ', options)
    expect(field).to.have.property('not', false)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('valueSelector').that.is.a('function')
    expect(field.valueSelector({ some: { path: 'expected' } }))
      .to.be.equal('expected')
    expect(field.valueSelector({ theField: 'not-expected' }))
      .to.be.equal('')
  })
  it('should parse field with missing alias', () => {
    const options: ParseOptions = Object.assign({ pathAliases: { theField: 'some.path' } }, csOptions)
    const field = parseField('field : some value ', options)
    expect(field).to.have.property('not', false)
    expect(field).to.have.property('path', 'field')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('valueSelector').that.is.a('function')
    expect(field.valueSelector({ field: 'expected' })).to.be.equal('expected')
  })
  it('should parse not', () => {
    const field = parseField('NOT some.path : some value ', csOptions)
    expect(field).to.have.property('not', true)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
})
