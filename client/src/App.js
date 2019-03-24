import React, { Component } from 'react';
import { Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import SideDrawer from './components/SideDrawer/SideDrawer';
import HeadCard from './components/HeadCard/HeadCard';
import YearRangeSlider from './components/YearRangeSlider/YearRangeSlider';
import './App.css';
import axios from 'axios';
import HoverCard from './components/HoverCard/HoverCard';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class App extends Component {
  state = {
    location1: {//State containing the current location of user
      lat: 23.014363,
      lng: 84.741078,
    },
    markerData: [],
    isOpen: false,
    data_id: 0,
    zoom: 5.45//default zoom level
  }

  toggleDrawer = (dataId) => {
    this.setState({isOpen: true});
    this.setState({data_id: dataId});
  }

  populateMarkerTooltip = (rangeSliderCurrentValue) => {//this method is passed to YearRangeSlider.js
    var fetchedMarkerData = [];
    axios.get(`https://mern-map-assignment.herokuapp.com/${rangeSliderCurrentValue}`)
        .then(res => {
          for(let i = 0; i < res.data.length; i++) {
              fetchedMarkerData.push({
                data_id: res.data[i]._id,
                data_name: res.data[i].data_name, 
                data_coverImgUrl: res.data[i].data_coverImgUrl,
                data_dpImgUrl: res.data[i].data_dpImgUrl,
                data_location: res.data[i].data_location,
                data_latitude: res.data[i].data_latitude,
                data_longitude: res.data[i].data_longitude
              });
              
          }
          this.setState({
            markerData: fetchedMarkerData,
            isOpen: false
          });
        });
  }



  // componentDidMount() {
    // navigator.geolocation.getCurrentPosition((position) => {//Browser will prompt user for their current location
      // this.setState({
      //   location: {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude
      //   },
      //   haveUsersLocation: true,
      //   zoom: 6//zoom level after detecting user location
  //     });
  //   }, ()=> {
  //     console.log("Location was not granted by user. Still trying to fetch location from IP address...");
  //     fetch('https://ipapi.co/json')
  //       .then(res => res.json())
  //       .then(location => {
  //         // console.log(location);
  //         this.setState({
  //           location: {
  //             lat: location.latitude,
  //             lng: location.longitude
  //           },
  //           haveUsersLocation: true,
  //           zoom: 6//zoom level after detecting user location
  //         });
  //       });
  //   });
  // }


  render() {
    let position1 = [this.state.location1.lat, this.state.location1.lng];
    return (
      <div className="map" id="map-container">
          <SideDrawer data_id = {this.state.data_id} isOpen={this.state.isOpen} pageWrapId={"main-map"} outerContainerId={"map-container"} />
          <Map zoomControl={false} className="map" id="main-map" center={position1} zoom={ this.state.zoom }>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             {
               this.state.markerData.map(data => {
                //  this.setState({data_id: data.data_id});
                 return(
                        <Marker onClick={() => this.toggleDrawer(data.data_id)} key={data.data_id} position={[data.data_latitude, data.data_longitude]} >
                            <Tooltip sticky>
                              <HoverCard
                                data_name = {data.data_name}
                                data_coverImgUrl = {data.data_coverImgUrl}
                                data_dpImgUrl = {data.data_dpImgUrl}
                                data_location = {data.data_location}
                              />
                            </Tooltip>
                        </Marker>
                      );
                  })
                }  
              } 
            
          </Map>
          <YearRangeSlider populateMarkerTooltip={ this.populateMarkerTooltip } />
          <HeadCard />
        </div>
    );
  }
}

export default App;
