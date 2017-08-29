import React, { Component } from 'react';
import './Header.css';

class Header extends Component { 

  render() {     
    let compName;

    if(this.props.companyName){
        compName =this.props.companyName;
    };
          
    return (
      <div className="Header">
         {compName}
      </div>
    );
  }
}

export default Header;
