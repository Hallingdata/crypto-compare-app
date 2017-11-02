import * as Expo from "expo"
import * as React from "react"
import { Component } from "react"
import { Container } from "native-base"

import { CoinList } from "./components/CoinList.query"
import { View } from "react-native"

type Props = {}
type State = {}

export class App extends React.Component<Props, State> {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    })
  }
  render() {
    return (
      <Container style={{ marginTop: Expo.Constants.statusBarHeight }}>
        <CoinList />
      </Container>
    )
  }
}
