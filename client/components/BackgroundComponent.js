import React from 'react';

export default class BackgroundComponent extends React.Component{

  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='backgroundLoading'>
        <img src="http://wallpapercave.com/wp/0b6eRqy.jpg" />
      </div>
    );
  }
}