# Auto CDK

This project aims to provide a simple experience for building serverless applications with AWS [API Gateway](https://aws.amazon.com/api-gateway/) and [Lambda](https://aws.amazon.com/lambda/)

The api is largely inspired by [Vercel Now](https://github.com/vercel/vercel).

## Quickstart

```bash
yarn add auto-cdk
```

Create an `api` directory and add a file to it that exports a function named `handler`:

```bash
mkdir api && touch api/index.ts
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

Add a script to your `package.json`:

```json
{
  "scripts": {
    "dev": "auto-cdk dev"
  }
}
```

Run:

```bash
yarn dev
```

You should now see a folder named `dist` and a folder named `cdk.out` appear in your root directory.

Webpack is also running in watch mode, so any changes made to api/* will automatically be recompiled.

You can now run the api locally with [sam-cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html):

```bash
sam local start-api cdk.out/*.template.json
```

View examples [here](/docs/examples).
