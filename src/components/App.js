import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import CourseDetails from '../abis/CourseDetails.json';
import Main from './Main';
import ModalAdd from './ModalAdd';
import ethospital_logo from '../images/ethospital-logo.png';
import nav_logo from '../images/nav-logo.png';
import { Button } from 'react-bootstrap';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()     
    await this.loadBlockchainData()     
    window.ethereum.on('accountsChanged', function (accounts) {        
      window.location.reload(false);                     
    });   
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
    const networkData = CourseDetails.networks[networkId]    
  
    if(networkData) {
      const courseDetails = web3.eth.Contract(CourseDetails.abi, networkData.address)            
      
      this.setState({ courseDetails })
      
      const courseCount = await courseDetails.methods.courseCount().call()

      this.setState({ courseCount })
      
      //load
      for(var i = 1; i <= courseCount; i++){
        const course = await courseDetails.methods.courses(i).call()
        this.setState({
          courses: [...this.state.courses, course]
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
      courseCount: 0,
      courses: [],

      loading: true,
      modalShow: false
    }
    this.createCourse = this.createCourse.bind(this)
    this.purchaseCourse = this.purchaseCourse.bind(this)
    
  }

  showModal = () => {
    this.setState({ show: true });
  };
  

  hideModal = () => {
    this.setState({ show: false });
  };

  refreshPage() {
    window.location.reload(false);
  }

  createCourse(courseName, detail, doctorName, hospitalName, dateAppoint, price) {
    this.setState({ loading: true })
    this.state.courseDetails.methods.createCourse(
      courseName,
      
      detail,
      doctorName,
      hospitalName,
      dateAppoint,
      price
      ).send({ from: this.state.account }).on('confirmation', (reciept) => {
      this.setState({ loading: false })
      this.refreshPage()
    })    
  }


  purchaseCourse(id, price, emailCustomer) {
    this.setState({ loading: true })
    this.state.courseDetails.methods.purchaseCourse(id, emailCustomer).send({ from: this.state.account, value: price }).on('confirmation', (reciept) => {
      this.setState({ loading: false })
      this.refreshPage()
    }) 
  }

  render() {  
    let addModalClose = () => this.setState({ modalShow: false })  
    return (
      <div>        
        <nav className="navbar navbar-menu fixed-top flex-md-nowrap shadow">
        <img src={nav_logo} alt='ethospital_logo' className="img-nav"/>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
            {(() => {
              if(this.state.account === '0x7442D61968fc495A0c99509DD32CDc51bB657311'){
                return(
                <Button            
                className='button-add-course'
                onClick={ () => this.setState({ modalShow: true }) }
                >Add Course</Button>
                )
              } else {
                return(
                null
                )
              }
            })()}              
              <ModalAdd
              show={this.state.modalShow}
              onHide={addModalClose}
              courses={this.state.courses} 
              account={this.state.account}
              createCourse={this.createCourse}
              />                   
          </ul>            
        </nav>
        
        <div className="container-fluid mt-5">
          <img src={ethospital_logo} alt='ethospital_logo' className="img-logo"/>
          <div className="row">            
            <main role="main" className="col-lg-12 d-flex text-center main-table">            
              { this.state.loading 
                ? <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                    <div className="spinner-border text-info"></div>
                  </div> 
                : <Main 
                  courses={this.state.courses} 
                  account={this.state.account}                  
                  createCourse={this.createCourse}
                  purchaseCourse={this.purchaseCourse}/> 
              }                          
            </main>
          </div>
        </div>        
      </div>
    );
  }
}

export default App;
 