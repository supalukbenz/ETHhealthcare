import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import detail_logo from '../images/detail-logo.png';
import addcourse_img from '../images/addcourse-img.png'

class ModalAdd extends Component {
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
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
            <img src={addcourse_img} alt='ethospital_logo' className="img-nav img-detail"/>              
            <form onSubmit={(event) => {
              event.preventDefault()
              const courseName = this.courseName.value
              
              const detail = this.detail.value
              const doctorName = this.doctorName.value
              const hospitalName = this.hospitalName.value
              const datetime = this.dateAppoint.value +' '+ this.timeAppoint.value
              const datetimeAppoint = new Date(datetime).getTime()/1000

              const coursePrice = window.web3.utils.toWei(this.coursePrice.value.toString(), 'Ether')
              this.props.createCourse(
                courseName,
                
                detail,
                doctorName,
                hospitalName,
                datetimeAppoint,
                coursePrice
                )
            }}>
        
              <div className="form-group mr-sm-2">  
              <label htmlFor="inputAddress" className='form-title'>Course name</label>
                <input
                  id="courseName"
                  type="text"
                  ref={(input) => { this.courseName = input }}
                  className="form-control"
                  placeholder="Course name"
                  required />
              </div>
              <div className="form-row">                
                <div className="form-group col-md-6">
                  <label htmlFor="inputAddress" className='form-title'>Hospital</label>
                  <input
                    id="hospitalName"
                    type="text"                  
                    ref={(input) => { this.hospitalName = input }}
                    className="form-control"
                    placeholder="Hospital"
                    required />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputAddress" className='form-title'>Doctor</label>
                  <input
                    id="doctorName"
                    type="text"
                    ref={(input) => { this.doctorName = input }}
                    className="form-control"
                    placeholder="Course doctor"
                    required />
                </div>
              </div>              
              <div className="form-group mr-sm-2">
              <label htmlFor="inputAddress" className='form-title'>Detail</label>
                <textarea
                  id="detail"
                  type="text"
                  rows="5"
                  ref={(input) => { this.detail = input }}
                  className="form-control rounded-0"
                  placeholder="Course detail"
                  required />
              </div>
              <div className="form-row">
                
                <div className="form-group col-md-6">
                <label htmlFor="inputAddress" className='form-title'>Price</label>
                  <input
                    id="coursePrice"
                    type="text"
                    ref={(input) => { this.coursePrice = input }}
                    className="form-control"
                    placeholder="Course price"
                    required />
                </div>
              </div>  
              <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="inputAddress" className='form-title'>Date</label>
                  <input
                    id="dateAppoint"
                    type="date"
                    min={ new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0,10) }
                    ref={(input) => { this.dateAppoint = input }}
                    className="form-control"
                    placeholder="Date appoint"
                    required />  
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputAddress" className='form-title'>Time</label>
                  <input
                    id="timeAppoint"
                    type="time"
                    ref={(input) => { this.timeAppoint = input }}
                    className="form-control"
                    placeholder="Time appoint"
                    required />
                </div> 
              </div>    
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn button-add-course button-modal-course" onClick={this.props.onHide}>Add Course</button>
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

export default ModalAdd;
