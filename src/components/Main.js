import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Patient</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.patientName.value
          const price = window.web3.utils.toWei(this.patientPrice.value.toString(), 'Ether')
          this.props.createPatient(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="patientName"
              type="text"
              ref={(input) => { this.patientName = input }}
              className="form-control"
              placeholder="Patient Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="patientPrice"
              type="text"
              ref={(input) => { this.patientPrice = input }}
              className="form-control"
              placeholder="Patient Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Patient</button>
        </form>
        <p> </p>
        <h2>Buy Patient</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="patientList">
            { this.props.patients.map((patient, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{patient.id.toString()}</th>
                  <td>{patient.name}</td>
                  <td>{window.web3.utils.fromWei(patient.price.toString(), 'Ether')} Eth</td>
                  <td>{patient.owner}</td>
                  <td>
                    { !patient.purchased ? 
                      <button 
                        name={patient.id}
                        value={patient.price}
                        onClick={(event) => {
                          this.props.purchasePatient(event.target.name, event.target.value)
                        }}
                        >
                        Buy
                      </button>
                      : null
                    }                    
                  </td>
                </tr>
              )
            })}            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
