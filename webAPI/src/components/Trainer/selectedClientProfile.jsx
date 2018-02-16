import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import { Grid, Image, Button, Card, Icon, Container } from 'semantic-ui-react'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { searchQuery } from '../../../utilities/queries.jsx'


class selectedClient extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        selected: this.props.selected,
        selectedClient:  null
      }
      console.log('what are props', this.props)
  }

  componentDidMount() {
    console.log('mounting this hard')
        this.props.client.query({
        query: searchQuery,
        variables: {
          fullName: this.state.selected
        }
      }).then((results) => {
        console.log('RESULTS FROM SEARCH', results);
        let temp = []
        results.data.getUsersByFullName.forEach((person) => {
          temp.push(person);
        })
        this.setState({
          selectedClient: temp[0]
        });
      }).catch((err) => {
        console.log('graphQL error in teamScreen query: ', err);
      }).then(() => {
        console.log('fin')
      })
  }

  render() {
    console.log('selected person stata', this.state)
    return(
      <Container>
      <Card>
        <Card.Content>
          <Card.Header>
          Ethan
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Athlete
            </span>
          </Card.Meta>
          <Card.Description>
            Your CLient
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
       <Icon name='user' />
          </a>
        </Card.Content>
      </Card>
      <Image circular src={this.props.proPic} size='medium' avatar={true} style={{transform:'rotate(90deg)', float: 'right', right:'-80px', top:'-80px'}} />
      </Container>
      )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.fullName,
  };

};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(selectedClient)))