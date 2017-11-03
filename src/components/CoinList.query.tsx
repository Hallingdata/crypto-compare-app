import { Container, Content, Header, List } from "native-base"
import * as React from "react"
import * as R from "ramda"

import { schema } from "../graphql/cryptoCompare.schema"
import { GraphqlHOC } from "./Graphql.hoc"
import { CoinListRow } from "./CoinListRow"
import * as io from "socket.io-client"

const listenForUpdates = false
const coinsQuery = `
{ 
  coins(limit: 100) {
    Name
    long
    cap24hrChange
    mktcap
    ImageUrl
    price
 }
}`

type Props = {
  navigate: any
  data: {
    coins: Array<Coin>
  }
}

type State = {
  coins: Array<Coin>
}

class coinListRaw extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      coins: props.data.coins,
    }
  }

  async componentWillMount() {
    if (listenForUpdates) {
      const socket = io.connect("http://socket.coincap.io")
      socket.on("trades", (tradeMsg: SocketCoinMsg) => {
        this.setState({
          coins: R.map((coin: Coin) => {
            if (coin.Name === tradeMsg.coin) {
              return R.merge(
                {
                  ...coin,
                },
                {
                  ...tradeMsg.msg,
                }
              )
            } else {
              return coin
            }
          }, this.state.coins),
        })
      })
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.state.coins}
            renderRow={coin => <CoinListRow coin={coin} navigate={this.props.navigate} />}
          />
        </Content>
      </Container>
    )
  }
}

export const CoinList = GraphqlHOC(coinListRaw, schema, coinsQuery)
