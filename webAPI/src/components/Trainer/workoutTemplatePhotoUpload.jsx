import React from 'react';
import ReactDOM from 'react-dom';


function workoutTemplatePhotoUpload(props){
    if(props.img.length > 0){
    return(
      <img className="card-img-top" src={props.img} alt="Card image cap" />
      )}
    else{
      return(
        <div className='card-img-top' style={{justifyConetent:'center'}}>
          <form method="POST" action="/server/pic" encType="multipart/form-data" target='_self' style={{zIndex:'1'}}>
            <input type='file' id='file' name='file' style={{zIndex:'1'}}/>
            <button type='button' className="btn btn-lg" onClick={props.handleFile} style={{zIndex:'1'}}>Workout Img</button>
          </form>
        </div>
        )
    }
  }








export default workoutTemplatePhotoUpload