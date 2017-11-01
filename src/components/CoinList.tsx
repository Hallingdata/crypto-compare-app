import {
  Container,
  Content,
  Header,
  List,
  ListItem,
  Text,
  Right,
  Left,
  Body,
  Badge,
  Thumbnail,
} from "native-base"
import { Image, View } from "react-native"
import * as R from "ramda"
import * as React from "react"

import { schema } from "../data/cryptoCompare.schema"
import { GraphqlHOC } from "../data/Graphql.HOC"
import { RefreshControl } from "react-native"

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

const coinListRaw = ({ data }: { data: { coins: Array<Coin> } }) => (
  <Container>
    <Header />
    <Content>
      <List>
        {R.map(coin => {
          return (
            <ListItem key={coin.long + coin.mktcap}>
              <Left style={{flexGrow: 2}}>
                <Thumbnail
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: "https://www.cryptocompare.com" + coin.ImageUrl,
                  }}
                />
                <Text>{coin.long} </Text>
              </Left>
              <Body style={{flexGrow: 1}}>
                {coin.cap24hrChange >= 0 ? (
                  <Badge
                    style={{
                      backgroundColor: `rgba(115,181,102,${coin.cap24hrChange *
                        4 /
                        100})`,
                    }}
                  >
                    <Text style={{ color: "black" }}>
                      + {coin.cap24hrChange}%
                    </Text>
                  </Badge>
                ) : (
                  <Badge
                    style={{
                      backgroundColor: `rgba(218,59,51,${coin.cap24hrChange *
                        -4 /
                        100})`,
                    }}
                  >
                    <Text style={{ color: "black" }}>
                      {coin.cap24hrChange}%
                    </Text>
                  </Badge>
                )}
              </Body>
              <Right style={{flexGrow: 1}}>
                <Text>${coin.price}</Text>
              </Right>
            </ListItem>
          )
        }, data.coins)}
      </List>
    </Content>
  </Container>
)

export const CoinList = GraphqlHOC(coinListRaw, schema, coinsQuery)

type Coin = {
  long: string
  cap24hrChange: number
  mktcap: number
  Name: string
  ImageUrl: string
  price: string
}
