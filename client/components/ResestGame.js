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
  
  var tooltip = (
      <Tooltip id="modal-tooltip">
        Set a time interval per move
      </Tooltip>
    );

    return (
      <div className='create-modal'>
        <Button
          bsStyle="default"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          Reset Game
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Reset Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Select a time option</h4>
            <Radio onClick={ this.props.fn.bind(this) }> Untimed </Radio>
            <Radio onClick={ this.enter.bind(this, 15) }> 15 mins </Radio>
            <Radio onClick={ this.enter.bind(this, 30) }> 30 mins </Radio>
            <Radio onClick={ this.enter.bind(this, 60) }> 60 mins </Radio>
            <p>Select a <OverlayTrigger overlay={tooltip}><a href="#">time</a></OverlayTrigger> setting</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}