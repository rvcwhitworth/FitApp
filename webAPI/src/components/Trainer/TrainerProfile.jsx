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
      this.edit = this.edit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
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
    console.log(this.props, 'do we know redux?')
    if(!this.state.editing){
      return(
<div>
  <div id='test' className='container'>
  <button type='button' className="btn btn-lg" onClick={this.edit}> Edit Page </button>
  </div>
  <img src={this.state.backgroundImage} style={{zIndex: -1, width:'100%', height:'100%', position: 'absolute'}} />
  <div className='container' style={{justifyConetent:'center'}}>
  <h2 style={{color:'white', zIndex:999}}>Set up your profile</h2>
  <img src={this.state.ProfileImage} style={{maxWidth: 250, maxHeight:250, display: 'block', margin:'0 auto'}} />
  </div>
  </div>
    )} else{
  return(
    <div className='container' style={{justifyConetent:'center'}}>
      <form method="POST" action="/server/pic" encType="multipart/form-data" target='_self' style={{zIndex:'1'}}>
    <input type='file' id='file' name='file' style={{zIndex:'1'}}/>
    <button type='button' className="btn btn-lg" onClick={this.handleBackground} style={{zIndex:'1'}}>Background Image</button>
  </form>
  <form method="POST" action="/server/pic" encType="multipart/form-data" target='_self' style={{zIndex:'1'}}>
    <input type='file' id='Profile' name='Profile' style={{zIndex:'1'}}/>
    <button type='button' className="btn btn-lg" onClick={this.handleProfile} style={{zIndex:'1'}}>Profile Picture</button>
  </form>
    <button type='button' className="btn btn-lg" onClick={this.edit}>Save Changes</button>
    </div>
    )
}
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