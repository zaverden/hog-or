import { expect } from 'chai'
import {
  parseField, parseAndGroup, parseQuery, buildValueSelector,
  IS_EMPTY_ALIAS, ARRAY_ITEMS_DELIMITER,
} from '../src/parser'

describe('parseField', () => {
  it('should parse field', () => {
    const field = parseField('some.path : some value ')
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', 'some value')
    expect(field).to.have.property('regex').that.is.an.instanceOf(RegExp)
    expect(field).to.have.property('isEmpty', false)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
  it('should parse empty value', () => {
    const field = parseField(`some.path : ${IS_EMPTY_ALIAS} `)
    expect(field).to.have.property('path', 'some.path')
    expect(field).to.have.property('value', IS_EMPTY_ALIAS)
    expect(field).to.have.property('regex', null)
    expect(field).to.have.property('isEmpty', true)
    expect(field).to.have.property('valueSelector').that.is.a('function')
  })
})

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

describe('parseAndGroup', () => {
  it('should parse single field', () => {
    const group = parseQuery('some.path : some value ')
    expect(group).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single and group', () => {
    const group = parseQuery('some.path : some value AND another.path : another value ')
    expect(group).to.be.an.instanceOf(Array).that.has.length(1)
  })
  it('should parse single and group', () => {
    const group = parseQuery('some.path : some value AND another.path : another value OR some.path : another value')
    expect(group).to.be.an.instanceOf(Array).that.has.length(2)
  })
})

describe('buildValueSelector', () => {
  it('should return string value', () => {
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
        b: { },
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
})
