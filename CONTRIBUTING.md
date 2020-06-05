# Contributing

Thank you for your interest in contributing!

The below document describes how to build and test the project and submit your contributions.

* [Getting Started](#getting-started)
* [Pull Requests](#pull-requests)
* [Tools](#tools)
* [Troubleshooting](#troubleshooting)

## <a id="getting-started"></a>Getting Started

The basic commands to get the repository cloned and built locally follow:

```bash
$ git clone https://github.com/wulfmann/auto-cdk.git
$ cd auto-cdk
$ yarn install
$ yarn build
```

### Linking

Since a lot of the functionality depends on the filesystem structure, it's usually easier to [link the project](https://classic.yarnpkg.com/en/docs/cli/link/)locally so that you can iterate while using it in a spearate place.

You can do this by running:

```bash
$ yarn link
```

Now you can create a separate node project somewhere else by running the following in a new directory and following the prompts:

```bash
$ yarn init
$ yarn add auto-cdk
$ yarn link auto-cdk
```

Now changes you make to `auto-cdk` will reflect in the new project. It is recommended that you run `auto-cdk` in [watch mode](#watch-mode) while developing.

To unlink later you can run:

```bash
$ yarn unlink auto-cdk
```

### <a id="watch-mode"></a>Watching

You can enable live-compiling by running:

```bash
$ yarn watch
```

## <a id="pull-requests"></a>Pull Requests

### Open Issue

### Add your Changss

### Tests

### Commit

### Pull Request

### Merge

## <a id="tools"></a>Tools

This section describes some of the tools this project uses for building, testing and maintaining code quality.

### Linting

This project uses [TSLint](https://palantir.github.io/tslint/) for code linting.

To check if any files have bad formatting run:

```bash
$ yarn lint
```

To auto-fix linting issues (ones that can anyways) run:

```bash
$ yarn lint --fix
```

### Formatting

This project uses [Prettier](https://prettier.io) for code formatting.

To check if any files have bad formatting run:

```bash
$ yarn format --check
```

To allow the formatter to modify files run:

```bash
$ yarn format --write
```

### Testing

This project uses [Jest](https://jestjs.io) for testing.

To run the tests, run the following:

```bash
$ yarn test
```

## <a id="troubleshooting"></a>Troubleshooting

Ensure that you can reproduce your issue after doing a complete rebuild:

```bash
$ git clean -fqdx .
$ yarn build
```
