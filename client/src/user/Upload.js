import React, {Component} from 'react';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import renderIf from 'render-if';
import Cloud from './Cloud';
import tinycolor from 'tinycolor2';
import Profile from '../Profile';
import axios from 'axios';
import Wheel from './Wheel';
import DetectedSquare from './DetectedSquare'

var upload;
var detect;

class Upload extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: '',
            colorResponse: [],
            imageColors: []
        }
    }

    uploadWidget = () => {
      let imageURL;
      let base = this
        window.cloudinary.openUploadWidget({ cloud_name: 'huecloud', upload_preset: 'p22agdmm', tags:[], stylesheet: './CloudinaryWidget.css'},
            function(error, result) {
             base.setState({imageUrl: result[0].secure_url});
             console.log(base.state.imageUrl)
            });
    }

    detectColors = (e) => {
      let base = this
      e.preventDefault;
         axios.post('/detection',{
          imageURL: this.state.imageUrl
      }).then(dataObj => {
          console.log(dataObj)
          this.setState({colorResponse: dataObj.data.results[0]})
          this.setState({imageColors: dataObj.data.results[0].info.image_colors})
          console.log(base.state.colorResponse);
          console.log('THIS IS IMAGE COLORS');
          console.log(base.state.imageColors);
      }).catch(err => {
          console.log('backend error we hope', err)
      })
    }

	render(){
    if (this.state.imageColors.length > 0){
    } else {
      upload = <Cloud callback={this.uploadWidget} url={this.state.imageUrl} />
      detect = <button onClick={this.detectColors}>Detect Colors</button>
    }
		return(
      <div className="div--container__upload">
        {upload}
        {detect}
        {this.state.imageColors.map( color => (
          <div className="div--container__square"><DetectedSquare background={color} renderWheelStoreColor={this.props.renderWheelStoreColor}/></div>
          )
        )}
        </div>
		)
	}
}




export default Upload;