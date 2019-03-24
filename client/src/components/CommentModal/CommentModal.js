import React from 'react';
import { Modal, List, Comment, Avatar, Form, Button, Input} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import './CommentModal.css';
// import InputCommentForm from '../InputComment/InputComment';
// import { Comment, List } from 'antd';
// import moment from 'moment';

// var Search = Input.Search;

const { TextArea } = Input;

class CommentModal extends React.Component {
    state = { visible: false,
            inputName: '',
            inputComment: '',
            // submitData: {
            //   author: this.state.inputName,
            //   content: this.state.inputComment
            // },
            commentData: [
            // {
            //   author: 'Han Solo',
            //   avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            //   content: (
            //     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
            //   ),
            // }
          ]
        }

    updateNameValue(evt) {
      this.setState({
        inputName: evt.target.value
      });
    }

    updateCommentValue(evt) {
      this.setState({
        inputComment: evt.target.value
      });
    }

    handleOk = (e) => {
      e.preventDefault();

      const author = this.state.inputName;
      const content = this.state.inputComment;

      const submitData = {
        author, 
        content
      }

      if(this.state.inputName === '' || this.state.inputComment === ''){
        alert("No field can be empty.")
      }else{
        alert(this.state.inputName + '  ' + this.state.inputComment);
        axios.post(`https://mern-map-assignment.herokuapp.com/${this.props.data_id}`, {submitData})
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }

    populateComments(){//this is called from SideDrawer button click
      this.setState({
          visible: true
      })
      axios.get(`https://mern-map-assignment.herokuapp.com/${this.props.data_id}`)
        .then(res => {
          this.setState({commentData: res.data});
        });
    }

    render() {
      return (
        <div>
          <Modal
            title={`${this.state.commentData.length} comment(s)`}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>Submit Comment</Button>,
            ]}
            >
                <List
                    className="comment-list"
                    // header={`${this.state.commentData.length} comment`}
                    itemLayout="horizontal"
                    dataSource={this.state.commentData}
                    renderItem={item => (
                    <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                )}
            />,
                <hr />
                <Input value={this.state.inputName} onChange={evt => this.updateNameValue(evt)} className='name-input' placeholder="Enter name" />
                <TextArea value={this.state.inputComment} onChange={evt => this.updateCommentValue(evt)} placeholder="Enter Comment" autosize />
                {/* <Button type="primary" icon="check">Submit</Button> */}
          </Modal>
          
        </div>
      );
    }
  }

  export default CommentModal;