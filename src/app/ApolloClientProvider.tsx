"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

// Initialize the Apollo Client with a REST link and in-memory cache
const client = new ApolloClient({
  link: new RestLink({
    endpoints: {
      v1: "https://restcountries.com/v3.1/", // Endpoint for general country data
      v2: "https://restcountries.com/v3.1/name/", // Endpoint for country data by name
    },
  }),
  cache: new InMemoryCache(), // Use an in-memory cache for caching query results
});

// ApolloClientProvider component wraps the application with the ApolloProvider
// This ensures that the Apollo Client is available throughout the React component tree
export default function ApolloClientProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
