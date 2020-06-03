# Auto CDK

This project aims to provide a simple experience for building serverless applications with AWS [API Gateway]() and [Lambda]().

## Quickstart

```bash
yarn add auto-cdk
```

Create an `api` directory and add a file to it that exports a function:

```bash
mkdir api && touch api/index.js
```

```js
// api/index.js

module.exports = (event, ctx) => {
  return {
    statusCode: 200,
    body: 'hello world',
    headers: {
      'Content-Type': 'text/html'
    }
  }
}
```

```json
{
  "scripts": {
    "dev": "auto-cdk"
  }
}
```