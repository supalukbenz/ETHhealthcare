import React, { Component } from 'react';
import Main from './Main'

class AddCourse extends Component {
  render() {   
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                : <Main 
                  patients={this.state.patients} 
                  account={this.state.account}
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

export default AddCourse;
