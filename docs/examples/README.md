# Example API with auto-cdk

This example has a simple api in the `api` directory and a dependency on `auto-cdk`.

You can start the webpack compiler in watch mode by running: `yarn dev`.

You can build for production with: `yarn build`.

If you have [sam-cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) you can run `yarn dev & yarn sam` to start both in watch mode and get live reload for the api running on localhost.
