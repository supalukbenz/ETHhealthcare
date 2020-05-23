import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ModalDetail from './ModalDetail'
class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {      
      modalShow: false
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
                    onClick={ () => this.setState({ modalShow: true }) }
                    >Detail
                    </Button>
                    <ModalDetail
                    show={this.state.modalShow}
                    onHide={addModalClose}
                    courses={this.props.courses} 
                    account={this.props.account}
                    detail={course.detail}
                    name={course.courseName}
                    doctor = {course.doctorName}
                    hospital = {course.hospitalName}
                    datetime={course.datetimeAppoint}
                    category={course.category}
                    />                    
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
      </div>
    );
  }
}

export default Main;
