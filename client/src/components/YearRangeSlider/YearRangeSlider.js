import React from 'react';
import InputRange from 'react-input-range';
// import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import './YearRangeSlider.css';
import 'react-input-range/lib/css/index.css';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Card } from 'antd';

class RangeSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        value: 0,
        yearList: [],
        yearListLength: '',
      };
    }

    componentDidMount() {//Populating years in year Range Slider
      axios.get('https://mern-map-assignment.herokuapp.com/data/year-list')
        .then(res => {
          // console.log(res.data);
          this.setState({ 
            value: Math.round((res.data[res.data.length-1] + res.data[0])/2),//By default Slider will always be in the mid of the min and max value
            yearList: res.data,
            yearListLength: res.data.length-1
          });
        });
        // this.props.populateMarkerTooltip(this.state.value);//First time populate the markers on map
    }

    updateRangeSlider = (rangeSliderCurrentValue) => {
      this.setState({
        value: rangeSliderCurrentValue
      });
      this.props.populateMarkerTooltip(this.state.value);
      
    }

    // updateRangeSlider = (value) => {
    //   this.setState({ value: value });
    //   axios.get(`http://localhost:4000/data/year/${this.state.value}`)
    //     .then(res => {
    //       console.log(res.data[0].data_name + ' ' + res.data[0].data_coverImgUrl + ' ' + res.data[0].data_dpImgUrl + ' ' +
    //       res.data[0].data_location + ' ' + res.data[0].data_latitude + ' ' + res.data[0].data_longitude);
    //       //DP, cover, name, location, longi, lati
    //       this.setState({
    //         data_name: ''
    //       });
    //     });
    // }

    render() {
      return (
          <div className="year-slider-card">
                <Card 
                  id="range-slider-card" 
                  title="Move slider to change year" 
                  bordered={false} style={{ width: 300 }}>
                    <p>Move slider to see stadiums where IPL matches were played that year.<br /> </p><br />
                    <InputRange
                      maxValue={this.state.yearList[this.state.yearListLength]}
                      minValue={this.state.yearList[0]}
                      value={this.state.value}
                      onChange={this.updateRangeSlider}
                    /><br />
                </Card>
          </div>
        );
    }
  }
export default RangeSlider






