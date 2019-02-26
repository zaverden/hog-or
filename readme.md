# `hog-or` - primitive query parser and matcher

## Installation

```bash
npm install --save hog-or
# OR
yarn add hog-or
```

## Overview


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
