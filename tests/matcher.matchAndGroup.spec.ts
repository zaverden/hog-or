import { expect } from 'chai'
import { matchAndGroup } from '../src/matcher'
import { parseAndGroup } from '../src/parser'

describe('matchAndGroup', () => {
  it('should match if all fields are matched', () => {
    const field = parseAndGroup('a:there AND b:too')
    const matched = matchAndGroup(field, { a: 'hello there', b: 'hello there too' })
    expect(matched).to.true
  })
  it('should not match if some field is not matched', () => {
    const field = parseAndGroup('a:there AND b:too')
    const matched = matchAndGroup(field, { a: 'hello there', b: 'hello there again' })
    expect(matched).to.false
  })
})
