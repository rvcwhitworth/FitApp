import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

  const actions = [{
    text: 'Messages',
    icon: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/2000px-Circle-icons-chat.svg.png' },
    name: 'Cool Icon',
    position: 2
  }, {
    text: 'Video Chat',
    icon: {uri: 'http://icons.iconarchive.com/icons/graphicpeel/balloons/512/iChat-Video-icon.png'},
    name: 'Video',
    position: 1
  }, {
    text: 'Dat Good Good',
    icon: {'uri': 'http://pngimg.com/uploads/eggplant/eggplant_PNG2762.png?i=1'},
    name: 'Eggplant',
    position: 3
  }];

class Chat extends React.Component {
  componentDidMount() {
    const { nav } = this.props;

    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <View style={styles.container}>

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
  },
})

export default Chat