import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import gql from 'graphql-tag';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Input, Button, Icon, Card } from 'semantic-ui-react'
import { searchQuery } from '../../../utilities/queries.jsx'

const q = gql`
  mutation connectionRequest($id: Int!, $connection_requests: String!){
    connectionRequest(id: $id, connection_requests: $connection_requests) {
        id
        connection_requests
    }
  }`


class ClientTeam extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage,
        searchTerm: "",
        searchResults: [],
        loading: false,
        photos: {},
        search: '',
        spotters: this.props.spotters
      }
      this.handleSearch = this.handleSearch.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleBackClick = this.handleBackClick.bind(this)
      this.requestSpotter = this.requestSpotter.bind(this)
  }

  componentDidMount(){
  }

  handleBackClick(){
    this.setState({
      searchResults: []
    })
  }

  requestSpotter(id){
    var payload = JSON.stringify({
          id: this.state.id,
          name: this.state.username
            })

    this.props.client.mutate({
      mutation: q,
      variables: {
        id: id, 
        connection_requests: payload
          }
          }).then((results) => {
            console.log('did it work?', results)
          }).catch((err) => {
        console.log('graphQL error in teamScreen query: ', err);
      }).then(() => {
        console.log('fin')
      })
  }

  handleSearch(){
      this.props.client.query({
        query: searchQuery,
        variables: {
          fullName: this.state.search
        }
      }).then((results) => {
        console.log('RESULTS FROM SEARCH', results);
        let temp = this.state.searchResults;
        results.data.getUsersByFullName.forEach((person) => {
          temp.push(person);
        });
        this.setState({
          searchResults: temp,
          search: ''});
      }).catch((err) => {
        console.log('graphQL error in teamScreen query: ', err);
      }).then(() => {
        console.log('fin')
      })
  }

  handleChange(e){
    this.setState({
      search: e.target.value
    })
  }

  render() {
    if(this.state.searchResults.length === 0){
      return(
        <div>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <h1 style={{textAlign:'center'}}> Team </h1>
        <Input icon='users' value={this.state.search} onChange={this.handleChange}iconPosition='left' placeholder='Search users...' />
        <Button animated>
          <Button.Content onClick={this.handleSearch} visible>Search</Button.Content>
          <Button.Content onClick={this.handleSearch} hidden>
            <Icon name='search' />
          </Button.Content>
        </Button>
        {this.state.spotters.map((val, key) => {
          return <div className='container'><h2>Trainer: {val.trainer.fullName}</h2></div>
        })}
        </div>
        )
    } else{
      return(
      <div>
        {this.state.searchResults.map((val, key) => {
          return(
      <Card>
        <Card.Content>
          <Card.Header>
            {val.fullName}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Athlete
            </span>
          </Card.Meta>
          <Card.Description>
            {val.profile_data}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Button animated style={{backgroundColor:'#06D6A0'}}>
              <Button.Content visible>Connect</Button.Content>
              <Button.Content hidden onClick={() => {this.requestSpotter(val.id)}}>
                <Icon name='user' />
              </Button.Content>
            </Button>
          </a>
        </Card.Content>
      </Card>)
      })}
            <Button animated>
              <Button.Content visible>Back to Team</Button.Content>
              <Button.Content hidden onClick={this.handleBackClick}>
                <Icon name='arrow left' />
              </Button.Content>
            </Button>
    </div>)
    }
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.id,
    user: store.auth.fullName,
    goals: store.auth.goals,
    connection_requests: store.auth.connection_requests,
    backgroundImage: store.branding.backgroundImg,
    spotters: store.auth.spotters
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(withApollo(ClientTeam))));