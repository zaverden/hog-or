import { OrGroup } from './types'
import { parseOrGroup } from './parser'
import { matchOrGroup } from './matcher'

export default class Query {
  constructor(public orGroup: OrGroup) { }

  public static parse(queryStr: string): Query {
    return new Query(parseOrGroup(queryStr))
  }

  public match<T>(obj: T): boolean {
    return matchOrGroup(this.orGroup, obj)
  }

  public filterToArray<T>(iterableIterator: IterableIterator<T>): T[]
  public filterToArray<T>(iterable: Iterable<T>): T[]
  public filterToArray<T>(iterator: Iterator<T>): T[]
  public filterToArray<T>(iterableOrIterator: IterableIterator<T> | Iterable<T> | Iterator<T>): T[] {
    return Array.from(this.filter(iterableOrIterator as  IterableIterator<T>))
  }

  public filter<T>(iterableIterator: IterableIterator<T>): IterableIterator<T>
  public filter<T>(iterable: Iterable<T>): IterableIterator<T>
  public filter<T>(iterator: Iterator<T>): IterableIterator<T>
  public *filter<T>(iterableOrIterator: IterableIterator<T> | Iterable<T> | Iterator<T>): IterableIterator<T> {
    const iterator = this.extractIterator(iterableOrIterator)
    let step = iterator.next()
    while (!step.done) {
      if (this.match(step.value)) {
        yield step.value
      }
      step = iterator.next()
    }
  }

  private extractIterator<T>(iterableOrIterator: IterableIterator<T> | Iterable<T> | Iterator<T>): Iterator<T> {
    const iteratorGetter = (iterableOrIterator as Iterable<T> | IterableIterator<T>)[Symbol.iterator]
    return iteratorGetter === undefined ? iterableOrIterator as Iterator<T> : iteratorGetter.call(iterableOrIterator)
  }
}
