import React, { Component } from 'react';
import './SearchShipment.css';

class SearchShipment extends Component {
  constructor(){
  super();
  this.state = {name:""};
}
componentWillMount(){
  this.setState({name:["Freight Visibility"]});
};
  render() {
    return (
        <div className="SearchShipment">
      <form className="ss-form">
      <div className="padBelow">
      <label className="padBelow">
        Shipment Id:
        </label><br/>
        <input type="text" name="name" className="inputLength" />

      <br/>  </div>
      <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default SearchShipment;
