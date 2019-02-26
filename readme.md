# `hog-or` - primitive query parser and matcher

## Installation

```bash
npm install --save hog-or
# OR
yarn add hog-or
```

## What it can

You can write a field filter

## How to use

```typescript
import parseQuery from 'hog-or'

// we want to match objects where
// org.name contains 'google'
// OR
// list of tags includes tags with 'goo' and 'mind'
const query = parseQuery('org.name: google OR tags: goo AND tags: mind')
query.match({
  org: {
    name: 'Alphabet Inc.'
  },
  tags: ['DeepMind', 'Google']
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
