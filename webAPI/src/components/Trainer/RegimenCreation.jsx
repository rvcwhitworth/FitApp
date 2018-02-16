import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import reactDragula from 'react-dragula';
import dragula from 'dragula';
import axios from 'axios';
import { Button, Card, Icon, Image, Grid, Header, Input } from 'semantic-ui-react'

class Regimen extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        exercisePlans: this.cleanPlans(),
        id : this.props.id || null,
        username : this.props.user || null,
        monday: this.props.monday || [null],
        tuesday: this.props.tuesday || [null],
        wednesday: this.props.wednesday || [null],
        thursday: this.props.thursday || [null],
        friday: this.props.friday || [null],
        saturday: this.props.saturday || [null],
        sunday: this.props.sunday || [null],
        RegimenName: '',
        RegimenDescription: ''
      }
      this.handleMoving = this.handleMoving.bind(this)
      this.nameChange = this.nameChange.bind(this)
      this.descriptionChange = this.descriptionChange.bind(this)
      this.cleanPlans = this.cleanPlans.bind(this)
  }

    cleanPlans(){
    var clean = []
    this.props.exercisePlans.map((val) => {
      if(val.client.id === val.trainer.id){
        clean.push(val)
      }
    })
    return clean
  }

  handleMoving (el, target, old) {
  	var targ = target.id
  	var old = old.id
    console.log('targ', targ)
    console.log('old', old)
    console.log('stateprop', this.state[targ])
  	var firstAddition = () => {
  		console.log('this', this)
  	  var obj = {};
  	  obj[targ] = [ this.state.exercisePlans[el.id] ]
  	  return obj
    }
    var addition = () => {
    	var obj = {}
    	obj[targ] = this.state[targ].concat(this.state.exercisePlans[el.id])
      console.log('are we just adding??', obj)
    	return obj
    }

  	if(this.state[targ][0] === null){
  	   this.setState(firstAddition)
  	} else{
  		this.setState(addition)
  	}
  	var backToRestDay = () => {
  		var obj = {}
  		obj[old] = [null]
  		return obj
  	}
  	var removeWorkout = () => {
  		var obj = {}
  		var temp = this.state[old].indexOf(this.state.exercisePlans[el.id])
  		obj[old] = this.state[old].splice(temp, 1)
  	}
  	if(this.state[old]){
  		var length = this.state[old].length
  		if(length === 1){
  			this.setState(backToRestDay)
  		} else{
  			this.setState(removeWorkout)
  		}
  	}
  }



//   inputChangeHandler : function (event) {
//     var stateObject = function() {
//       returnObj = {};
//       returnObj[this.target.id] = this.target.value;
//          return returnObj;
//     }.bind(event)();

//     this.setState( stateObject );    
// },

  nameChange(e){
    this.setState({
      RegimenName: e.target.value
    })
  }

  descriptionChange(e){
    this.setState({
      RegimenDescription: e.target.value
    })
  }



  componentDidMount() {
  	var that = this
  	dragula([document.getElementById('saturday'), document.getElementById('friday'), document.getElementById('monday'), document.getElementById('sunday'), document.getElementById('thursday'), document.getElementById('wednesday'), document.getElementById('tuesday'), document.getElementById('Workouts')], {removeOnSpill:true})
  .on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el, target, old) {
  	that.handleMoving(el, target, old)
    el.className += ' ex-moved';
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  })
    // var container = ReactDOM.findDOMNode(this);
    // reactDragula([container]);
  //     .on('drag', function (el) {
  //   el.className = el.className.replace('ex-moved', '');
  // }).on('drop', function (el, target, old) {
  //   that.handleMoving(el, target, old)
  //   el.className += ' ex-moved';
  // }).on('over', function (el, container) {
  //   container.className += ' ex-over';
  // }).on('out', function (el, container) {
  //   container.className = container.className.replace('ex-over', '');
  // })
  }

  render() {

  	console.log('WERE RENDERING SHITT', this.state)
  	return (
  		<div>
  		<div>
  		<div className='container' >
      <Button onClick={()=>this.props.cancel()} style={{fontFamily: 'Sans-Serif', float:'right', backgroundColor:'#FFD166'}}><h3 style={{color:'white', float:'right'}}>Cancel</h3></Button>
      <Button primary onClick={()=>this.props.save(this.state)} style={{fontFamily: 'Sans-Serif', float:'right'}}><h3 style={{color:'white', float:'right'}}>Save!</h3></Button>
      <Input onChange={this.nameChange} value={this.state.RegimenName} style={{float:'right'}} focus placeholder='Name this Regimen!' />
      <Input onChange={this.descriptionChange} value={this.state.RegimenDescription} style={{float:'right'}} focus placeholder='Describe this Regimen!' />
      </div>
  		<h1 style={{color:'white', textAlign:'center'}}>Weekly Planner</h1>
  		<div id='Workouts' style={{display: 'flex', flexDirection:'row'}}>
        {this.state.exercisePlans.map((val, i) =>{
          return(
            <div key={i} id={i} value={i} >
            <Card key={i} value={i} onClick={() => console.log(i)}style={{width: "12rem", maxheight:'12rem', padding:'10px', float:'left', cursor:'pointer'}}>
              <Image src={val.regimen.photo} alt="Card image cap" />
              <Card.Content>
              <Card.Header>
              {val.name}
              </Card.Header>
              <Card.Meta>
              <span className='workout'>
                 Workout
              </span>
              </Card.Meta>
              <Card.Description>
                {val.regimen.description}
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
             <a>
             Difficulty 5
             <Icon name='star' />
             </a>
             </Card.Content>
             </Card>
             </div>
          )})}
  		</div>
  		</div>
      <Grid centered='true'>
    <Grid.Row columns={3} stretched='true' style={{height:450}}>
      <Grid.Column centered='true' stretched='true' style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
        <Header textAlign="center" as='h1'>Monday</Header>
        <Grid.Row id='monday' centered='true' stretched='true'>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column centered='true' stretched='true' style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Tuesday</Header>
        <Grid.Row id='tuesday'>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column centered='true' style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Wednesday</Header>
        <Grid.Row id='wednesday'>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={4} stretched style={{height:450}}>
      <Grid.Column style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Thursday</Header>
        <Grid.Row id='thursday'>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Friday</Header>
        <Grid.Row id='friday'>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Saturday</Header>
        <Grid.Row id='saturday'>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column style={{backgroundColor:'#FFFCF9', border: '5px solid #26547C'}}>
      <Header textAlign="center" as='h1'>Sunday</Header>
        <Grid.Row id='sunday'>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
    </Grid>

  		</div>)
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals,
    exercisePlans: store.auth.Exercise_Plan
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Regimen));