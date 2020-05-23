import React, { Component } from 'react';

class BuyCourse extends Component {

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    return (
      <div>
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

export default BuyCourse;
