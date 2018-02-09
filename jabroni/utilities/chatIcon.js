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
    text: 'Camera',
    icon: require('../../images/camera.png'),
    name: 'Camera',
    position: 3
  }];

class Chat extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.nav.onNavigateShouldAllow(() => {
       return true;
    });

  }

  render() {
    // console.log('whats in this chatIcon', this.props.TopNav);
    return (
      <FloatingAction
        actions={actions}
        overlayColor={'transparent'}
        onPressItem={
          (name) => {
            this.props.TopNav.navigation.navigate(`${name}`)
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