import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'
//import App from './App'
//import login from "./Login"
//import Login from './Login'
//import Signup from './Signup';
class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {mode:this.props.all};
    
   // this.handleChange = this.handleChange.bind(this);
    //this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
 

  handleEdit() {
    this.setState({mode: 'edit'});
  }
  
  render() {
   
    if(this.props.all == 0) {
   
    return (
      
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              
             <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                {/* <h2 className="text-white text-monospace bg-dark"><b><ins>LOGout</ins></b></h2> */}
                  {/* <form onSubmit={(even) => {
                    even.preventDefault()
                    const name1 = this.name1.value
                    this.props.logout(name1) */}
                    
                    
                  {/* }} > */}
                      
                      
                      {/* <p className="text-white text-monospace bg-dark">{ this.props.acc }</p> */}
                    {/* <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/> */}
                    {/* <button type="submit" className="btn-primary btn-block"> <b>LOGout!</b></button>
                     */}
                  {/* </form> */}
              </div>



                  {/* <br>
                  </br>
                  <br></br> */}
                  {/* <a target="_blank"
                 alt=""
                
                 rel="noopener noreferrer"
                 >
                {this.props.all} hiiiiiiii
              </a> */}

                

              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>

              {(() => {
        if (this.props.occ == 1) {
         return <h2 className="text-white text-monospace bg-dark"><b><ins>LOGIN</ins></b></h2> 
        }
        else {
        return  <h2 className="text-white text-monospace bg-dark"><b><ins>SIGNUP</ins></b></h2> 
        }
      })()}
                {/* <h2 className="text-white text-monospace bg-dark"><b><ins>LOGIN</ins></b></h2> */}
               
                  {/* <h2 className="text-white text-monospace bg-dark"><b><ins>SIGNUP</ins></b></h2> */}
                
                  <form onSubmit={(events) => {
                    events.preventDefault()
                    const name1 = this.name1.value
                    //this.props.uploadFiles(name1)
                    const password = this.password.value
                    this.props.login(password)
                    //const log =1;
                  }} >
                    
                      <div className="form-group">
                        <br></br>
                          <input
                            id="name1"
                            type="text"
                            ref={(input) => { this.name1 = input }}
                            className="form-control text-monospace"
                            placeholder="NAME..."
                            required />
                      </div>
                      <div className="form-group">
                        <br></br>
                          <input
                            id="password"
                            type="text"
                            ref={(input) => { this.password = input }}
                            className="form-control text-monospace"
                            placeholder="PASSWORD..."
                            required />
                      </div>
                      <p className="text-white text-monospace bg-dark">{ this.props.acc }</p>
                    {/* <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/> */}
                    <button type="submit" className="btn-primary btn-block"><b>GO!!S</b></button>
                  </form>
              </div>

              {/* <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                      <p className="text-white text-monospace bg-dark">{ this.props.acc }</p>
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
              </div>

              <p>&nbsp;</p>
              
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '10px'}}>id</th>
                    <th scope="col" style={{ width: '200px'}}>name</th>
                    <th scope="col" style={{ width: '230px'}}>description</th>
                    <th scope="col" style={{ width: '120px'}}>type</th>
                    <th scope="col" style={{ width: '90px'}}>size</th>
                    <th scope="col" style={{ width: '90px'}}>date</th>
                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                    <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
            </div> */}
            </div>
          </main>
        </div>
      </div>
    );
              }
              else {
                return (
                  <div className="container-fluid mt-5 text-center">
                  <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
                      <div className="content">
                        <p>&nbsp;</p>
                        <form onSubmit={(even) => {
                    even.preventDefault()
                    const name1 = this.fileDescription.value
                    this.props.logout(name1)
                    
                    //const log =0;
                    //const password = this.password.value
                    //this.props.logout(password)
                  }} >
                      
                      
                      {/* <p className="text-white text-monospace bg-dark">{ this.props.acc }</p> */}
                    {/* <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/> */}
                    <button type="submit" className="btn-primary btn-block"> <b>LOGout!</b></button>
                    {/* <a target="_blank"
                 alt=""
                
                 rel="noopener noreferrer"
                 >
                {this.props.all} hiiiiiiii
              </a> */}
                  </form>
                  <br></br> <br></br>
                        <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                      <p className="text-white text-monospace bg-dark">{ this.props.acc }</p>
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
              </div>

              <p>&nbsp;</p>
              <center>
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                    <th scope="col" style={{ width: '10px'}}>id</th>
                    <th scope="col" style={{ width: '200px'}}>name</th>
                    <th scope="col" style={{ width: '230px'}}>description</th>
                    <th scope="col" style={{ width: '120px'}}>type</th>
                    <th scope="col" style={{ width: '90px'}}>size</th>
                    <th scope="col" style={{ width: '90px'}}>date</th>
                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                    <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                  </tr>
                </thead>
                { this.props.files.map((file, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                        <td>{file.fileId}</td>
                        <td>{file.fileName}</td>
                        <td>{file.fileDescription}</td>
                        <td>{file.fileType}</td>
                        <td>{convertBytes(file.fileSize)}</td>
                        <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + file.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.uploader.substring(0,10)}...
                          </a>
                         </td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {file.fileHash.substring(0,10)}...
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
              </center>
            </div>
          </main>
        </div>
      </div>
                        
                );
              }
            
          
  }
}

export default Main;