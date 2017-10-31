import { makeExecutableSchema } from "graphql-tools"
import * as R from "ramda"

const typeDefs = `
type Coin {
  Id: Int!
  Symbol: String
  ImageUrl: String
  Name: String
  CoinName: String
  histoHour: [DataPoint]
}
type DataPoint {
  time: Int
  close: Float
  high: Float 
  low: Float
  open: Float
  volumefrom: Float
  volumeto: Float
}
type Query {
  coin(id: Int!): Coin
  coins: [Coin]
}
schema {
  query: Query
}
`

const endpoint = "https://min-api.cryptocompare.com"
const oldEndpoint = "https://www.cryptocompare.com/api"
const dataToJSON = R.composeP(R.prop("Data"), R.invoker(0, "json"))

const objectToArray = (data: any) =>
  R.map((key: string) => data[key], R.keys(data))

const coin = async (root: any, { id }: { id: number }) =>
  R.composeP(R.prop("General"), dataToJSON, fetch)(
    `${oldEndpoint}/data/coinsnapshotfullbyid/?id=${id}`
  )

const coins = () =>
  R.composeP(objectToArray, dataToJSON, fetch)(`${endpoint}/data/all/coinlist`)

const histoHour = (symbol: string) =>
  R.composeP(dataToJSON, fetch)(
    `${endpoint}/data/histohour?fsym=${symbol}&tsym=USD&limit=10&aggregate=3&e=CCCAGG,`
  )

const resolvers = {
  Query: {
    coin,
    coins,
  },
  Coin: {
    histoHour,
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
