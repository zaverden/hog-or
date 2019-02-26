# `hog-or` - primitive query parser and matcher

## Installation

```bash
npm install --save hog-or
# OR
yarn add hog-or
```

## What can I do with it?

- You can write a field filter as `path.to.field: value` and it will match objects where string in `path.to.field` contains `value`
- You can combine field filters by `AND` and `OR` (with standard operations order)
- You can use `!@` as empty value alias, like `path.to.field: !@` matches if `path.to.field` is empty (`null`, `undefined`, empty string, empty array)
- You can have an object with array fields and it will be matched (see [How to use](#how-to-use))

## Lower your expectations

- `hog-or` creates `RegExp` to match, and `hog-or` does not encode input values (https://github.com/zerobasedjs/hog-or/issues/1)
- you can't escape empty value alias
- `hog-or` does not support parentheses to change operations order
- `hog-or` does not support `Set` and `Map`
- Everything that is not a string will be converted to string by `${value}`

## How to use `hog-or`

```typescript
import parseQuery from 'hog-or'

// we want to match objects where
// org.name contains 'google'
// OR
// list of tags includes tags with 'goo' and 'mind'
const query = parseQuery('org.name: google OR meta.tags.name: goo AND meta.tags.name: mind')
query.match({
  org: {
    name: 'Alphabet Inc.'
  },
  meta: {
    tags: [{ name: 'DeepMind' }, { name: 'Google' }] // yeah, nested array of objects
  }
}) // true, matched by tags

query.filter(listOfCompanies) // it returns IterableIterator
query.filterToArray(listOfCompanies) // it returns Array
```


## For developers

### Prerequisites

You need `yarn` at least `v1.12.3`. Well, you can use `npm` too, but all scripts bellow are for `yarn`.

### Available scripts

```bash
# install dependencies
yarn

# run tests
yarn test

# run linter (with fix)
yarn lint

# build JS and type definitions
yarn build
```

### VS code launch configuration
You may want to debug tests. Following launch configuration for VS code makes it possible

```json
{
  "type": "node",
  "request": "launch",
  "name": "Mocha All",
  "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
  "args": [
    "-r",
    "ts-node/register",
    "--timeout",
    "999999",
    "--colors",
    "${workspaceFolder}/tests/**/*.spec.ts",
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "protocol": "inspector"
}
```
