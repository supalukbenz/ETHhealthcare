import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import PatientRecord from '../abis/PatientRecord.json';
import Navbar from './Navbar'
import Main from './Main'
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }  

  async loadWeb3() {   
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();        
    }
    // Legacy dapp browsers
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);                    
    }
    // Non-dapp browsers
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] }) 
    const networkId = await web3.eth.net.getId()
    const networkData = PatientRecord.networks[networkId]
    if(networkData) {
      const patientRecord = web3.eth.Contract(PatientRecord.abi, networkData.address)      
      this.setState({ patientRecord })
      const patientCount = await patientRecord.methods.patientCount().call()
      this.setState({ patientCount })
      //load patients
      for(var i = 1; i <= patientCount; i++){
        const patient = await patientRecord.methods.patients(i).call()
        this.setState({
          patients: [...this.state.patients, patient]
        })
      }
      this.setState({ loading: false })
      
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      patientCount: 0,
      patients: [],
      loading: true
    }
    this.createPatient = this.createPatient.bind(this)
    this.purchasePatient = this.purchasePatient.bind(this)
  }

  refreshPage() {
    window.location.reload(false);
  }

  createPatient(name, price) {
    this.setState({ loading: true })
    this.state.patientRecord.methods.createPatient(name, price).send({ from: this.state.account }).on('confirmation', (reciept) => {
      this.setState({ loading: false })
      this.refreshPage()
    })    
  }

  purchasePatient(id, price) {
    this.setState({ loading: true })
    this.state.patientRecord.methods.purchasePatient(id).send({ from: this.state.account, value: price }).on('confirmation', (reciept) => {
      this.setState({ loading: false })
      this.refreshPage()
    }) 
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                : <Main 
                  patients={this.state.patients} 
                  createPatient={this.createPatient}
                  purchasePatient={this.purchasePatient}/> 
              }              
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
