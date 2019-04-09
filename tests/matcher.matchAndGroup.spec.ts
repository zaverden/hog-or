import { expect } from 'chai'
import { matchAndGroup } from '../src/matcher'
import { parseAndGroup } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { caseSensitiveFields: true }

describe('matchAndGroup', () => {
  it('should match if all fields are matched', () => {
    const andGroup = parseAndGroup('a:there AND b:too', csOptions)
    const matched = matchAndGroup(andGroup, { a: 'hello there', b: 'hello there too' })
    expect(matched).to.true
  })
  it('should not match if some field is not matched', () => {
    const andGroup = parseAndGroup('a:there AND b:too', csOptions)
    const matched = matchAndGroup(andGroup, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.false
  })
  it('should match with NOT respect', () => {
    const andGroup = parseAndGroup('a:there AND NOT b:too', csOptions)
    const matched = matchAndGroup(andGroup, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.true
  })
  it('should match same field with NOT respect', () => {
    const andGroup = parseAndGroup('status: error AND NOT status: unknown', csOptions)
    const matched1 = matchAndGroup(andGroup, { status: 'error/timeout' })
    const matched2 = matchAndGroup(andGroup, { status: 'error/unknown' })
    expect(matched1).to.true
    expect(matched2).to.false
  })
})
