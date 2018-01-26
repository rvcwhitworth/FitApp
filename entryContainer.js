import App from './jabroni/App'
import LogOut from './jabroni/logOut'
import SwipeNavigator from 'react-native-swipe-navigation'

const Navigator = SwipeNavigator({
  App: {
    screen: App,
    top: 'LogOut',
    type: 'place'
  },

  LogOut: {
    screen: LogOut,
    type: 'over',
  }
})

export default Navigator