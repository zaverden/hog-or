import { expect } from 'chai'
import { matchOrGroup } from '../src/matcher'
import { parseOrGroup } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { pathAliases: null, caseSensitiveFields: true }

describe('matchOrGroup', () => {
  it('should match if some group is matched', () => {
    const field = parseOrGroup('a:there OR b:too', csOptions)
    const matched = matchOrGroup(field, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.true
  })
  it('should not match if all groups are not matched', () => {
    const field = parseOrGroup('a:there OR b:too', csOptions)
    const matched = matchOrGroup(field, { a: 'hello world', b: 'hello there again' })
    expect(matched).to.false
  })
})
