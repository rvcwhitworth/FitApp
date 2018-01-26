import SwipeNavigator from 'react-native-swipe-navigation'
import DailyInputs from './DailyInputs'
import Diet from './Diet'
import Profile from './profile'
import Discover from './Discover'

const Navigator = SwipeNavigator({
  Camera: {
    screen: Profile,
    top: 'Diet',
    bottom: 'DailyInputs',
    type: 'place'
  },

  Discover: {
    screen: Discover,
    color: '#FFFFFF',
    type: 'over',
  },

  DailyInputs: {
    screen: DailyInputs,
    right: 'Discover',
    color: '#FFFFFF',
    type: 'over',
  },

  Diet: {
    screen: Diet,
    color: '#FFFFFF',
    type: 'over',
  },

})

export default Navigator