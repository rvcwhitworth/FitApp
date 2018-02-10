import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import gql from 'graphql-tag';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
//import { searchQuery, spotterQuery, addSpotter } from '../utilities/queries.js'

// const searchQuery = gql`
//   query getUsersByFullName($fullName: String!){
//     getUsersByFullName(fullName: $fullName) {
//       id
//       fullName
//       email
//       profile_data
//       username
//     }
//   }
// `
// const spotterQuery = gql`
// query getSpotters($id: Int!){
//   getSpotters(id: $id, type: "client") {
//     trainer {
//       username
//       fullName
//       id
//     }
//   }
// }
// `

// const addSpotter = gql`
// mutation setSpotter($trainer_id: Int!, $client_id: Int!){
//   setSpotter(trainer_id: $trainer_id, client_id: $client_id, type: "support") {
//     trainer {
//       id
//       fullName
//       email
//       profile_data
//       username
//     }
//   }
// }
// `

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
        spotters: this.props.spotters
      }
  }

  componentDidMount () {
  }

  render() {
    console.log('this si the state', this.state)
      return(
        <div>
        <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
        <h1 style={{textAlign:'center'}}> Team </h1>
        {this.state.spotters.map((val, key) => {
          return <div className='container'><h2>Trainer: {val.trainer.fullName}</h2></div>
        })}
        </div>
        )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: 3,
    user: store.auth.username,
    goals: store.auth.goals,
    backgroundImage: store.branding.backgroundImg,
    spotters: store.auth.spotters
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(ClientTeam)));