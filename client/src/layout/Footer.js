import React, { Component } from 'react';

class Footer extends Component {
  render(){
    return(
        <div className="footer">
            <span className="footer-text">Jade Rosse, Desiree Rainey, Sean Swanson &copy; {new Date().getFullYear()}</span>
        </div>
      );
  }
}

export default Footer;
