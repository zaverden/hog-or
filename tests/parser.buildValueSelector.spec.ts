import { expect } from 'chai'
import { buildValueSelector, ARRAY_ITEMS_DELIMITER } from '../src/parser'
import { ParseOptions } from '../src/types'

const csOptions: ParseOptions = { caseSensitiveFields: true }
const ciOptions: ParseOptions = { caseSensitiveFields: false }

describe('buildValueSelector', () => {
  it('should return string value [CS]', () => {
    const selector = buildValueSelector('a', csOptions)
    const obj = { a: 'value' }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should return string value deep [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: {
          c: {
            d: 'value',
          },
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should handle strings array [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: {
          c: {
            d: ['value1', 'value2'],
          },
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`value1${ARRAY_ITEMS_DELIMITER}value2`)
  })
  it('should handle objects array [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: {
          c: [
            { d: 'value1' },
            { d: 'value2' },
          ],
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`value1${ARRAY_ITEMS_DELIMITER}value2`)
  })
  it('should handle nested objects array [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: [{
          c: [
            { d: 'value1' },
            { d: 'value2' },
          ],
        }, {
          c: [
            { d: 'value3' },
            { d: 'value4' },
          ],
        }],
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(
      `value1${ARRAY_ITEMS_DELIMITER}value2${ARRAY_ITEMS_DELIMITER}value3${ARRAY_ITEMS_DELIMITER}value4`,
    )
  })
  it('should handle undefined [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: {},
      },
    }
    const value = selector(obj)
    expect(value).to.be.empty.string
  })
  it('should handle null [CS]', () => {
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: {
          c: null,
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.empty.string
  })
  it('should convert number to string [CS]', () => {
    const selector = buildValueSelector('a.b', csOptions)
    const obj = {
      a: {
        b: 1,
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`${1}`)
  })
  it('should convert boolean to string [CS]', () => {
    const selector = buildValueSelector('a.b', csOptions)
    const obj = {
      a: {
        b: true,
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`${true}`)
  })
  it('should convert date to string [CS]', () => {
    const selector = buildValueSelector('a.b', csOptions)
    const date = new Date()
    const obj = {
      a: {
        b: date,
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`${date}`)
  })
  it.skip('should handle Set as array (end)', () => {
    // TODO: AssertionError: expected '[object Set]' to equal 'value1~value2'
    const selector = buildValueSelector('a.b', csOptions)
    const obj = {
      a: {
        b: new Set(['value1', 'value2']),
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`value1${ARRAY_ITEMS_DELIMITER}value2`)
  })
  it.skip('should handle Set as array (middle)', () => {
    // TODO: AssertionError: expected '' to equal 'value'
    const selector = buildValueSelector('a.b.c', csOptions)
    const obj = {
      a: {
        b: new Set([{ c: 'value' }]),
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it.skip('should handle Map as object', () => {
    // TODO: AssertionError: expected '' to equal 'value'
    const selector = buildValueSelector('a.b.c.d', csOptions)
    const obj = {
      a: {
        b: new Map([
          ['c', { d: 'value' }],
        ]),
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  // #region options.caseSensitiveFields = false
  it('should return string value [CI]', () => {
    const selector = buildValueSelector('A', ciOptions)
    const obj = { a: 'value' }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should return string value deep [CI]', () => {
    const selector = buildValueSelector('A.B.C.D', ciOptions)
    const obj = {
      a: {
        b: {
          c: {
            d: 'value',
          },
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should return string value [CI2]', () => {
    const selector = buildValueSelector('a', ciOptions)
    const obj = { A: 'value' }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should return string value deep [CI2]', () => {
    const selector = buildValueSelector('a.b.c.d', ciOptions)
    const obj = {
      A: {
        b: {
          c: {
            d: 'value',
          },
        },
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  // #endregion options.caseSensitiveFields = false
})
