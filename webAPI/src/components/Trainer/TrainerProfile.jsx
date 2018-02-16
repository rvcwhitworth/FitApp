import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import SetBackground from '../../actions/backgroundImage.jsx'
import SetProfile from '../../actions/profileImage.jsx'
import axios from 'axios'
class TrainerProfile extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        ...this.props
      }
      this.handleBackground = this.handleBackground.bind(this)
      this.handleProfile = this.handleProfile.bind(this)
      this.edit = this.edit.bind(this)
      this.getProfileImg = this.getProfileImg.bind(this)

      this.getProfileImg()

  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  getProfileImg(){
        axios.get("https://fitpics.s3.amazonaws.com/public/" + 4 + "/profilePicture")
        .then((response) => {
          this.setState({
            ProfileImage: `data:image/jpg;base64,${response.data}`
          });
        }).catch(err => console.log('axios error: ', err));

        //probably want a redux dispatch here for rest of components
  }



  handleBackground(){
    console.log('handling background')
    var file = document.getElementById('file').files;
    // console.log(file)
    if (file) {
      console.log('what is FIlereader???', FileReader)
      var BackReader = new FileReader
      BackReader.onload = (e) => {
        var payload = { uri: e.target.result }
        this.setState({
          backgroundImage: e.target.result
        })
      this.props.dispatch(SetBackground(e.target.result))
      };
      BackReader.readAsDataURL(file[0]);

      var formData = new FormData();
      formData.append("image", file[0]);
      // formData.append('user', this.state.id);
    }
  }

  edit(){
    this.setState({
      editing: !this.state.editing
    })
  }

  handleProfile(){
    console.log('handling profile')
    var file = document.getElementById('Profile').files;
    console.log(file)
    if (file) {
      var ProReader = new FileReader
      // console.log(FileReader)
      ProReader.onload = (e) => {
        var payload = { uri: e.target.result }
        this.setState({
          ProfileImage: e.target.result
        })
      this.props.dispatch(SetProfile(e.target.result))
      };
      ProReader.readAsDataURL(file[0]);

      var formData = new FormData();
      formData.append("image", file[0]);
      // formData.append('user', this.state.id);
    }
  }

render() {
  console.log('gimme dat props', this.props)
  console.log('gimme dat state', this.state)

      return(
<div>
  <div id='test' className='container'>
  </div>
  <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
  <div className='container' style={{justifyConetent:'center'}}>
  <img src={this.state.ProfileImage} style={{maxWidth: 250, maxHeight:250, display: 'block', margin:'0 auto'}} />
  </div>
  </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('TrainerProfileStore', store);
  let temp = store.auth
  return {
    ...temp
  };
};

export default withRouter(connect(
  mapStoreToProps
)(TrainerProfile));