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
  coin: Coin,
  navigate: any
}

export const CoinListRow: React.StatelessComponent<Props> = ({ coin, navigate }) => (
  <ListItem button key={coin.long + coin.mktcap}  onPress={() => navigate('Coin', { name: coin.Name }) }>
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
      {parseFloat(coin.cap24hrChange) >= 0 ? (
        <Badge
          style={{
            backgroundColor: `rgba(115,181,102,${parseFloat(
              coin.cap24hrChange
            ) *
              4 /
              100})`,
          }}
        >
          <Text style={{ color: "black" }}>
            + {parseFloat(coin.cap24hrChange).toFixed(2)}%
          </Text>
        </Badge>
      ) : (
        <Badge
          style={{
            backgroundColor: `rgba(218,59,51,${parseFloat(coin.cap24hrChange) *
              -4 /
              100})`,
          }}
        >
          <Text style={{ color: "black" }}>
            {parseFloat(coin.cap24hrChange).toFixed(2)}%
          </Text>
        </Badge>
      )}
    </Body>
    <Right style={{ flexGrow: 1 }}>
      <Text>${parseFloat(coin.price).toFixed(2)}</Text>
    </Right>
  </ListItem>
)
