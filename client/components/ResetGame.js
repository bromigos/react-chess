import React from 'react';

var Modal = require("react-bootstrap/lib/Modal");
var Tooltip = require('react-bootstrap/lib/Tooltip');
var Button = require("react-bootstrap/lib/Button");
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Radio = require("react-bootstrap/lib/Radio");



export default class ResetGame extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  enter(time) {
    this.setState({ turn_time: time, showModal: false })
    console.log('enter time test: ', time)
  }

  render() {

    return (
      <div className='create-modal'>
        <Button
          bsStyle="default"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          End Game
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thanks for playing!</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Exit</Button>
            <Button onClick={this.close.bind(this)}>Cancel</Button>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}