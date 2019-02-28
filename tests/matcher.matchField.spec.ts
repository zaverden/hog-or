import { expect } from 'chai'
import { matchField } from '../src/matcher'
import { parseField, IS_EMPTY_ALIAS } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { pathAliases: null, caseSensitiveFields: true }

describe('matchField', () => {
  it('should match string by contains', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { a: 'hello there' })
    expect(matched).to.true
  })
  it('should match string by contains case insensitive', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { a: 'hello ThErE' })
    expect(matched).to.true
  })
  it('should match array', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { a: ['hello', 'there'] })
    expect(matched).to.true
  })
  it('should match empty string', () => {
    const field = parseField(`a:${IS_EMPTY_ALIAS}`, csOptions)
    const matched = matchField(field, { a: '' })
    expect(matched).to.true
  })
  it('should match undefined', () => {
    const field = parseField(`a:${IS_EMPTY_ALIAS}`, csOptions)
    const matched = matchField(field, { })
    expect(matched).to.true
  })
  it('should not match wrong string', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { a: 'hello world' })
    expect(matched).to.false
  })
  it('should not match empty string', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { a: '' })
    expect(matched).to.false
  })
  it('should not match undefined', () => {
    const field = parseField('a:there', csOptions)
    const matched = matchField(field, { })
    expect(matched).to.false
  })
  it.skip('should correctly escape input value for regex', () => {
    // TODO: it fails https://github.com/zerobasedjs/hog-or/issues/1
    const field = parseField('a:.*', csOptions)
    const matched = matchField(field, { a: 'some value' })
    expect(matched).to.false
  })
})
