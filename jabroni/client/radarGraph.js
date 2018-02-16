import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Radar } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCFA'
  },
});

class RadarChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Radar - Basic`,
  });

  onLabelPress = (label, value) => {
    alert(label + ':' + value);
  }

  render() {
    let data = [{
      "Back": 50,
      "Chest": 35,
      "Cardio": 55,
      "Legs": 40,
      "Arms": 30,
      "Abs": 30,
    }]

    let options = {
      width: 290,
      height: 290,
      margin: {
        top: 2,
        left: 2,
        right: 20,
        bottom: 24
      },
      r: 150,
      max: 100,
      fill: "#06D6A0",
      stroke: '#26547C',
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#26547C',
        onLabelPress: this.onLabelPress
      }
    }

    return (
      <View style={styles.container}>
        <Radar data={data} options={options} />
      </View>
    )
  }
}

export default RadarChartBasic;