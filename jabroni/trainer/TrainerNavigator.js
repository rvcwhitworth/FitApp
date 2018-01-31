import SwipeNavigator from 'react-native-swipe-navigation'
import Landing from './trainerLanding.js'
import Chat from '../Chat.js'


const ProfileNavigator = new SwipeNavigator({

  //FIRST TAB SET (Inputs/Profile)
  Home: {
    screen: Landing,
    left: 'Chat',
    type: 'over'
  },
  Chat: {
    screen: Chat,
    type: 'push'
  }
})

export default ProfileNavigator