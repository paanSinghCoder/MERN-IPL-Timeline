import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Icon, Collapse, Tag, Button } from 'antd';
import axios from 'axios';
import './SideDrawer.css';
import CommentModal from '../CommentModal/CommentModal';
// import { configConsumerProps } from "antd/lib/config-provider";
// import { Card, Icon, Avatar } from 'antd';
// const { Meta } = Card;
// const Panel = Collapse.Panel;

// function callback(key) {
//   console.log(key);
// }
const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

class SideDrawer extends React.Component{
  state = {
    data: {},
    isOpen: true,
    showCommentModal: false
  }

  showModal = () => {
    this.setState({ showCommentModal: true });
    this.refs.child.populateComments();
  }

  componentDidUpdate = () => {
    axios.get(`https://mern-map-assignment.herokuapp.com/${this.props.data_id}`)
        .then(res => {
          this.setState({data: res.data});
        });
  }

  render(){
    return (
      
      
      // <Menu isOpen={this.state.isOpen} {...props} noOverlay >
      <Menu isOpen={this.state.isOpen} customBurgerIcon={ false } customCrossIcon={ false } {...this.props} noOverlay >
        <img alt="Cover Pic" src={ this.state.data.data_coverImgUrl } className="drawer-header" />
        <img alt="drawer dp" src={ this.state.data.data_dpImgUrl } className="drawer-dp" />
        <h3 className="drawer-heading">{this.state.data.data_name}</h3>
        <p className="drawer-location"><span><Icon type="pushpin" /></span>{this.state.data.data_location}</p>
        <p className="drawer-location"><span><Icon type="team" /></span>{this.state.data.data_capacity}</p>
        <p className="drawer-date drawer-location">{this.state.data.data_matchDate}</p>
        <Tag style={{color: '#fff'}} color="#f50">{this.state.data.data_team1}</Tag>
        <Tag style={{color: '#f50'}} color="orange">vs</Tag>
        <Tag style={{color: '#fff'}} color="#f50">{this.state.data.data_team2}</Tag>
        <Collapse style={{width:'100%'}} defaultActiveKey={['1']} onChange={callback}>
          <Panel header="Description" key="1">
            <p>{this.state.data.data_summary}</p>
          </Panel>
        </Collapse>
        <Button style={{color: '#fff'}} type="primary" onClick={this.showModal}>
            Show Comments
          </Button>
          <CommentModal showModal={this.state.showCommentModal} data_id={this.props.data_id} ref="child" />
        {/* <a onClick={this.toggleDrawer}><Icon type="arrow-left" />Hide this shit</a> */}
      </Menu>
      
);
  }
}

export default SideDrawer;