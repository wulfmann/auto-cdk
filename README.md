# Auto CDK

`auto-cdk` lets you generate an api gateway with lambda integrations based on the filesystem. It makes use of [AWS CDK](https://aws.amazon.com/cdk/) to generate cloudformation stacks, and [Webpack](https://webpack.js.org) for bundling and code-splitting.

**Caveats**

Currently this project only aims to build and package node/typescript-based integrations. It is on the roadmap to support more, but will not be available until a later version.

## Quickstart

```bash
yarn add auto-cdk
```

Create an `api` directory and add a file to it that exports a function named `handler`:

```bash
$ mkdir api && touch api/index.ts
```

```js
// api/index.ts

exports.handler = (event, ctx) => {
  return {
    statusCode: 200,
    body: 'hello world',
    headers: {
      'Content-Type': 'text/html'
    }
  }
}
```

Run:

```bash
$ yarn dev
```

You should now have webpack auto-compiling when your source changes, and a cdk stack that has been generated in `cdk.out`.

### Bonus

If you install [AWS sam-cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html), you can run the api on localhost with the following:

```bash
$ sam local start-api cdk.out/*.template.json
```

View more examples [here](/docs/examples).

## Features

* Automatic CDK Stack Generation
* Code-Splitting and Bundling with Webpack
* Out of the box typescript support

## Contributing

If you would like to make a contribution or learn more about running this project locally, please review the [Contributing Documentation](/CONTRIBUTING.md).