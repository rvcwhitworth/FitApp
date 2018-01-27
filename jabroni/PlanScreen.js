import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

  const actions = [{
    text: 'Cool',
    icon: { uri: 'https://www.svgrepo.com/show/191/cool.svg' },
    name: 'Cool Icon',
    position: 2
  }, {
    text: 'Language',
    icon: {uri: 'https://image.flaticon.com/icons/svg/281/281505.svg'},
    name: 'bt_language',
    position: 1
  }, {
    text: 'Location',
    icon: {uri: 'https://image.flaticon.com/icons/svg/26/26423.svg'},
    name: 'bt_room',
    position: 3
  }];

export default class PlanScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
    <View style={styles.container}>
      <Text>
        Floating Action example
      </Text>
      <FloatingAction
        actions={actions}
        onPressItem={
          (name) => {
            console.log(`selected button: ${name}`)
          }
        } />
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});