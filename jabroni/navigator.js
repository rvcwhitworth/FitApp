import SwipeNavigator from 'react-native-swipe-navigation'
import DailyInputs from './DailyInputs'
import Diet from './Diet'
import Profile from './profile'
import LogOut from './logOut.js'
import Data from './DataHome.js'
import DataDiet from './DataScreen.js'
import BodyComposition from './bodyComposition'

const ProfileNavigator = new SwipeNavigator({
  Profile: {
    screen: Profile,
    top: 'Diet',
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
  },

  DataDiet: {
    screen: DataDiet,
    type: 'place',
    color: '#FFFFFF'
  },

  DataBodyComposition:{
    screen: BodyComposition,
    type: 'place',
    color: '#FFFFFF'
  },

  Data: {
    screen: Data,
    color: '#FFFFFF',
    type: 'over',
    top: 'DataDiet',
    bottom: 'DataBodyComposition'
  }

})

export default ProfileNavigator
