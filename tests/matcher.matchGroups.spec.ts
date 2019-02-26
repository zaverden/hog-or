import { expect } from 'chai'
import { matchGroups } from '../src/matcher'
import { parseGroups } from '../src/parser'

describe('matchAndGroup', () => {
  it('should match if some group is matched', () => {
    const field = parseGroups('a:there OR b:too')
    const matched = matchGroups(field, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.true
  })
  it('should not match if all groups are not matched', () => {
    const field = parseGroups('a:there OR b:too')
    const matched = matchGroups(field, { a: 'hello world', b: 'hello there again' })
    expect(matched).to.false
  })
})
