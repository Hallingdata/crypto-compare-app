import * as React from "react"
import { AppRegistry } from "react-native"
import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-client"
import { Text, View } from "react-native"

import { graphql } from "graphql"
import { schema } from "./graphql/coinList"

const query = `
{ 
  coin (id: 1182)  { 
    Name
 } 
}`

graphql(schema, query).then(console.log)

// Create the client as outlined above
//const client = new ApolloClient({})
export const App = () => (
  <View>
    <Text>Hello world! Asgeir</Text>
    <Text>Asgeir 123</Text>
    <Text>Asgeir 123</Text>
    <Text>Asgeir 123</Text>
    <Text>Asgeir 123</Text>
  </View>
)
