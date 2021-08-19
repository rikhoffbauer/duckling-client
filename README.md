# duckling-client

A client for [duckling](https://github.com/facebook/duckling).

## Installation

```shell
# using npm
npm i duckling-client

# using yarn
yarn add duckling-client

# using pnpm
pnpm i duckling-client
```

## Usage

```typescript
import { DucklingClient } from "duckling-client";

const client = new DucklingClient({
    endpoint: "http://0.0.0.0:8000",
    locale: "nl_NL",
    dims: ["volume"],
});

const result = await client.parse("3ml ghb");

```

This gives the `result` variable a value that looks something like following:

```json
[
    {
        "body": "3ml",
        "start": 1,
        "value": {
            "value": 3,
            "type": "value",
            "unit": "millilitre"
        },
        "end": 4,
        "dim": "volume",
        "latent": false
    }
]
```
