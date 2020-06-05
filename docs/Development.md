# Development

## Docker

[Docker](https://www.docker.com/)

## AWS sam-cli

`auto-cdk` relies on [sam-cli](https://github.com/awslabs/aws-sam-cli) to enable local execution of the api gateway / lambda.

If you leave the default lambda runtime you must have sam-cli >= [0.32.0](https://github.com/awslabs/aws-sam-cli/releases/tag/v0.32.0). If you don't you may encounter this issue:

```bash
ValueError: Unsupported Lambda runtime nodejs12.x
```

[Related Issue](https://github.com/awslabs/aws-sam-cli/issues/1564).
