import React from 'react'
import { Keyboard, Picker, AsyncStorage, Alert, Button, View, Text, TextInput, StyleSheet, Animated, Dimensions } from 'react-native'
import { withApollo, graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import SVG from '../SVG/svg5Right.js'
import FooterNav from './FooterNav.js'
import Chat from '../utilities/chatIcon'
import axios from 'axios';
import config from '../../TOKENS';
import { dietPlans, user } from '../utilities/dataStore.js';

axios.defaults.headers.post['x-app-id'] = config.nutritionixConfig.appId;
axios.defaults.headers.post['x-app-key'] = config.nutritionixConfig.apiKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const NIX_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const { width, height } = Dimensions.get('window');

class DietScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
      dietInput: '',
      user: user,
      foods: [],
      carbs: 0,
      fat: 0,
      protein: 0,
      calories: 0,
      loading: true,
      selectedDay: new Date().getDay(),
      dietPlan: JSON.parse(dietPlans[dietPlans.length - 1].diet)
    }

    this.state.dailyDiet = this.state.dietPlan[this.state.selectedDay]

    this.handleDietChange = this.handleDietChange.bind(this);
    this.handleDietSubmit = this.handleDietSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.props.nav.cleanUp()
    const { nav } = this.props;

    nav.onNavigateLeftShouldAllow((...args) => {
        return true;
      });

    nav.onNavigateShouldAllow(() => {
      this.props.nav.cleanUp('DailyInputs')
      this.props.nav.cleanUp('DailyDiet')
       return true;
    });

    nav.onNavigateLeftStartedListener(({interpolation, start, end, isBack, isMain}) => {
      this.props.nav.cleanUp('DailyInputs')
      this.props.nav.cleanUp('DailyDiet')
      isBack = false
      return isBack

      if(isBack) {
        this.props.nav.cleanUp('DailyInputs')
      } else if(isBack) {
      }
    })

    nav.onNavigateLeftCompletedListener(({completed, isBack}) => {
      this.props.nav.cleanUp()
    })

    nav.onNavigateRightStartedListener(({isBack, isMain}) => {
      if(!isMain) {
        this.setState({color: 'transparent'})
      }
    })

    nav.onNavigateRightCompletedListener(({completed}) => {
      if(completed) {
        this.setState({color: '#9575CD'})
      }
    })
  }

  componentWillUnmount() {
    this.props.nav.cleanUp()
  }

  updateMacros () {
    let nutrition = this.state.foods.reduce((nutrition, food) => {
      nutrition.calories += food.nf_calories;
      nutrition.carbs += food.nf_total_carbohydrate;
      nutrition.fat += food.nf_total_fat;
      nutrition.protein += food.nf_protein;
      return nutrition;
    }, {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0
    });

    this.setState({
      carbs: nutrition.carbs,
      calories: nutrition.calories,
      fat: nutrition.fat,
      protein: nutrition.protein
    })
  }

  handleDietChange (dietInput) {
    this.setState({dietInput});
  }

  handleSelectChange (selectedDay) {
    this.setState({
      selectedDay, 
      dailyDiet: this.state.dietPlan[selectedDay], 
      foods: [],    
      carbs: 0,
      fat: 0,
      protein: 0,
      calories: 0
    });
  }

  handleDietSubmit () {
    if (!this.state.dietInput.length) {
      Alert.alert('Invalid input!', 'Please enter diet into field.');
    } else {
      Keyboard.dismiss();
      axios.post(NIX_URL, {
        query: this.state.dietInput
      })
      .then(({data}) => {
        this.setState({
          dietInput: '',
          foods: this.state.foods.concat(data.foods)
        }, () => this.updateMacros())
      })
    }
  }

  render() {
    if (this.state.loading) {
      return (<View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
        <View style={{flex:1}}>
        <SVG />
        </View>
        <View>
        <Text>Loading!</Text>
        <Chat nav={this.props.nav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>)
    }

    return (
      <View style={{flexDirection:'column', width:width, height:height, backgroundColor: 'white'}}>
      <View style={{flex:1}}>
      <SVG />
      </View>
        <View style={styles.container}>
          <Text style={styles.header}>Diet Entry</Text>

          <Picker
            selectedValue={this.state.selectedDay}
            onValueChange={this.handleSelectChange}
            itemStyle={{textAlign: 'center'}}
            style={{alignSelf: 'center', alignContent: 'center', width: 150}}
          >
            <Picker.Item label="Sunday" value={0} />
            <Picker.Item label="Monday" value={1} />
            <Picker.Item label="Tuesday" value={2} />
            <Picker.Item label="Wednesday" value={3} />
            <Picker.Item label="Thursday" value={4} />
            <Picker.Item label="Friday" value={5} />
            <Picker.Item label="Sunday" value={6} />
          </Picker>

          <TextInput
            style={{margin: 10, height: 100}}
            placeholder={'e.g. For breakfast I had 3 eggs and a bagel...'}
            multiline={true}
            onChangeText={this.handleDietChange}
            value={this.state.dietInput}
          />
          <Button
            title={'submit'}
            onPress={this.handleDietSubmit}
          />

          <View style={{flex: 1, marginTop: 5, justifyContent: 'space-around'}} >
            <Text style={styles.subHeader}>You can still have:</Text>
            <Text style={styles.item}>{(this.state.dailyDiet.calories - this.state.calories).toFixed(2)} calories</Text>
            <Text style={styles.item}>{(this.state.dailyDiet.carbs - this.state.carbs).toFixed(2)} grams of carbs</Text>
            <Text style={styles.item}>{(this.state.dailyDiet.protein - this.state.protein).toFixed(2)} grams of protein</Text>
            <Text style={styles.item}>{(this.state.dailyDiet.fat - this.state.fat).toFixed(2)} grams of fat</Text>
          </View>

          <Chat nav={this.props.nav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 9,
    margin: 10,
    alignContent: 'center'
  },
  header: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  }, 
  subHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  item: {
    textAlign: 'center',
    fontSize: 18
  }
})

export default withApollo(DietScreen);