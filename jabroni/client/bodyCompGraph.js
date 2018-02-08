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

const dummyData = [ 
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
    ];

class SmoothLineChartRegions extends Component {
  constructor(props) {
    super(props);
    // graphData[0] is an array where y vals represent weight
    // graphData[1] is an array where y vals represent weight - (bodyFatPer * weight) i.e. "lean mass"
    this.state = {
      graphData: dummyData,
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
        }).then(({data}) => {
          // currently, the Daily_Records table stores workout data and weight/measurements...
          // so need to iterate through results and select the measurement data to display:
          let graphData = [[], []];
          data.getDailyRecords.forEach(record => {
            let entry = JSON.parse(record.data);
            let date = record.created_at;
            if ( entry ) {
              let weight = entry.weight;
              let bfp = entry.BodyFatPer;
              console.log('data for graphing: ', weight, bfp, date);
              graphData[0].push([{'x': date, 'y': weight}]);
              graphData[1].push([{'x': date, 'y': weight - (bfp * weight)}]);
            }
          });

          this.setState({
            graphData: graphData,
            loading: false
          });

        });
      }
    })
  }

  render() {

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
        <SmoothLine data={this.state.graphData}
          options={options} regions={regions} regionStyling={regionStyling} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default withApollo(SmoothLineChartRegions);