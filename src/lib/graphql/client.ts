import { GraphQLClient } from "graphql-request";

const GRAPHQL_API_URL = "http://localhost:3000/api/graphql";

export const graphqlClient = new GraphQLClient(GRAPHQL_API_URL);
