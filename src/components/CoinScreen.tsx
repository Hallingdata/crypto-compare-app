import * as Expo from "expo"
import * as React from "react"
import { Container, Text } from "native-base"

import { CoinList } from "./CoinList.query"
import { View } from "react-native"
import { NavigationScreenProp } from "react-navigation"

type Props = { navigation: NavigationScreenProp<any, any> }
type State = {}

export const CoinScreen: React.StatelessComponent<Props> = ({ navigation }) => (
  <Text>Coin! {navigation.state.params.name}</Text>
)
