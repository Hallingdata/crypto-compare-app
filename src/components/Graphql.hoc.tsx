import { graphql, GraphQLSchema } from "graphql"
import { Container, Text } from "native-base"
import * as React from "react"

type Props = any
type State = {
  loaded: boolean
  loading: boolean
  error: boolean
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
        error: false,
      }
    }

    async componentWillMount() {
      this.setState({ loading: true })
      try {
        const { data } = await graphql(schema, query)
        this.setState({
          data,
          loaded: true,
          loading: false,
          error: false,
        })
      } catch (error) {
        this.setState({
          loaded: false,
          loading: false,
          error: true,
        })
      }
    }

    render() {
      return (
        <Container>
          {this.state.loading ? (
            <Text>Loading...</Text>
          ) : this.state.error ? (
            <Text>Error: could not retrieve data</Text>
          ) : (
            <ComposedComponent data={this.state.data} {...this.props} />
          )}
        </Container>
      )
    }
  }
