import React from 'react';

var ReactDOM = require('react-dom');
var Modal = require("react-bootstrap/lib/Modal");
var Tooltip = require('react-bootstrap/lib/Tooltip');
var Button = require("react-bootstrap/lib/Button");
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Radio = require("react-bootstrap/lib/Radio");
var FormGroup = require("react-bootstrap/lib/FormGroup");
var FormControl = require("react-bootstrap/lib/FormControl");



export default class JoinGame extends React.Component{

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

  enter() {
    var id = ReactDOM.findDOMNode(this.refs.input).value;
    this.setState({ game_id: id, showModal: false })
    console.log('enter game id: ', id);
  }


  render() {
  
  var tooltip = (
      <Tooltip id="modal-tooltip">
        enter a valid game id to enter an existing game
      </Tooltip>
    );

    return (
      <div className='join-modal'>
        <Button
          bsStyle="default"
          bsSize="small"
          onClick={this.open.bind(this)}
        >
          Join Game
        </Button>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Join Game <OverlayTrigger overlay={tooltip}><a href="#">Id</a></OverlayTrigger></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Enter a Game</h4>
            <form>
             <FormGroup bsSize="large">
              <FormControl ref='input' placeholder="Game id" /><br />
              <Button onClick={this.props.fn.bind(this)}>
                  Submit
              </Button>
             </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


