import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import Login from "./Login"
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    //Setting up Web3
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3 //Declare Web3


    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    if(networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      this.setState({ dstorage })
      // Get files amount
      const filesCount = await dstorage.methods.fileCount().call()
      this.setState({ filesCount })

      const name1 =dstorage.methods.name1(this.state.account).call();
      this.setState({ name1 })
      
      const password =dstorage.methods.password(this.state.account).call();
      this.setState({ password })

      const all =dstorage.methods.all(this.state.account).call();
      this.setState({ all })

      const occ =dstorage.methods.occ(this.state.account).call();
      this.setState({ occ })

      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
       
      }
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
    this.setState({loading: false})

  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()
    
    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  //Upload File
  uploadFile = description => {

    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result.size)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // Assign value for the file without extension
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       
       window.location.reload()
      }).on('error', (e) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
    })
    
  }

  login = password  => {

  //  console.log("Submitting file to IPFS...")

    // Add file to the IPFS
   

      this.setState({ loading: true })
      // Assign value for the file without extension
      
      this.state.dstorage.methods.login(password,'owner').send({ from: this.state.account }).on('transactionHash', () => {
       
       
       window.location.reload()
      }).on('error', (events) =>{
        window.alert('Error')
        this.setState({loading: false})
      })
   
    
  }
  
  
  logout = ()  => {

    //  console.log("Submitting file to IPFS...")
  
      // Add file to the IPFS
     
  
        this.setState({ loading: true })
        // Assign value for the file without extension
        
        this.state.dstorage.methods.logout('owner').send({ from: this.state.account }).on('transactionHash', (hash) => {
         
         
         window.location.reload()
        }).on('error', (even) =>{
          window.alert('Error')
          this.setState({loading: false})
        })
     
      
    }
    

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      hashArray: [],
      loading: false,
      type: null,
      name: null
    }

    //Bind functions
  }

  render() {
  
      return (
      
              
        <div>
          <Navbar account={this.state.account} />
          
          { this.state.loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            
            : <Main
                files={this.state.files}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
                 login={this.login}
                logout={this.logout}
                acc={this.state.account}
                hashArray={this.state.hashArray}
              />
          }
        </div>
        
      
        
      );
    
   
     
    
    
  }
}

export default App;