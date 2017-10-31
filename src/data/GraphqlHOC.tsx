import { graphql, GraphQLSchema } from "graphql"
import * as React from "react"
import { Text, View } from "react-native"

type Props = {}
type State = {
  loaded: boolean
  loading: boolean
  data?: any
}
export const GraphqlHOC = (
  ComposedComponent: any,
  schema: GraphQLSchema,
  query: string
) =>
  class extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props)
      this.state = {
        loaded: false,
        loading: false,
      }
    }

    async componentWillMount() {
      this.setState({ loading: true })
      const { data } = await graphql(schema, query)
      this.setState({
        data,
        loaded: true,
        loading: false,
      })
    }

    render() {
      return (
        <View>
          {this.state.loading ? (
            <Text>Loading...</Text>
          ) : (
            <ComposedComponent data={this.state.data} {...this.props} />
          )}
        </View>
      )
    }
  }
