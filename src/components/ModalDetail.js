import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';
import detail_logo from '../images/detail-logo.png';

class ModalDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(),
      tomorow: new Date().getDate+1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
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
          <Modal.Body className='modal-body'>
            <div className='modal-detail-doctor'>&#10009; Doctor: {this.props.doctorName}</div>
            <div className='modal-detail-hospital'>Hospital: {this.props.hospitalName}</div>
            <div className='modal-detail-title'><h4>Detail</h4></div>
            <div className='modal-detail-p'>              
              {this.props.detail}
            </div>
            <div className='modal-detail-date'>Course date: {new Date(this.props.datetimeAppoint*1000).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div className='modal-detail-time'>{new Date(this.props.datetimeAppoint*1000).toLocaleString('default', { hour: '2-digit', minute: '2-digit' })}</div>
          </Modal.Body>
          <Modal.Footer>            
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalDetail;
