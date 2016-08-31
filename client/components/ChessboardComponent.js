import React from 'react';

var Chess = require('chess.js').Chess;

export default class ChessBoardComponent extends React.Component{


  constructor(props){
    super(props);
    

  }

  onDragStart(source, piece, position, orientation) {
    orientation = this.state.chess.turn()==='b' ? 'black' : 'white';
  if ((orientation === 'white' && piece.search(/^w/) === -1) ||
      (orientation === 'black' && piece.search(/^b/) === -1)) {
    return false;
    }
  }

   onDrop(source, target, piece, newPos, oldPos, orientation){
    var newMove = this.state.chess.move({from: source, to: target, promotion: 'q'});
    if(!newMove){ 
      console.log(this.state.chess.ascii());
      return 'snapback';
    }
    else
        {
        socket.emit('move', {moveObj: newMove, fenString: this.state.chess.fen()});
        //console.log(this.state.chessBoard.position());
        this.state.chessBoard.position(this.state.chess.fen(),false);
      }
  }

  componentDidMount(){
    var socket = this.props.socket;
    socket.on('connect', function () {
      console.log('Chessboard connected')
    });

   var startingPosition = this.props.startPosition || 'start';
    var cfg = {
      draggable: true,
      dropOffBoard: 'snapback', // this is the default
      position: startingPosition,
      onDrop: this.onDrop.bind(this),
      onDragStart: this.onDragStart.bind(this)
   };
   if(startingPosition==='start')
      startingPosition = undefined;
    this.state = {  chess:      new Chess(startingPosition), 
                    chessBoard:  new ChessBoard('board1',cfg)
  };
  console.log(this.state.chess.turn());
  }


  render(){
    return (
      <div id="board1" className='chessboard'>
        
      </div>
    );
  }
}
