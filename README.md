# Simple GraphQL Client

This is a simple GraphQL client that can be used to query a GraphQL server. It is written in TypeScript and can be used in Deno, Node.js, Bun and the browser.

### Examples

###### Without variables
```typescript
import { GraphQLClient } from "@avalero/graphql-client";

const client = new GraphQLClient({
  url: "https://api.spacex.land/graphql",
});

const query = `
  query {
    launchesPast(limit: 5) {
      mission_name
      launch_date_local
    }
  }
`;

const data = await client.query(query);
```

###### With variables
```typescript
import { GraphQLClient } from "@avalero/graphql-client";

const client = new GraphQLClient({
  url: "https://api.spacex.land/graphql",
});

const query = `
  query LaunchesPast($limit: Int!) {
    launchesPast(limit: $limit) {
      mission_name
      launch_date_local
    }
  }
`;

const variables = {
  limit: 5,
};

const data = await client.query(query, {variables});
```

###### With headers
```typescript
import { GraphQLClient } from "@avalero/graphql-client";

const client = new GraphQLClient({
  url: "https://api.spacex.land/graphql",
  headers: {
    Authorization: "Bearer YOUR TOKEN",
  },
});

const query = `
  query {
    launchesPast(limit: 5) {
      mission_name
      launch_date_local
    }
  }
`;

const data = await client.query(query);
``` 

###### With headers and variables
```typescript
import { GraphQLClient } from "@avalero/graphql-client";

const client = new GraphQLClient({
  url: "https://api.spacex.land/graphql",
  headers: {
    Authorization: "Bearer YOUR TOKEN",
  },
});

const query = `
  query LaunchesPast($limit: Int!) {
    launchesPast(limit: $limit) {
      mission_name
      launch_date_local
    }
  }
`;

const variables = {
  limit: 5,
};

const customHeaders = {
  Authorization: "Bearer YOUR OTHER TOKEN",
};

const data = await client.query(query, {variables, headers: customHeaders});
``` 

