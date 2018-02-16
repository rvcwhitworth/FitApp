import React from 'react'
import { Keyboard, Picker, AsyncStorage, Alert, Button, View, Text, TextInput, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { withApollo, graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import SVG from '../SVG/svg5Right.js'
import FooterNav from './FooterNav.js'
import Chat from '../utilities/chatIcon'
import axios from 'axios';
import config from '../../TOKENS';
import firebase from '../utilities/firebase.js'

const database = firebase.database();
axios.defaults.headers.post['x-app-id'] = config.nutritionixConfig.appId;
axios.defaults.headers.post['x-app-key'] = config.nutritionixConfig.apiKey;
axios.defaults.headers.post['Content-Type'] = 'application/json';
const NIX_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const { width, height } = Dimensions.get('window');

// graphQL queries and mutations:
import {getDietPlans as dietQuery} from '../utilities/queries.js';
import {spotterQuery} from '../utilities/queries.js';
import {setDailyRecord} from '../utilities/mutations.js';

class DietScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: 'transparent',
      dietInput: '',
      foodName: '',
      foods: [],
      carbs: 0,
      fat: 0,
      protein: 0,
      calories: 0,
      loading: true,
      trainer: '',
      selectedDay: new Date().getDay()
    }

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

    AsyncStorage.getItem('@FitApp:UserInfo')
    .then((userInfoString) => {
      this.state.user = JSON.parse(userInfoString);
      this.props.client.query({
        query: dietQuery,
        variables: {
          id: this.state.user.id
        }
      })
      .then(({data}) => {
        // console.log('USER INFO +++===>>', this.state.user)

        this.props.client.query({
          query: spotterQuery,
          variables: {
            id: this.state.user.id
          }
        })
        .then(({data}) => {
          this.setState({trainer: data.getSpotters[0].trainer.id})
          // this.setState({data, loading: false})
        })

        this.setState({dietPlan: JSON.parse(data.getDietPlans[data.getDietPlans.length - 1].diet)}, () => {
          this.setState({dailyDiet: this.state.dietPlan[this.state.selectedDay], loading: false})
        })
      })
    })
    .catch((err) => console.error('Error retrieving user info from storage!', err));
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
    }, ()=>{
      AsyncStorage.getItem("@FitApp:UserInfo", (err, val) => {
      if ( err ) {
        console.log('error: ', err);
      } else {
          let id = JSON.parse(val).id;
          let data = {
            carbs: this.state.carbs,
            calories: this.state.calories,
            fat: this.state.fat,
            protein: this.state.protein
          }
          this.props.client.mutate({
            mutation: setDailyRecord,
            variables: {
              user_id: id,
              data: JSON.stringify(data)
            }
          });
        
        }
      });

      // why use firebase?
      // var date = new Date().toDateString();
      // database.ref('UserData/' + this.state.trainer).push({id: this.state.user.id, order: new Date().valueOf(), date: date, user: this.state.user.fullName, 
      //   diet: {name: this.state.foodName, carbs: this.state.carbs, calories: this.state.calories, fat: this.state.fat, protein: this.state.protein}});
    });
  }

  handleDietChange (dietInput) {
    this.setState({dietInput}, () => {
      console.log(this.state.dietInput);
    });
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
          foodName: this.state.dietInput,
          dietInput: '',
          foods: this.state.foods.concat(data.foods)
        }, this.updateMacros)
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
        <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
        </View>
        <FooterNav nav={this.props.nav} index={0}/>
      </View>)
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              <Picker.Item label="Saturday" value={6} />
            </Picker>

            <TextInput
              style={{margin: 10, height: 100}}
              placeholder={'e.g. For breakfast I had 3 eggs and a bagel...'}
              multiline={true}
              onChangeText={this.handleDietChange}
              value={this.state.dietInput}
              onSubmitEditing={Keyboard.dismiss}
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

            <Chat nav={this.props.nav} TopNav={this.props.topNav}/>
          </View>
          <FooterNav nav={this.props.nav} index={0}/>
        </View>
      </TouchableWithoutFeedback>
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
});

export default withApollo(DietScreen);