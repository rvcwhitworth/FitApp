import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

  const actions = [{
    text: 'Messages',
    icon: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/2000px-Circle-icons-chat.svg.png' },
    name: 'Messages',
    position: 2
  }, {
    text: 'VideonChat',
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
  constructor(props){
    super(props)
  }

  componentDidMount() {
    console.log('what are props', this.props)
    // nav.onNavigateShouldAllow(() => {
    //    return true;
    // });

  }

  render() {
    return (
      <FloatingAction
        actions={actions}
        overlayColor={'transparent'}
        onPressItem={
          (name) => {
            this.props.nav.navigate(`${name}`)
          }
        } />
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
})

export default Chat