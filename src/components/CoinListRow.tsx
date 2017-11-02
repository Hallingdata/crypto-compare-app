import {
  Badge,
  Body,
  Left,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from "native-base"
import * as React from "react"

type Props = {
  coin: Coin
}

export const CoinListRow: React.StatelessComponent<Props> = ({ coin }) => (
  <ListItem key={coin.long + coin.mktcap}>
    <Left style={{ flexGrow: 2 }}>
      <Thumbnail
        style={{ width: 30, height: 30 }}
        source={{
          uri: "https://www.cryptocompare.com" + coin.ImageUrl,
        }}
      />
      <Text>{coin.long} </Text>
    </Left>
    <Body style={{ flexGrow: 1 }}>
      {coin.cap24hrChange >= 0 ? (
        <Badge
          style={{
            backgroundColor: `rgba(115,181,102,${coin.cap24hrChange *
              4 /
              100})`,
          }}
        >
          <Text style={{ color: "black" }}>+ {coin.cap24hrChange}%</Text>
        </Badge>
      ) : (
        <Badge
          style={{
            backgroundColor: `rgba(218,59,51,${coin.cap24hrChange * -4 / 100})`,
          }}
        >
          <Text style={{ color: "black" }}>{coin.cap24hrChange}%</Text>
        </Badge>
      )}
    </Body>
    <Right style={{ flexGrow: 1 }}>
      <Text>${coin.price}</Text>
    </Right>
  </ListItem>
)
