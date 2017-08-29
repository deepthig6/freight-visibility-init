import React, { Component } from 'react';
import Header from './components/Header';
import SearchShipment from './components/SearchShipment';
import Map from './components/MapShipment';
import {telemetry} from './components/Ships';
import './App.css';
import {getShipment, setShipment, setTelemetry, setTags} from './components/monitorvars'


const shipmentData = [
  {
    "id": "1",
    "address1": "715 Peachtree street",
    "lat": 33.77396239999999,
    "long":-84.384745
  },
    {
      "id": "2",
      "address1": "1812 Lake Ebenezer Trl",
      "lat": 34.034307,
      "long":-84.49729599999999
    }
];



class App extends Component {
  constructor(){
  super();
  this.state = {name:"",
  telemetryLocation: [],
  notificationLocation: [],
  alertLocation: [],
  polyline: null,
  entryFence: null,
  exitFence: null,
  bothFence: null};
}
componentWillMount(){
  this.setState({name:["Freight Visibility"]});
   var telemetryData =telemetry();
   setTelemetry(telemetryData);

  var curData = []
  for (var i = 0; i < telemetryData.length; i++) {
    curData.push([telemetryData[i]["Notification"]["Data"]["Location"]["Latitude"], telemetryData[i]["Notification"]["Data"]["Location"]["Longitude"]]);
  }
console.log("Cur Data"+curData);
  var curNotificationLocation = []

  this.setState({ telemetryLocation: curData })
};
  render() {
    return (
      <div className="App">
      <Header companyName ={this.state.name}></Header>
      <div className="App-Main">
      <SearchShipment></SearchShipment>
      <Map telemetry={this.state.telemetryLocation} notifications={this.state.notificationLocation} alerts={this.state.alertLocation} polyline={this.state.polyline} entry={this.state.entryFence} exit={this.state.exitFence} both={this.state.bothFence} ></Map>
      </div>
      </div>
    );
  }
}

export default App;
