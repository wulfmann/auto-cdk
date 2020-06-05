# Contributing

## Requirements

* Node.js
* Yarn.js

### Install Dependencies

```bash
yarn install
```

## Tests

### Running Tests

```bash
yarn test
```

## Testing Locally

Clone this project and run `yarn link` to register it.

In a new project add `auto-cdk` as a dependency:

```bash
yarn add auto-cdk
```

and then run the following to link it to your local copy:

```bash
yarn link auto-cdk
```

Now over in your local copy of this project you can run `yarn watch` to enable typescript auto-compile and you can make changes and see them reflect over in your test project.
