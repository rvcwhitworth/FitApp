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
import { Menu, Message, Grid, Form, Input, Button } from 'semantic-ui-react'

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
            sendMessage: ''
        }
        // this.roomClickHandler = this.roomClickHandler.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
        this.handleSendClick = this.handleSendClick.bind(this)
        this.scrollToBottom = this.scrollToBottom.bind(this)
        this.sendInputChangeHandler = this.sendInputChangeHandler.bind(this)
    }

    sendInputChangeHandler(e){
        this.setState({sendMessage: e.target.value})
    }
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    handleSendClick (){
        database.ref('rooms/' + this.state.activeItem + '/messages').push({user: this.state.username, message: this.state.sendMessage})
        this.setState({sendMessage: ''})
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

                <Grid.Column style={{width: 'auto', height:'80vh', overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'pink', paddingRight: 5}}>
                    <Menu pointing vertical style={{marginTop: '2%'}}>
                        {this.state.rooms.map(
                            (room, i)=>{
                                return <Menu.Item key={i} name={room.room_id} active={activeItem === room.room_id } onClick={this.handleItemClick} />
                            }
                        )}
                    </Menu>
                </Grid.Column>                

                <Grid.Column style={{height:'90vh', overflowY: 'hidden', overflowX: 'hidden', maxWidth:'100%'}}>  
                    <div style={{height:'80vh', maxWidth:'100%', overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'red'}}
                        
                    >
                        {this.state.message.map(
                            (message, i)=>{
                                // console.log('message', message);
                                if(message.user === 'test'){
                                    return (
                                        <Grid.Row >
                                            <Message compact key={i} content={message.message} style={{margin: 3, left: '5%', backgroundColor: 'cyan', borderRadius: '17%', padding: '10', maxWidth:'20%'}}/>
                                                    
                                        </Grid.Row> 
                                    )
                                }else{
                                    return (
                                        <Grid.Row >
                                            <Message compact key={i} content={message.message} style={{margin: 3, right: '-75%', backgroundColor: 'cyan', borderRadius: '17%', padding: '10', maxWidth:'20%', wordWrap: 'break-word'}}/>
                                        </Grid.Row>                        
                                    )
                                }
                            }
                        )}
                        <div ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                    
                    {/* <Grid.Row stretched style={{verticalAlign: 'bottom'}}> */}
                        <Form style={{width: '100%', height: '10vh', backgroundColor:'red'}}>
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
    user: store.auth.user,
    goals: store.auth.goals
  };
};


export default withRouter(connect(
  mapStoreToProps
)(withApollo(Chat)));
