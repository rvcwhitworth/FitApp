import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import c3 from 'c3';
import BodyCompGraphs from './Graphs/bodyComp.jsx'
import DietAnalytcis from './Graphs/dietAnalytics.jsx'
import { graphql, ApolloProvider, withApollo } from 'react-apollo';

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

  tester(e){
    this.setState({
      selected: e.target.value
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
    return(
      <div className='container' style={{flexDirection:'column', display:'inline-block', textAlign:'center'}}>
      <div className="btn-group-vertical" style={{backgroundColor:'rgba(255,255,255,0.6)', float:'left'}}>
      <button onClick={this.tester} className="btn btn-lg btn-block" value='BodyComp' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif', height:'33%', width:'33%'}}>Body Composition</button>
      <button onClick={this.tester} className="btn btn-lg btn-block" value='Diet' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif', height:'33%', width:'33%'}}>Diet</button>
      <button onClick={this.tester} className="btn btn-lg btn-block" value='Workouts' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif', height:'33%', width:'33%'}}>Workouts</button>
      </div>

      {this.renderGraph()}
    </div>
    )
  }

}

// <div>
//     <div style={{padding:'25px', backgroundColor:'rgba(0,0,0,.3)'}}>
//     <h1 style={{color:'white', textAlign:'center', fontFamily: 'Sans-Serif'}}> Body Fat Percentage </h1>
//     <div id='chart2' style={{backgroundColor:'rgba(256,256,256,.7)', fontFamily: 'Sans-Serif', color:'white'}}> </div>
//     </div>
//     </div>

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