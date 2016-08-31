import React from 'react';

// import { fetchShops } from '../models/shop'
// import Navbar from 'react-bootstrap';
// import * from "react-bootstrap";

var Navbar = require("react-bootstrap/lib/Navbar")
var Nav = require("react-bootstrap/lib/Nav")
var NavItem = require("react-bootstrap/lib/NavItem")
var NavDropdown = require("react-bootstrap/lib/NavDropdown")
var MenuItem = require("react-bootstrap/lib/MenuItem")



export default class NavComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      shop: {},
    };
  }

  componentDidMount(){
    
  }


  render(){
    
    var navbarInstance = (
      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Chess Master</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavDropdown eventKey={1} title="Game" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1}>Create Game</MenuItem>
            <MenuItem eventKey={2.2}>Join Game</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.3}>other stuff</MenuItem>
          </NavDropdown>
          <NavItem eventKey={2} href="#">Stuff</NavItem>
        </Nav>
      </Navbar>
    );

    return (navbarInstance);
  }
}
