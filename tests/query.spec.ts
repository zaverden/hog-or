import { expect } from 'chai'
import Query from '../src/query'

describe('Query', () => {
  it('should filter to IterableIterator', () => {
    const query = Query.parse('a:there AND b:too')
    const obj1 = { a: 'hello there', b: 'hello there too' }
    const obj2 = { a: 'hello there', b: 'hello there again' }
    const iterableIterator = query.filter([obj1, obj2])
    expect(iterableIterator[Symbol.iterator]).to.be.a('function')
    expect(iterableIterator.next).to.be.a('function')
    expect(iterableIterator.next()).to.be.deep.equal({ done: false, value: obj1 })
    expect(iterableIterator.next()).to.be.deep.equal({ done: true, value: undefined })
  })
  it('should filter to array', () => {
    const query = Query.parse('a:there AND b:too')
    const obj1 = { a: 'hello there', b: 'hello there too' }
    const obj2 = { a: 'hello there', b: 'hello there again' }
    const array = query.filterToArray([obj1, obj2])
    expect(array).to.be.an.instanceOf(Array)
    expect(array).to.have.lengthOf(1)
    expect(array[0]).to.be.equal(obj1)
  })
})
