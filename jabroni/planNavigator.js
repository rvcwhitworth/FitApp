import SwipeNavigator from 'react-native-swipe-navigation'
import Daily from './daily'
import Discover from './Discover'

const ProfileNavigator = SwipeNavigator({
  Camera: {
    screen: Daily,
    top: 'Discover',
    type: 'over'
  },

  Discover: {
    screen: Discover,
    color: '#FFFFFF',
    type: 'over',
  },

})

export default ProfileNavigator