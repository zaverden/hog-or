import { expect } from 'chai'
import { buildValueSelector, ARRAY_ITEMS_DELIMITER } from '../src/parser'

describe('buildValueSelector', () => {
  it('should return string value', () => {
    const selector = buildValueSelector('a')
    const obj = { a: 'value' }
    const value = selector(obj)
    expect(value).to.be.equal('value')
  })
  it('should return string value deep', () => {
    const selector = buildValueSelector('a.b.c.d')
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
  it('should handle strings array', () => {
    const selector = buildValueSelector('a.b.c.d')
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
  it('should handle objects array', () => {
    const selector = buildValueSelector('a.b.c.d')
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
  it('should handle nested objects array', () => {
    const selector = buildValueSelector('a.b.c.d')
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
  it('should handle undefined', () => {
    const selector = buildValueSelector('a.b.c.d')
    const obj = {
      a: {
        b: {},
      },
    }
    const value = selector(obj)
    expect(value).to.be.empty.string
  })
  it('should handle null', () => {
    const selector = buildValueSelector('a.b.c.d')
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
  it('should convert number to string', () => {
    const selector = buildValueSelector('a.b')
    const obj = {
      a: {
        b: 1,
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`${1}`)
  })
  it('should convert boolean to string', () => {
    const selector = buildValueSelector('a.b')
    const obj = {
      a: {
        b: true,
      },
    }
    const value = selector(obj)
    expect(value).to.be.equal(`${true}`)
  })
  it('should convert date to string', () => {
    const selector = buildValueSelector('a.b')
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
    const selector = buildValueSelector('a.b')
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
    const selector = buildValueSelector('a.b.c')
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
    const selector = buildValueSelector('a.b.c.d')
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
})
