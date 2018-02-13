import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../../actions/example.jsx'
import SetBackground from '../../actions/backgroundImage.jsx'
import SetProfile from '../../actions/profileImage.jsx'

class TrainerProfile extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        backgroundImage: this.props.backgroundImage,
        ProfileImage: this.props.ProfileImage,
        editing: false
      }
      this.handleBackground = this.handleBackground.bind(this)
      this.handleProfile = this.handleProfile.bind(this)
      this.save = this.save.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }



  handleBackground(){
    console.log('handling background')
    var file = document.getElementById('background').files;
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

  save(){
    this.handleProfile()
    this.handleBackground()
  }

  handleProfile(){
    console.log('handling profile')
    var file = document.getElementById('Profile').files;
    console.log(file)
    if (file) {
      var ProReader = new FileReader
      // console.log(FileReader)
      ProReader.onload = (e) => {
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
    console.log(this.props, 'do we know redux?')
  return(
    <div className='container' style={{justifyConetent:'center'}}>
    <h2> Background Image </h2>
      <form method="POST" action="/server/pic" encType="multipart/form-data" target='_self' style={{zIndex:'1'}}>
    <input type='file' id='background' name='file' style={{zIndex:'1'}}/>
  </form>
  <h2> Profile Picture </h2>
  <form method="POST" action="/server/pic" encType="multipart/form-data" target='_self' style={{zIndex:'1'}}>
    <input type='file' id='Profile' name='Profile' style={{zIndex:'1'}}/>
  </form>
    <button type='button' className="btn btn-lg" onClick={this.save}>Save Changes</button>
    </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.auth.username,
    goals: store.auth.goals,
    backgroundImage: store.branding.backgroundImg,
    ProfileImage: store.branding.profileImg
  };
};

export default withRouter(connect(
  mapStoreToProps
)(TrainerProfile));