import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'
import mantic from 'semantic-ui-react'
import firebase from '../../../jabroni/utilities/firebase.js'
import gql from 'graphql-tag';
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Menu, Message, Grid, Form, Input, Button, Label } from 'semantic-ui-react'
import _ from 'underscore'

const database = firebase.database();

const getChatRooms = gql`
query getChatRooms($id: Int!){
  getChatRooms(id: $id) {
    room_id
    user{
      id
      fullName
    }
  }
}`

const q = gql`
  mutation connectionRequest($id: Int!, $connection_requests: String! $delete: Boolean){
    connectionRequest(id: $id, connection_requests: $connection_requests, delete: $delete) {
        id
        connection_requests
    }
  }`

const addSpotter = gql`
mutation setSpotter($trainer_id: Int!, $client_id: Int!){
  setSpotter(trainer_id: $trainer_id, client_id: $client_id, type: "support") {
    trainer {
      id
      fullName
      email
      profile_data
      username
    }
  }
}
`

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id : this.props.id || null,
            username : this.props.user || null,
            goals : this.props.goals || null,
            rooms: [],
            message: [],
            highLight: 'active',
            activeItem: '',
            sendMessage: '',
            connectionRequests: this.props.connection_requests || [],
            answeringRequest: false
        }
        // this.roomClickHandler = this.roomClickHandler.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleSendClick = this.handleSendClick.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
        this.sendInputChangeHandler = this.sendInputChangeHandler.bind(this)
        this.handleConnectionRequestClick = this.handleConnectionRequestClick.bind(this)
        this.deleteRequest = this.deleteRequest.bind(this)
    }

    sendInputChangeHandler(e){
        this.setState({sendMessage: e.target.value})
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    handleSendClick (){
        if(this.state.answeringRequest){
            if(this.state.sendMessage.toLowerCase() === 'accept'){
                //We are accepting requests here
            this.props.client.mutate({
              mutation: addSpotter,
              variables: {
              client_id: this.state.id,
              trainer_id: this.state.activeItem
            }
              }).then(({data}) => {
                console.log('DATA AFTER addSpotter', data)
                this.props.client.mutate({
                  mutation: addSpotter,
                  variables: {
                  client_id: this.state.activeItem,
                  trainer_id: this.state.id
                }
              }).then(({data}) => {
                this.deleteRequest()
              })
            })
            } else if(this.state.sendMessage.toLowerCase() === 'decline'){
                this.deleteRequest()
            } else{
                var obj = {}
                obj.user = 'FitBot'
                obj.message = `Sorry, I didn't quite catch that. Please answer with 'Accept' or 'Decline'`
                this.setState({
                    message: this.state.message.concat([obj])
                })
            }
        } else{
        database.ref('rooms/' + this.state.activeItem + '/messages').push({user: this.state.username, message: this.state.sendMessage})
        this.setState({sendMessage: ''})
        }
    }

    deleteRequest(){
     var payload = JSON.stringify({
        id: this.state.activeItem
      })
     this.props.client.mutate({
     mutation: q,
     variables: {
     id: this.state.id, 
     connection_requests: payload,
     delete: true
     }
       }).then((results) => {
        console.log('did it work?', results)
        let temp = this.state.connectionRequests
        temp2 = _.filter(temp, (val) => {
          let foo = JSON.parse(val)
          if(foo.id !== this.state.activeItem){
            return true
          } else{
            return false
          }
        })
        this.setState({
            answeringRequest: false,
            activeItem: '',
            connectionRequests: temp2,
            message: [],
            sendMessage: ''
        })
        }).catch((err) => {
        console.log('graphQL error in teamScreen query: ', err);
        }).then(() => {
          console.log('fin')
        })
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name }, ()=>{
            console.log('itemClicked', this.state.message)
            database.ref('rooms/' + this.state.activeItem + '/messages').on("value", (snapshot)=>{
                this.setState({message: Object.values(snapshot.val()) })
                // this.setState({message: [...this.state.message, snapshot.val()]})
            }, 
            function(errorObject){
                console.log("the read failed: " + errorObject.code);
            })
        })
    }

    handleConnectionRequestClick = (val) => {
        console.log('what is val??', val)
        let obj = {}
        obj.user = 'FitBot'
        obj.message = `${val.name} wants to share with you on your fitness Journey: Type 'Accept' or 'Decline' to answer!`
        this.setState({
            activeItem: val.id,
            message: [obj],
            answeringRequest: true
        })



    }

    componentDidMount() {
        console.log('DO I HAVE ID',this.props.client)
        this.props.client.query({
            query: getChatRooms,
            variables: {
                id: 3
            }
        })
        .then((data)=>{
            this.setState({rooms: data.data.getChatRooms})
            console.log('Query Result', this.state)
        }).catch((err)=>{
            console.log('ERR', err)
        })
        this.scrollToBottom();
        
    }

    componentDidUpdate() {
        this.scrollToBottom();
      }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const { activeItem } = this.state

    return (
        <div style={{hieght: "90vh", padding: 0}}>
            <Grid columns={2} textAlign={'center'}>

                <Grid.Column style={{width: 'auto', height:'80vh', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#26547C', paddingRight: 5}}>
                    <Menu pointing vertical style={{marginTop: '2%'}}>
                    {this.state.connectionRequests.map((val, key) => {
                        let value = JSON.parse(val)
                        if(val){
                       return (<Menu.Item key={key} active={activeItem === value.id } name={value.id} onClick={() => this.handleConnectionRequestClick(value)}>
                        {value.name} <Label color='red'>!</Label>
                       </Menu.Item>)}
                    })}
                        {this.state.rooms.map(
                            (room, i)=>{
                                return <Menu.Item key={i} name={room.room_id} active={activeItem === room.room_id } onClick={this.handleItemClick} />
                            }
                        )}
                    </Menu>
                </Grid.Column>                

                <Grid.Column style={{height:'90vh', overflowY: 'hidden', overflowX: 'hidden', maxWidth:'100%'}}>  
                    <div style={{height:'80vh', maxWidth:'100%', overflowY: 'auto', overflowX: 'hidden', backgroundColor: '#FFFCFA'}}
                        
                    >
                        {this.state.message.map(
                            (message, i)=>{
                                // console.log('message', message);
                                if(message.user === this.state.username){
                                    return (
                                        <Grid.Row >
                                            <Message compact key={i} content={`${message.user} : ${message.message}`} style={{margin: 3, right: '-75%', backgroundColor: '#06D6A0', borderRadius: '17%', padding: '10', maxWidth:'20%'}}/> 
                                                    
                                        </Grid.Row> 
                                    )
                                }else{
                                    return (
                                        <Grid.Row >
                                            <Message compact key={i} content={`${message.user} : ${message.message}`} style={{margin: 3, left:'5%', backgroundColor: '#FFD166', borderRadius: '17%', padding: '10', maxWidth:'20%', wordWrap: 'break-word'}}/>
                                        </Grid.Row>                        
                                    )
                                }
                            }
                        )}
                        <div ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                    
                    {/* <Grid.Row stretched style={{verticalAlign: 'bottom'}}> */}
                        <Form style={{width: '100%', height: '10vh', backgroundColor:'#FFFCFA'}}>
                            <Input fluid action={{ content:'Send', onClick: this.handleSendClick }} onChange={(e)=>{this.sendInputChangeHandler(e)}} style={{padding:'2%' }} value={this.state.sendMessage} placeholder='Message...' />
                            {/* <Button type='submit' onClick={(e)=>{console.log('evert', e.target.value)}}>Send</Button> */}
                        {/* <TextArea autoHeight style={{width: '50%', justifyContent: 'center'}} placeholder='Try adding multiple lines'/> */}
                        </Form>
                    {/* </Grid.Row> */}
                    

                </Grid.Column>
                
            </Grid>
            
        </div>
    )
    }
}

const mapStoreToProps = (store) => {
  console.log('CHATstore', store);
  return {
    id: store.auth.id,
    user: store.auth.fullName,
    goals: store.auth.goals,
    connection_requests: store.auth.connection_requests
  };
};


export default withRouter(connect(
  mapStoreToProps
)(withApollo(Chat)));
