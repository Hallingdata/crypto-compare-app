import * as Expo from "expo"
import { Button, Container, Icon, Text } from "native-base"
import * as React from "react"
import { Component } from "react"
import { NavigationScreenProp } from "react-navigation"

import { CoinList } from "./CoinList.query"

type Props = { navigation: NavigationScreenProp<any, any> }
type State = { activeFab: boolean }

export const HomeScreen: React.StatelessComponent<Props> = ({ navigation }) => {
  const { navigate } = navigation
  return (
    <Container>
      <CoinList navigate={navigate}/>
      <Button iconRight light onPress={() => navigate("Coin", { name: "Asgeir"})}>
        <Text>Next</Text>
      </Button>
    </Container>
  )
}
