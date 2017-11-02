import { GraphQLSchema } from "graphql"
import { makeExecutableSchema } from "graphql-tools"
import * as R from "ramda"

const typeDefs = `
type Coin {
  Id: String!
  Symbol: String!
  ImageUrl: String!
  Name: String!
  SortOrder: String!
  CoinName: String!
  candleHour: [DataPoint]
  cap24hrChange: String!
  long: String!
  mktcap: Float!
  perc: Float!
  price: Float!
  shapeshift: Boolean!
  short: String!
  supply: Int!
  usdVolume: Int!
  volume: Int!
  vwapData: Float!
  vwapDataBTC: Float!
}
type DataPoint {
  time: Int!
  close: Float!
  high: Float!
  low: Float!
  open: Float!
  volumefrom: Float!
  volumeto: Float!
}
type Query {
  coin(id: String!): Coin!
  coins(limit: Int, sortBy: String): [Coin]!
}
schema {
  query: Query
}
`

const cryptoCompare = "https://min-api.cryptocompare.com"
const cryptoCompare_old = "https://www.cryptocompare.com/api"
const coinCap = "https://coincap.io"

const dataToJSON = R.composeP(R.prop("Data"), R.invoker(0, "json"))

const objectToArray = (data: any) =>
  R.map((key: string) => data[key], R.keys(data))

const coin = async (root: any, { id }: { id: string }) =>
  R.composeP(R.prop("General"), dataToJSON, fetch)(
    `${cryptoCompare_old}/data/coinsnapshotfullbyid/?id=${id}`
  )

const coins = async (root: any, { limit = 100 }) => {
  const coinInfoCryptoComparePromise = R.composeP(dataToJSON, fetch)(
    `${cryptoCompare}/data/all/coinlist`
  )
  const topCoinsPromise = R.composeP(
    R.take(limit),
    R.invoker(0, "json"),
    fetch
  )(`${coinCap}/front`)

  const [coinInfoCryptoCompare, topCoins]: Array<any> = await Promise.all([
    coinInfoCryptoComparePromise,
    topCoinsPromise,
  ])
  return R.reduce(
    (acc: any, topCoin: any) => {
      const ccCoinInfo = coinInfoCryptoCompare[topCoin.short]

      return ccCoinInfo
        ? R.append(
            {
              ...topCoin,
              ...ccCoinInfo,
            },
            acc
          )
        : acc
    },
    [],
    topCoins
  )
}

const candleHour = ({ Symbol }: { Symbol: string }) =>
  R.composeP(dataToJSON, fetch)(
    `${cryptoCompare}/data/histohour?fsym=${Symbol}&tsym=USD&limit=10&aggregate=3&e=CCCAGG`
  )

const resolvers = {
  Query: {
    coin,
    coins,
  },
  Coin: {
    candleHour,
  },
}

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
