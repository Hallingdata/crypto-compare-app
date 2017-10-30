import React from "react"
import { AppRegistry } from "react-native"
import { ApolloClient, ApolloProvider } from "react-apollo"
import { Text, View } from "react-native"

// Create the client as outlined above
const client = new ApolloClient()
export default () => (
  <View>
    <Text>Hello world!Asgeir.</Text>
    <Text>Asgeir 123</Text>
  </View>
)
