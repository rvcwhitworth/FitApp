import React from 'react'
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native'
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Chat extends React.Component {
  // componentDidMount() {
  //   const { nav } = this.props;

  //   // nav.onNavigateShouldAllow(() => {
  //   //    return true;
  //   // });

  // }

  render() {
    if(this.props.data.loading){
      return (<Text>Loading....</Text>)
    }
    return (
      <View style={styles.container}>
        <View style={{marginTop: 50}}>
          {/* <Text> Maybe this could be our chat? <Text>{console.log(">>>+++>>>",this.props.data.getChatRooms[0])}</Text></Text> */}
          {this.props.data.getChatRooms.map( (room)=>{
            console.log(room)
            if(room.user.fullName){
              <Text>room.user.fullName</Text>
            }
          } )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

const getChatRooms = gql`
{
  getChatRooms(id: 2) {
    id
    room_id
    user{
      id
      fullName
    }
  }
}`

export default graphql(getChatRooms)(Chat)