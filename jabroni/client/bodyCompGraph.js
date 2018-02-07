import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import { SmoothLine } from 'react-native-pathjs-charts'

const getDailyInput = require('../utilities/queries.js').getDailyInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class SmoothLineChartRegions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `SmoothLine - Regions`,
  });

  componentDidMount(){
    AsyncStorage.getItem('@FitApp:UserInfo', (err, val) => {
      if ( err ) {
        console.log(err);
      } else {
        let id = JSON.parse(val).id;
        this.props.client.query({
          query: getDailyInput,
          variables: {
            id: id
          }
        }).then((results) => {
          this.setState({
            loading: false
          });
          console.log('data for graph: ', results);
        });
      }
    })
  }

  render() {
    let data = [ 
    [{
      'x': 0,
      'y': 220
    }, {
        "x": 1,
        "y": 218
      },
      {
        "x": 2,
        "y": 216
      },
      {
        "x": 3,
        "y": 213
      },
      {
        "x": 4,
        "y": 209
      },
      {
        "x": 5,
        "y": 207
      }
      ],
      [{
        "x": 0,
        "y": 195
      }, {
        "x": 1,
        "y": 191
      }, {
        "x": 2,
        "y": 185
      }, {
        "x": 3,
        "y": 184
      }, {
        "x": 4,
        "y": 180
      }, {
        "x": 5,
        "y": 178
      }]
    ]

    let regions = [{
      label: 'Normal weight',
      from: 180,
      to: 200,
      fill: '#2d8023'
    }, {
      label: 'Overweight',
      from: 200,
      to: 220,
      fill: '#807623'
    }]

    let regionStyling = {
      labelOffset: {
        left: 40,
        top: 10,
      },
      fillOpacity: 0.5,
      fontFamily: 'Arial',
      fontSize: 30,
      fontWeight: true
    }

    let options = {
      width: 280,
      height: 280,
      color: '#2980B9',
      margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20
      },
      animate: {
        type: 'delayed',
        duration: 1000
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }

    return this.state.loading ? <View><Text>Loading...</Text></View>: (
      <View style={styles.container}>
        <SmoothLine data={data}
          options={options} regions={regions} regionStyling={regionStyling} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default withApollo(SmoothLineChartRegions);