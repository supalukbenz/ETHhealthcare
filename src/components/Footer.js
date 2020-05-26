import React, { Component } from 'react';
import footer_img from '../images/footer-logo.png'


class Footer extends Component {
  render() {   
    return (
      <div>
        <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xs-12 about-company">
              <img src={footer_img} alt='ethospital_logo' className="center img-footer"/>              
              
            </div>
            <div className="col-lg-3 col-xs-12 links">
            </div>
            <div className="col-lg-4 col-xs-12 location">
              <h4 className="mt-lg-0 mt-sm-4">Contact Us</h4>
              <p>Software and Knowledge Engineering, Kasetsart University</p>
              <div className="person-icon"></div>              
              <p className="mb-0">	&#128231; supaluk.j@ku.th</p> 
              <p className=" tel-footer">	&#128222; 094774xxxx</p>      

              <p className="mb-0">	&#128231; pichaaun.p@ku.th</p> 
              <p className=" tel-footer">	&#128222; 099999xxxx</p>    

              <p className="mb-0">	&#128231; thanikrit.d@ku.th</p> 
              <p className="mb-0">	&#128222; 088888xxxx</p>            
            </div>
          </div>
          <div className="row mt-5">
            <div className="col copyright">
              <p className="copyright-p"><small>© 2020. All Rights Reserved.</small></p>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Footer;
