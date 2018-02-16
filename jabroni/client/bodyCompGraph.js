import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import { SmoothLine } from 'react-native-pathjs-charts'

import { getDailyRecords } from '../utilities/queries.js';
// import gql from 'graphql-tag';


// const getDailyRecords = gql`
//   query getDailyRecords($id: Int!, $timestamp: String) {
//     getDailyRecords(id: $id, timestamp: $timestamp) {
//       id
//       data
//       created_at
//     }
//   }
// `

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFCFA',
  },
});

  let options = {
    width: 280,
    height: 280,
    color: '#06D6A0',
    margin: {
      top: 20,
      left: 45,
      bottom: 25,
      right: 20
    },
    animate: {
      type: 'delayed',
      duration: 10000
    },
    axisX: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#26547C'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#26547C'
      }
    }
  }

class SmoothLineChartRegions extends Component {
  constructor(props) {
    super(props);
    // graphData[0] is an array where y vals represent weight
    // graphData[1] is an array where y vals represent weight - (bodyFatPer * weight) i.e. "lean mass"
    this.state = {
      graphData: [],
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
          query: getDailyRecords,
          variables: {
            id: id
          }
        }).then(({data}) => {
          // currently, the Daily_Records table stores workout data and weight/measurements...
          // so need to iterate through results and select the measurement data to display:
          console.log('data before parsing:', data.getDailyRecords);
          let graphData = [[], []];
          let count = 0; // replace with date!
          data.getDailyRecords.forEach(record => {
            let entry = JSON.parse(record.data);
            let date = record.created_at;
            if ( entry ) {
              let weight = parseFloat(entry.weight);
              let bfp = parseFloat(entry.BodyFatPer);
              // console.log('data for graphing: ', weight, bfp, date);
              if (weight && bfp) {
                graphData[0].push({'x': count, 'y': weight});
                graphData[1].push({'x': count, 'y': weight - ((bfp/100) * weight)});
                count++;
              }
            }
          });

          this.setState({
            graphData: graphData,
            loading: false
          }, () => {
            console.log('data for graphing: ', this.state.graphData);
          });

        });
      }
    })
  }

  render() {

    // let regions = [{
    //   label: 'Normal weight',
    //   from: 130,
    //   to: 170,
    //   fill: '#2d8023'
    // }, {
    //   label: 'Overweight',
    //   from: 170,
    //   to: 200,
    //   fill: '#807623'
    // }]

    // let regionStyling = {
    //   labelOffset: {
    //     left: 40,
    //     top: 10,
    //   },
    //   fillOpacity: 0.5,
    //   fontFamily: 'Arial',
    //   fontSize: 30,
    //   fontWeight: true
    // }

    // let options = {
    //   width: 280,
    //   height: 280,
    //   color: '#2980B9',
    //   margin: {
    //     top: 20,
    //     left: 45,
    //     bottom: 25,
    //     right: 20
    //   },
    //   animate: {
    //     type: 'delayed',
    //     duration: 1000
    //   },
    //   axisX: {
    //     showAxis: true,
    //     showLines: true,
    //     showLabels: true,
    //     showTicks: true,
    //     orient: 'bottom',
    //     label: {
    //       fontFamily: 'Arial',
    //       fontSize: 14,
    //       fontWeight: true,
    //       fill: '#34495E'
    //     }
    //   },
    //   axisY: {
    //     showAxis: true,
    //     showLines: true,
    //     showLabels: true,
    //     showTicks: true,
    //     orient: 'left',
    //     label: {
    //       fontFamily: 'Arial',
    //       fontSize: 14,
    //       fontWeight: true,
    //       fill: '#34495E'
    //     }
    //   }
    // }

    // regions={regions} regionStyling={regionStyling} 

    return this.state.loading ? <View><Text>Loading...</Text></View>: (
      <View style={styles.container}>
        <SmoothLine data={this.state.graphData} options={options} xKey='x' yKey='y' />
      </View>
    )
  }
}

export default withApollo(SmoothLineChartRegions);