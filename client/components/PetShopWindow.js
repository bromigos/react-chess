import React from 'react';

import { fetchShops } from '../models/shop'


export default class PetShopWindow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      shop: {},
    };
  }

  componentDidMount(){
    fetchShops()
      .then((shopData) => {
        this.setState({shop: shopData});
      });
  }


  render(){
    return (
      <div className='pet-shop'>
        <h1> Welcome to {this.state.shop.name} </h1>
        <p> TODO: Replace me! :D </p>
      </div>
    );
  }
}
