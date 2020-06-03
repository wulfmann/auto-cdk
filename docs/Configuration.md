# Auto CDK Configuration

## BYOAS

You can bring your own CDK app and/or stack by passing it into `auto-cdk`.

```typescript
import * as cdk from 'aws-cdk';
import * as autocdk from 'auto-cdk';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'Stack');

autocdk({ app, stack });
```

## `autocdk.json`

### Available Options

name