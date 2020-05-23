import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalDetail from './ModalDetail'
class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {      
      modalShow: false,
      detail: null,
      courseName: null,
      category: null,
      doctorName: null,
      hospitalName: null,
      datetimeAppoint: null
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
    let c = 1
    return (    
      <div id="content" className="buy-course-table">        
        <table className="table" data-pagination="true" data-search="true">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Course Name</th>
              <th scope="col">Category</th>              
              <th scope="col">Hospital</th>
              <th scope="col">Price</th>
              <th scope="col" data-sortable="true">Date</th>
              <th scope="col">Time</th>
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
                  <td>{course.category}</td>
                  <td>{course.hospitalName}</td>
                  <td>{window.web3.utils.fromWei(course.price.toString(), 'Ether')} Eth</td>
                  <td>{new Date(course.datetimeAppoint*1000).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td>{new Date(course.datetimeAppoint*1000).toLocaleString('default', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td><Button
                    className='button-table'
                    onClick={() => this.setState(
                      { 
                        modalShow: true,
                        detail: course.detail,
                        courseName: course.courseName,
                        category: course.category,
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
                        className='button-table'
                        name={course.id}
                        value={course.price}                        
                        onClick={(event) => {
                          this.props.purchaseCourse(event.target.name, event.target.value)
                        }}
                        >
                        Buy
                      </Button>
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
        category={this.state.category}
        />                
      </div>
    );
  }
}

export default Main;
