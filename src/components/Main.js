import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalDetail from './ModalDetail'
import detail_logo from '../images/detail-logo.png';
import info_img from '../images/buycourse-info.png';
class Main extends Component {

  datesSorter(a, b) {
    if (new Date(a) < new Date(b)) return 1;
    if (new Date(a) > new Date(b)) return -1;
    return 0;
  }

  constructor(props) {
    super(props)
    this.state = {      
      modalShow: false,
      modalBuyShow: false,
      detail: null,
      courseName: null,
      emailCustomer: null,
      doctorName: null,
      hospitalName: null,
      datetimeAppoint: null,
      courseId: null
    }
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };


  render() {
    let addModalClose = () => this.setState({ modalShow: false })  
    let buyModalClose = () => this.setState({ modalBuyShow: false })
    let c = 1
    return (    
      <div id="content" className="buy-course-table">        
        <table className="table" data-sorter="datesSorter" data-pagination="true" data-search="true">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Course Name</th>
                          
              <th scope="col">Hospital</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              {/* <th scope="col" data-sortable="true" data-sorter={this.datesSorter}>Date</th> */}
              <th scope="col">Time</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="courseList">
            { this.props.courses.map((course, key) => {              
              return(                   
                <tr key={key}>                  
                  <th scope="row">{c++}</th>
                  <td>{course.courseName}</td>                  
                  
                  <td>{course.hospitalName}</td>
                  <td>{window.web3.utils.fromWei(course.price.toString(), 'Ether')} Eth</td>
                  <td>{new Date(course.datetimeAppoint*1000).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  {/* <td>{course.datetimeAppoint.toString()}</td> */}
                  <td>{new Date(course.datetimeAppoint*1000).toLocaleString('default', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td><Button
                    className='button-table'
                    onClick={() => this.setState(
                      { 
                        modalShow: true,
                        detail: course.detail,
                        courseName: course.courseName,
                        
                        doctorName: course.doctorName,
                        hospitalName: course.hospitalName,
                        datetimeAppoint: course.datetimeAppoint
                      }
                      )}
                    >Detail
                    </Button>                                       
                   </td>
                   <td>
                   { !course.purchased ?  
                     <Button
                      className='button-table button-buyer'
                      purchaseCourse={this.props.purchaseCourse}
                      onClick={() => this.setState(
                        { 
                          courseId: course.id,
                          courseName: course.courseName,
                          modalBuyShow: true,
                          price: course.price,

                          purchaseCourse: this.props.purchaseCourse
                        }
                      )}
                    >Buy</Button>
                    : null
                    }  
                    </td>                            
                </tr>                
              )
            })}            
          </tbody>
        </table>
        <ModalDetail
        show={this.state.modalShow}
        onHide={addModalClose}
        detail={this.state.detail}
        courseName={this.state.courseName}
        doctorName = {this.state.doctorName}
        hospitalName = {this.state.hospitalName}
        datetimeAppoint={this.state.datetimeAppoint}
        
        />   

      <Modal
          {...this.props}
          show={this.state.modalBuyShow}
          onHide={buyModalClose} 
          width="200px"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <img src={detail_logo} alt='ethospital_logo' className="img-nav img-detail"/>                          
            <div className='modal-detail-name'>{this.state.courseName}</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
            <img src={info_img} alt='ethospital_logo' className="img-nav img-detail"/>              
            <form onSubmit={(event) => {
              event.preventDefault()
              
              const email = this.email.value                            
              const name = this.state.courseId
              const value = this.state.price 
              this.props.purchaseCourse(name, value, email)
              
            }}>
        
              <div className="form-group mr-sm-2">
                <label htmlFor="inputAddress" className='form-title'>Email</label>
                <input
                  id="email"
                  type="text"
                  ref={(input) => { this.email = input }}
                  className="form-control"
                  placeholder="Email"
                  required />
              </div>                             
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn button-add-course button-modal-course button-buyer" 
                onClick={this.state.onHide}>Submit</button>

              </div>                                    
            </form>
            
            </div>
          </Modal.Body>
          <Modal.Footer>            
            <Button variant="danger" onClick={this.state.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
        
      </div>
      
    );
  }
}

export default Main;
