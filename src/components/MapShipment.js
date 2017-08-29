import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {googleAPIKey} from './keys';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';
import {getShipment, setShipment, setTelemetry, setTags} from './monitorvars'


const params = {v: '3.exp', key: googleAPIKey()};
const coords = {
  lat: 17.419617,
  lng: 78.344548
};

export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      map: null
    }
    this.onMapCreated = this.onMapCreated.bind(this);
  }
  onMapCreated(map) {
    map.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: window.google.maps.ControlPosition.TOP_RIGHT,
        mapTypeIds: ['roadmap', 'terrain', 'satellite']
    }
    });
    var styledMapType = new window.google.maps.StyledMapType([
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
])


    map.mapTypes.set('styled_map',styledMapType);
    map.setMapTypeId('styled_map');
    map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP)

    var bound = new window.google.maps.LatLngBounds();
    this.setState({map: map})
    /*
    var directionsService = new window.google.maps.DirectionsService();
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    var request = {
    travelMode: window.google.maps.TravelMode.DRIVING
    };
    */
    var telePoints = this.props.telemetry;

    for(var i = 0; i < telePoints.length; i++){
      var marker = new window.google.maps.Marker({
        map: map,
        icon:{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 4,
          strokeColor: "#0000ff",
          scale: 5
        },
        position:{lat: telePoints[i][0], lng: telePoints[i][1]}
      })
      bound.extend(new window.google.maps.LatLng(telePoints[i][0], telePoints[i][1]))
      marker.setMap(map)


  //  map.setCenter(bound.getCenter())
  //   var notificationPoints = this.props.notifications
  //   for(var i = 0; i < notificationPoints.length; i++){
  //     var marker = new window.google.maps.Marker({
  //       map: map,
  //       icon:{
  //         path: window.google.maps.SymbolPath.CIRCLE,
  //         scale: 4,
  //         strokeColor: "#FFFF00",
  //         scale: 10
  //       },
  //       position:{lat: notificationPoints[i][0], lng: notificationPoints[i][1]}
  //     })
  //     marker.setMap(map)
  // }

  // var alertPoints = this.props.alerts;
  // for(var i = 0; i < alertPoints.length; i++){
  //   var marker = new window.google.maps.Marker({
  //     map: map,
  //     icon:{
  //       path: window.google.maps.SymbolPath.CIRCLE,
  //       scale: 4,
  //       strokeColor: "#FF0000",
  //       scale: 10
  //     },
  //     position:{lat: alertPoints[i][0], lng: alertPoints[i][1]}
  //   })
  //   marker.setMap(map)


    // if(!(this.props.entry === null)){
    //   var paths = [];
    //   for(var i = 0; i < this.props.entry.length; i++){
    //     paths.push(new window.google.maps.LatLng(this.props.entry[i][0], this.props.entry[i][1]))
    //   }
    //   var polygon = new window.google.maps.Polygon({
    //     map: map,
    //     paths: paths,
    //     editable: false,
    //     strokeColor: "green",
    //     strokeOpacity: 1.0,
    //     strokeWeight: 6
    //   })
    //   polygon.setMap(map)
    // }
    // if(!(this.props.exit === null)){
    //   var paths = [];
    //   for(var i = 0; i < this.props.exit.length; i++){
    //     paths.push(new window.google.maps.LatLng(this.props.exit[i][0], this.props.exit[i][1]))
    //   }
    //   var polygon = new window.google.maps.Polygon({
    //     map: map,
    //     paths: paths,
    //     editable: false,
    //     strokeColor: "red",
    //     strokeOpacity: 1.0,
    //     strokeWeight: 6
    //   })
    // }
    // if(!(this.props.both === null)){
    //   var paths = [];
    //   for(var i = 0; i < this.props.both.length; i++){
    //     paths.push(new window.google.maps.LatLng(this.props.both[i][0], this.props.both[i][1]))
    //   }
    //   var polygon = new window.google.maps.Polygon({
    //     map: map,
    //     paths: paths,
    //     editable: false,
    //     strokeColor: "yellow",
    //     strokeOpacity: 1.0,
    //     strokeWeight: 6
    //   })
    // }
    // if(!(this.props.polyline === null)){
    //   var paths = [];
    //   for(var i = 0; i < this.props.polyline.length; i++){
    //     paths.push(new window.google.maps.LatLng(this.props.polyline[i][0], this.props.polyline[i][1]))
    //   }
    //
    //   var polyline = new window.google.maps.Polyline({
    //     path: paths,
    //     geodesic: true,
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2
    //   });
    //   polyline.setMap(map)
    // }
}


}
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }



  render () {


      return (
        <div id = "mMap">
          <Gmaps
            width = {'900px'}
            height = {'800px'}
            lat={coords.lat}
            lng={coords.lng}
            zoom={16}
            loadingMessage={'Loading...'}
            params={params}
            onMapCreated={this.onMapCreated}>
          </Gmaps>

      </div>
      )
  }


}
