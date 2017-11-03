type Coin = {
  long: string
  cap24hrChange: string
  mktcap: string
  Name: string
  ImageUrl: string
  price: string
}

type Msg = {
  cap24hrChange: number
  long: string
  mktcap: number
  perc: number
  price: number
  shapeshift: boolean
  short: string
  supply: number
  usdVolume: number
  volume: number
  vwapData: number
  vwapDataBTC: number
}

type Message = {
  coin: string
  msg: Msg
}

type Msg2 = {
  cap24hrChange: number
  long: string
  mktcap: number
  perc: number
  price: number
  shapeshift: boolean
  short: string
  supply: number
  usdVolume: number
  volume: number
  vwapData: number
  vwapDataBTC: number
}

type Data = {
  exchange_id: string
  market_id: string
  price: number
  timestamp_ms: number
  volume: number
}

type Trade = {
  data: Data
}

type SocketCoinMsg = {
  coin: string
  exchange_id: string
  market_id: string
  message: Message
  msg: Msg2
  trade: Trade
}
