import React, { Component } from 'react';
import axios from 'axios';
import FileService from "../services/FileService";

class Uploader extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : ""
    }
  }

  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    FileService.getUrl(file.name).then(response => {
      console.log(response);
      var url = response.data.url;
      this.setState({url: url});

      let fileParts = file.name.split('.');
      // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileParts[fileParts.length - 1]
        }
      };
      console.log(file);
      axios.put(url,file,options)
      .then(result => {
        console.log("Response from s3");
        console.log(result);
        this.setState({success: true});
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  };

  render() {
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default Uploader;