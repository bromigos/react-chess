import React from 'react';

var Chess = require('chess.js').Chess;
var socket;


export default class ChessBoardComponent extends React.Component{


  constructor(props){
    super(props);
    this.state = {yourGame: this.props.yourGame};
    socket = this.props.socket;
  }

  onDragStart(source, piece, position, orientation) {
    // orientation = this.state.chess.turn()==='b' ? 'black' : 'white';
    if(this.state.chess.turn()!==orientation[0]) return false;
    if ((orientation === 'white' && piece.search(/^w/) === -1) ||
        (orientation === 'black' && piece.search(/^b/) === -1)) {
      return false;
      }
  }

  onDrop(source, target, piece, newPos, oldPos, orientation){
    var newMove = this.state.chess.move({from: source, to: target, promotion: 'q'});
    if(!newMove){ // if move is invalid
      //console.log(this.state.chess.ascii());
      return 'snapback';
    }
    else {
        this.endMove({moveObj: {from: source, to: target, promotion: 'q'}},this.state.chess.pgn({newline_char: '/'}) );
    }
  }

  endMove(moveObj,pgnString){
      socket.emit('move', {uuid: this.state.uuid, moveObj: moveObj, pgnString: pgnString, fenString: this.state.chess.fen()});
      this.state.chessBoard.position(this.state.chess.fen(),false);
      if(this.state.chess.game_over())
        this.props.showResetGameBtn();
  }

  incomingMove(moveObj, fenString){

    console.log('incoming move: ',JSON.stringify(moveObj));
    if(fenString !== this.state.chess.fen()){ // 
      this.state.chess.move(moveObj);
      this.state.chessBoard.position(this.state.chess.fen());
    }
    else {
      console.log('err -- duplicate position received'); //defensive programming :)
    }

    // game over check
    if (this.state.chess.game_over()) {
      console.log('game is over: ', this.props.yourGame);
      socket.emit('gameover', this.props.yourGame);
      this.props.showResetGameBtn();
    }
  }


  componentDidMount(){
    
     // socket.on('connect', function () {
     //   console.log('Chessboard connected')
     // });

    socket.on('move', data=> this.incomingMove(data.moveObj, data.fenString) ); // incomingMoveHandler
    
    console.log('this.props.fen: ', this.props.fen);

   var startingPosition = this.props.fen;
   var cfg = {
      draggable: true,
      dropOffBoard: 'snapback', // this is the default
      position: startingPosition,
      onDrop: this.onDrop.bind(this),
      onDragStart: this.onDragStart.bind(this),
      orientation: this.props.orientation
   };
   console.log('Starting game with orientation: ',this.props.orientation);
   if(startingPosition==='start')
      startingPosition = undefined;
    this.state = {  chess:      new Chess(startingPosition), 
                    chessBoard:  new ChessBoard('board1',cfg),
                    uuid: this.props.uuid,
                    orientation: this.props.orientation
    };
  //console.log(this.state.chess.turn());
  
  }


  render(){
    return (
      <div id="board1" className='chessboard'>
        
      </div>
    );
  }
}
