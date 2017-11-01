import * as React from "react"
import { FlatList, Text } from "react-native"

import { schema } from "../data/cryptoCompare.schema"
import { GraphqlHOC } from "../data/Graphql.HOC"

const coinsQuery = `
{ 
  coins { 
    Name
    Id
 }
}`

const coinListRaw = ({ data }: { data: CoinsQuery }) => (
  <FlatList
    data={data.coins}
    keyExtractor={item => item.Id}
    renderItem={({ item }: { item: Coin }) => <Text>{item.Name}</Text>}
  />
)

export const CoinList = GraphqlHOC(coinListRaw, schema, coinsQuery)

type CoinsQuery = {
  coins: Array<Coin>
}

type Coin = {
  Name: string
  Id: number
}
