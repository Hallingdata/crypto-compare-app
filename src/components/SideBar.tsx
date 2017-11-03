import React from "react"
import { AppRegistry, Image, StatusBar } from "react-native"
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
} from "native-base"
const routes = ["Home", "Chat", "Profile"]
export const SideBar: React.StatelessComponent<{}> = () => (
  <Container>
    <Content>
      <List
        dataArray={routes}
        renderRow={data => {
          return (
            <ListItem button>
              <Text>{data}</Text>
            </ListItem>
          )
        }}
      />
    </Content>
  </Container>
)
