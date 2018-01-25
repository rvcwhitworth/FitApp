import SwipeNavigator from 'react-native-swipe-navigation'
import Messages from './Messages'
import Stories from './Stories'
import Memories from './Memories'
import Camera from './camera'
import Discover from './Discover'

const Navigator = SwipeNavigator({
  Camera: {
    screen: Camera,
    left: 'Messages',
    right: 'Stories',
    bottom: 'Memories',
  },

  Messages: {
    screen: Messages,
    color: '#64B5F6',
    type: 'over',
  },

  Discover: {
    screen: Discover,
    type: 'over',
  },

  Stories: {
    screen: Stories,
    right: 'Discover',
    color: '#9575CD',
    type: 'over',
  },

  'Memories': {
    screen: Memories,
    color: '#E53935',
    type: 'over',
  },

})

export default Navigator