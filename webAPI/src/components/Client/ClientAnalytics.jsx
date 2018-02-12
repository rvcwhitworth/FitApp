import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import c3 from 'c3';
import BodyCompGraphs from './Graphs/bodyComp.jsx'
import DietAnalytcis from './Graphs/dietAnalytics.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';
import { Grid, Menu, Segment } from 'semantic-ui-react'

class Analytics extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id: this.props.id,
        chartType: ['BodyComp', 'DailyDiet', 'BodyFat%'],
        selected: 'BodyComp'
      }
      this.updateGraph = this.updateGraph.bind(this)
      this.tester = this.tester.bind(this)
      this.renderGraph = this.renderGraph.bind(this)
  }
//WILL NEED TO ADD MORE GRAPHS HERE
  componentDidMount () {
    // axios.post('/server/graphData', {user: this.state.id}).then((response) => {
    //   console.log(response)
    this.updateGraph()
    // })
  }

  tester(e, { name }){
    e.preventDefault()
    console.log('what is the value', e.target, name)
    this.setState({
      selected: name
    })
  }

  updateGraph() {
    var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', 1, 7, 14, 21, 28, 35],
            ['FatMass', 30, 27, 25, 24, 22, 20],
            ['LeanMass', 165, 166, 170, 173, 178, 182]
        ],
        types: {
          FatMass: 'area',
          LeanMass: 'area'
          // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['FatMass', 'LeanMass']]
    }
});
  }

  renderGraph(){
    console.log('whats going on?', this.state)
    if(this.state.selected === 'BodyComp'){
        return(
          <div style={{width:'75%', display:'inline-block'}}>
            <BodyCompGraphs />
          </div>
        )
        }else if(this.state.selected === 'Diet'){
        return(
          <div style={{width:'75%', display:'inline-block'}}>
            <DietAnalytcis />
          </div>
        )
        }
  }

  render() {
    console.log('whats zeee state', this.state)
    return(
      <Grid>
        <Grid.Column width={3}>
          <Menu fluid vertical tabular>
      <Menu.Item active={this.state.selected === 'BodyComp'} onClick={this.tester} value='BodyComp' name="BodyComp" />
      <Menu.Item active={this.state.selected === 'Diet'} onClick={this.tester} value='Diet' name='Diet' />
      <Menu.Item active={this.state.selected === 'Workouts'} onClick={this.tester} value='Workouts' name='Workouts' />
                </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
           {this.renderGraph()}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }

}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.example.user
  };
};

export default withRouter(connect(
  mapStoreToProps
)(withApollo(Analytics)));