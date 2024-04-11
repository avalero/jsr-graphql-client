type ConstructorParamsType = {
  headers?: Record<string, string>;
};

/**
 * A simple GraphQL client that sends queries to a GraphQL server.
 * @module GraphQLClient
 * @class GraphQLClient
 * @constructor - Creates a new GraphQL client.
 * @param {string} url - The URL of the GraphQL server.
 * @param {Record<string, string>} headers - The headers to send with the request.
 * @method query - Sends a query to the GraphQL server.
 * @example ```typescript
 * const client = new GraphQLClient("https://api.example.com/graphql");
 * const data = await client.query<{ user: { name: string } }, { id: string }>(
 *  `query GetUser($id: ID!) {
 *   user(id: $id) {
 *    name
 *    }
 *   }`,
 * {
 *   variables: { id: "1" },
 *   headers: {
 *      Authorization: "Bearer token"
 *   }
 * });
 * ```
 *
 */
export class GraphQLClient {
  private _url: string;
  private _headers: Record<string, string> = {};
  constructor(url: string, params: ConstructorParamsType = {}) {
    this._url = url;
    this._headers = params.headers || {};
  }

  private async _doFetch<VarsType>(
    query: string,
    variables: VarsType,
    headers: Record<string, string>
  ) {
    const response = await fetch(this._url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    });
    return response;
  }

  /**
   * Queries the GraphQL server.
   * @method query
   * @template DataType - The type of the data returned by the server.
   * @template VarsType - The type of the variables to send with the query.
   * @param query  The query to send to the server.
   * @param variables  The variables to send with the query.
   * @param headers  The headers to send with the request. (they will be added to the default headers and override them if they have the same key)
   * @returns  The data returned by the server.
   */
  public async query<DataType, VarsType>(
    query: string,
    params: {
      variables: VarsType;
      headers: Record<string, string>;
    }
  ): Promise<DataType> {
    const response = await this._doFetch(query, params.variables, {
      ...this._headers,
      ...params.headers,
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data: " + response.statusText);
    }
    const data = await response.json();
    return data.data;
  }
}
