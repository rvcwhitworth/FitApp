import App from './jabroni/App'
import LogOut from './jabroni/logOut'
import SwipeNavigator from 'react-native-swipe-navigation'
import nav from './jabroni/navigator';

const TopNavigator = SwipeNavigator({
  App: {
    screen: nav,
    top: 'LogOut',
    type: 'place'
  },

  LogOut: {
    screen: LogOut,
    type: 'over',
  }
})

export default TopNavigator