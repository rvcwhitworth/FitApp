import SwipeNavigator from 'react-native-swipe-navigation'
import DailyInputs from './DailyInputs'
import Diet from './Diet'
import Profile from './profile'
import LogOut from './logOut.js'

const ProfileNavigator = new SwipeNavigator({
  Camera: {
    screen: Profile,
    left: 'Diet',
    bottom: 'DailyInputs',
    type: 'over'
  },

  DailyInputs: {
    screen: DailyInputs,
    color: '#FFFFFF',
    type: 'over',
  },

  Diet: {
    screen: Diet,
    top: 'LogOut',
    color: '#FFFFFF',
    type: 'place',
  },

  LogOut: {
    screen: LogOut,
    type: 'over'
  }

})

export default ProfileNavigator
