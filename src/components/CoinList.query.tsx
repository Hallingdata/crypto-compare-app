import { Container, Content, Header, List } from "native-base"
import * as React from "react"

import { schema } from "../graphql/cryptoCompare.schema"
import { GraphqlHOC } from "./Graphql.hoc"
import { CoinListRow } from "./CoinListRow"

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
  data: {
    coins: Array<Coin>
  }
}

const coinListRaw: React.StatelessComponent<Props> = ({ data }) => (
  <Container>
    <Header />
    <Content>
      <List
        dataArray={data.coins}
        renderRow={coin => <CoinListRow coin={coin} />}
      />
    </Content>
  </Container>
)

export const CoinList = GraphqlHOC(coinListRaw, schema, coinsQuery)
