import { Container, Content, Header, List, ListItem, Text } from "native-base"
import * as R from "ramda"
import * as React from "react"

import { schema } from "../data/cryptoCompare.schema"
import { GraphqlHOC } from "../data/Graphql.HOC"

const coinsQuery = `
{ 
  coins { 
    CoinName
    Id
 }
}`

const coinListRaw = ({ data }: { data: { coins: Array<Coin> } }) => (
  <Container>
    <Header />
    <Content>
      <List>
        {R.map(coin => {
          return (
            <ListItem key={coin.Id}>
              <Text>{coin.CoinName}</Text>
            </ListItem>
          )
        }, data.coins)}
      </List>
    </Content>
  </Container>
)

export const CoinList = GraphqlHOC(coinListRaw, schema, coinsQuery)

type Coin = {
  CoinName: string
  Id: number
}
