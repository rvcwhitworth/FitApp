import SwipeNavigator from 'react-native-swipe-navigation'
import DailyWorkouts from './DailyWorkouts'
import Diet from './Diet'
import Profile from './profile'
import LogOut from './logOut.js'
import Data from './DataHome.js'
import DataDiet from './DataScreen.js'
import BodyComposition from './bodyComposition'
import Chat from './Chat.js'
import VideoChat from './VideoChat.js'
import DailyInputs from './DailyInputs.js'

const ProfileNavigator = new SwipeNavigator({

  //FIRST TAB SET (Inputs/Profile)
  Profile: {
    screen: Profile,
    right: 'DailyDiet',
    left: 'DailyWorkouts',
    top: 'LogOut',
    bottom: 'DailyInputs',
    type: 'over'
  },

  DailyInputs: {
  screen: DailyInputs,
  color: '#FFFFFF',
  type: 'over'
  },

  DailyWorkouts: {
    screen: DailyWorkouts,
    color: '#FFFFFF',
    type: 'over',
  },

  DailyDiet: {
    screen: Diet,
    top: 'LogOut',
    color: '#FFFFFF',
    type: 'over',
  },

  LogOut: {
    screen: LogOut,
    type: 'over'
  },

  //SECOND TAB SET (Data)
  DataDiet: {
    screen: DataDiet,
    type: 'over',
    color: '#FFFFFF'
  },

  DataBodyComposition:{
    screen: BodyComposition,
    type: 'over',
    color: '#FFFFFF'
  },

  Data: {
    screen: Data,
    color: '#FFFFFF',
    type: 'over',
    top: 'DataDiet',
    bottom: 'DataBodyComposition'
  },

  //CHAT MESSAGING AND VIDEO ROUTES
  Messages:{
    screen: Chat,
    type: 'over',
    color: '#FFFFFF'
  },

  Video: {
    screen: VideoChat,
    type: 'over',
    color: '#FFFFFF'
  }

})

export default ProfileNavigator
