import React from 'React'
import SwipeNavigator from 'react-native-swipe-navigation'
import DailyWorkouts from './client/DailyWorkouts'
import Diet from './client/Diet'
import Profile from './client/clientProfile.js'
import LogOut from './logOut.js'
import Data from './client/DataHome.js'
import DataDiet from './client/DataScreen.js'
import BodyComposition from './client/bodyComposition'
import Chat from './utilities/Chat.js'
import VideoChat from './utilities/VideoChat.js'
import DailyInputs from './client/DailyInputs.js'
import TeamScreen from './client/TeamScreen.js'
import PlanScreen from './client/PlanScreen.js'
import TrainerLanding from './trainer/trainerLanding.js'
import TrainerProfile from './trainer/trainerProfile.js'
import TrainerFeed from './trainer/trainerFeed.js'
import Camera from './client/camera.js'
import WorkoutPlans from './trainer/trainerPlans.js'
import Roster from './trainer/trainerRoster.js'
import DataDailyWorkouts from './client/dataDailyWorkouts.js'


const ProfileNavigator = (type) => {

if(type === 'client'){
  return (topNav) => {
    const logOutFactory = () => {
      return (
        <LogOut topNav={topNav} />
      )
    }

return new SwipeNavigator({

  //FIRST TAB SET (Inputs/Profile)
  Home: {
    screen: Profile,
    right: 'DailyDiet',
    left: 'DailyWorkouts',
    top: 'LogOut',
    bottom: 'DailyInputs',
    type: 'over'
  },

  Camera: {
    screen: Camera,
    type: 'push',
  },

  DailyInputs: {
    screen: DailyInputs,
    // right: 'DailyDiet',
    top: 'Profile',
    // left: 'DailyWorkouts',
    color: '#FFFFFF',
    type: 'push'
  },

  DailyWorkouts: {
    screen: DailyWorkouts,
    // bottom: 'DailyInputs',
    // top: 'LogOut',
    right: 'Profile',
    color: '#FFFFFF',
    type: 'over',
  },

  DailyDiet: {
    screen: Diet,
    // bottom: 'DailyInputs',
    left: 'Profile',
    // top: 'LogOut',
    color: '#FFFFFF',
    type: 'over',
  },
  
  LogOut: {
    screen: logOutFactory,
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
    right: 'DataDiet',
    left: 'DataDailyWorkouts',
    bottom: 'DataBodyComposition',
    top: 'LogOut'
  },

  DataDailyWorkouts: {
    screen: DataDailyWorkouts,
    color: '#FFFFFF',
    type: 'over'
  },
  //THIRD TAB SET (PLAN)
  Plan: {
    screen: PlanScreen,
    type: 'over'
  },
  //FOUTH TAB SET (TEAM)
  Team: {
    screen: TeamScreen,
    type: 'over'
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
  },

  Camera: {
    screen: Camera,
    type: 'push',
  },

})()
}

} else if(type === 'test'){
  return (topNav) => {

  const logOutFactory = () => {
    return (
      <LogOut topNav={topNav} />
      )
  }

  return new SwipeNavigator({

  //FIRST TAB TEST SET (Inputs/Profile)
  Home: {
    screen: TrainerLanding,
    type: 'over',
    top: 'LogOut',
    left: 'Profile',
    right: 'Feed'
  },

  Profile: {
    screen: TrainerProfile,
    top: 'LogOut',
    type: 'over'
  },

  Feed: {
    screen: TrainerFeed,
    top: 'LogOut',
    type: 'over'
  },

  LogOut: {
    screen: logOutFactory,
    top: 'LogOut',
    type: 'over'
  },

  Roster: {
    screen: Roster,
    type: 'over',
    top: 'LogOut'
  },

  Plans: {
    screen: WorkoutPlans,
    type: 'over',
    top: 'LogOut'
  },

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

  })()
}


 }
}
export default ProfileNavigator
