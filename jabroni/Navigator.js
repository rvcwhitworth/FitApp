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
import Camera from './utilities/camera.js'
import WorkoutPlans from './trainer/trainerPlans.js'
import Roster from './trainer/trainerRoster.js'
import DataDailyWorkouts from './client/dataDailyWorkouts.js'
import Photos from './client/Photos.js'
import RosterClientDiet from './trainer/clientDiet.js'
import RosterClientPlan from './trainer/clientPlans.js'
import RosterClientWorkout from './trainer/clientWorkouts.js'
import RosterClientBodyComposition from './trainer/clientBodyComp.js'



const ProfileNavigator = (type) => {

if(type === 'client'){
  return (topNav) => {

    const logOutFactory = () => {
      return (
        <LogOut topNav={topNav} />
      )
    }

    const ProfileFactory = (nav) => {
      return (
        <Profile topNav={topNav} nav={nav.nav}/>
      )
    }

    const DailyInputsFactory = (nav) => {
      return (
        <DailyInputs topNav={topNav} nav={nav.nav}/>
      )
    }

    const DailyWorkoutsFactory = (nav) => {
      return (
        <DailyWorkouts topNav={topNav} nav={nav.nav}/>
      )
    }

    const DailyDietFactory = (nav) => {
      return (
        <Diet topNav={topNav} nav={nav.nav}/>
      )
    }

    const DataDietFactory = (nav) => {
      return (
        <DataDiet topNav={topNav} nav={nav.nav}/>
      )
    }

    const BodyCompositionFactory = (nav) => {
      return (
        <BodyComposition topNav={topNav} nav={nav.nav}/>
      )
    }
    
    const DataFactory = (nav) => {
      return (
        <Data topNav={topNav} nav={nav.nav}/>
      )
    }

    const DataDailyWorkoutsFactory = (nav) => {
      return (
        <DataDailyWorkouts topNav={topNav} nav={nav.nav}/>
      )
    }

    const PlanScreenFactory = (nav) => {
      return (
        <PlanScreen topNav={topNav} nav={nav.nav}/>
      )
    }
    
    const TeamScreenFactory = (nav) => {
      return (
        <TeamScreen topNav={topNav} nav={nav.nav}/>
      )
    }
    
    const PhotosFactory = (nav) => {
      return (
        <Photos topNav={topNav} nav={nav.nav}/>
      )
    }
    
return new SwipeNavigator({

  //FIRST TAB SET (Inputs/Profile)
  Home: {
    screen: ProfileFactory,
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
    screen: DailyInputsFactory,
    // right: 'DailyDiet',
    top: 'Profile',
    // left: 'DailyWorkouts',
    color: '#FFFFFF',
    type: 'push'
  },

  DailyWorkouts: {
    screen: DailyWorkoutsFactory,
    // bottom: 'DailyInputs',
    // top: 'LogOut',
    right: 'Profile',
    color: '#FFFFFF',
    type: 'over',
  },

  DailyDiet: {
    screen: DailyDietFactory,
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
    screen: DataDietFactory,
    type: 'over',
    color: '#FFFFFF'
  },

  DataBodyComposition:{
    screen: BodyCompositionFactory,
    type: 'over',
    color: '#FFFFFF'
  },

  Data: {
    screen: DataFactory,
    color: '#FFFFFF',
    type: 'over',
    right: 'DataDiet',
    left: 'DataDailyWorkouts',
    bottom: 'DataBodyComposition',
    top: 'LogOut'
  },

  DataDailyWorkouts: {
    screen: DataDailyWorkoutsFactory,
    color: '#FFFFFF',
    type: 'over'
  },
  //THIRD TAB SET (PLAN)
  Plan: {
    screen: PlanScreenFactory,
    type: 'over'
  },
  //FOUTH TAB SET (TEAM)
  Team: {
    screen: TeamScreenFactory,
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

  Photos: {
    screen: PhotosFactory,
    type: 'over'
  }

})()
}

} else if(type === 'test'){
  return (topNav) => {

  const logOutFactory = () => {
    return (
      <LogOut topNav={topNav} />
      )
  }

  const TrainerLandingFactory = (nav) => {
    return (
      <TrainerLanding topNav={topNav} nav={nav.nav}/>
      )
  }

  const ProfileFactory = (nav) => {
    return (
      <TrainerProfile topNav={topNav} nav={nav.nav}/>
      )
  }

  const TrainerFeedFactory = (nav) => {
    return (
      <TrainerFeed topNav={topNav} nav={nav.nav}/>
      )
  }
  
  const RosterFactory = (nav) => {
    return (
      <Roster topNav={topNav} nav={nav.nav}/>
      )
  }

  const WorkoutPlansFactory = (nav) => {
    return (
      <WorkoutPlans topNav={topNav} nav={nav.nav}/>
      )
  }
  return new SwipeNavigator({

  //FIRST TAB TEST SET (Inputs/Profile)
  Home: {
    screen: TrainerLandingFactory,
    type: 'over',
    top: 'LogOut',
    left: 'Profile',
    right: 'Feed'
  },

  Profile: {
    screen: ProfileFactory,
    top: 'LogOut',
    type: 'over'
  },

  Feed: {
    screen: TrainerFeedFactory,
    top: 'LogOut',
    type: 'over'
  },

  LogOut: {
    screen: logOutFactory,
    top: 'LogOut',
    type: 'over'
  },

  Roster: {
    screen: RosterFactory,
    type: 'over',
    top: 'LogOut'
  },

  Plans: {
    screen: WorkoutPlansFactory,
    type: 'over',
    top: 'LogOut'
  },

  Messages:{
    screen: Chat,
    type: 'over',
    color: '#FFFFFF'
  },

  ClientDiet: {
    screen: RosterClientDiet,
    type: 'over',
    top: 'LogOut'
  },

  ClientPlan: {
    screen: RosterClientPlan,
    type: 'over',
    top: 'LogOut'
  },

  Camera: {
    screen: Camera,
    type: 'push',
  },

  ClientWorkout: {
    screen: RosterClientWorkout,
    type: 'over',
    top: 'LogOut'
  },

  ClientBodyComp: {
    screen: RosterClientBodyComposition,
    type: 'over',
    top: 'LogOut'
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
