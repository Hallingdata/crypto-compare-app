import { SideBar } from './components/SideBar';
import * as Expo from 'expo';
import { Text } from "native-base"
import * as React from 'react';
import { StackNavigator } from "react-navigation"

import { CoinScreen } from "./components/CoinScreen"
import { HomeScreen } from "./components/HomeScreen"
import { DrawerNavigator } from "react-navigation";

const Content = DrawerNavigator({
  Home: { screen: HomeScreen },
  Coin: { screen: CoinScreen },
}
)

export class App extends React.Component<{}, { isReady: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    })
    this.setState({
      isReady: true,
    })
  }
  render() {
    return this.state.isReady ? (
      <Content style={{ marginTop: Expo.Constants.statusBarHeight }} />
    ) : (
      <Text>Wait...</Text>
    )
  }
}
