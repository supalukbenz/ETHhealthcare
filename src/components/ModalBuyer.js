import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import detail_logo from '../images/detail-logo.png';
import info_img from '../images/buycourse-info.png'

class ModalBuyer extends Component {
  render() {   
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <img src={detail_logo} alt='ethospital_logo' className="img-nav img-detail"/>                          
            <div className='modal-detail-name'>{this.props.courseName}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
            <img src={info_img} alt='ethospital_logo' className="img-nav img-detail"/>              
            <form onSubmit={(event) => {
              event.preventDefault()
              
              const email = this.email.value                            
              const name = this.props.courseId
              const value = this.props.price 
              this.props.purchaseCourse(name, value, email)
              
            }}>
        

              <div className="form-row">                

                <div className="form-group col-md-6">
                  <label htmlFor="inputAddress" className='form-title'>Email</label>
                  <input
                    id="email"
                    type="text"
                    ref={(input) => { this.email = input }}
                    className="form-control"
                    placeholder="Email"
                    required />
                </div>
              </div>                              
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn button-add-course button-modal-course" 
                onClick={this.props.onHide}>Submit</button>

              </div>                                    
            </form>
            
            </div>
          </Modal.Body>
          <Modal.Footer>            
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalBuyer;
