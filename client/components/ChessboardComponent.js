import React from 'react';

var Chess = require('chess.js').Chess;
var socket;

export default class ChessBoardComponent extends React.Component{


  constructor(props){
    super(props);
    socket = this.props.socket;
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
    if(!newMove){ // if move is invalid
      //console.log(this.state.chess.ascii());
      return 'snapback';
    }
    else {
        this.endMove({moveObj: {from: source, to: target, promotion: 'q'}},this.state.chess.pgn({newline_char: '/'}) );
    }
  }

    endMove(moveObj,pgnString){
        socket.emit('move', {uuid: this.state.uuid, moveObj: moveObj, pgnString: pgnString});
        this.state.chessBoard.position(this.state.chess.fen(),false);
    }

  incomingMove(moveObj, fenString){
    console.log('incoming move: ',JSON.stringify(moveObj));
    if(fenString !== this.state.chess.fen()){ // 
      this.state.chess.move(moveObj);
      this.state.chessBoard.position(this.state.chess.fen());
    }
    else
      console.log('err -- duplicate position received'); //defensive programming :)
  }

  componentDidMount(){
    
    // socket.on('connect', function () {
    //   console.log('Chessboard connected')
    // });
    socket.on('move', data=> this.incomingMove(data.moveObj, data.fenString) ); // incomingMoveHandler
    
    var myUUID;

    if(document.cookie && document.cookie.indexOf('uuid') > -1)
        myUUID = document.cookie.substring(document.cookie.indexOf('uuid')+5);
    // server sends UUID to every user, even ones that might have an existing cookie
    // if we have UUID from cookie, ignore uuid given.
    // Send back whatever UUID will be used by the client
    socket.on('uuid', uuid=> {
      if(myUUID===undefined){
          document.cookie = 'uuid=' + uuid + ';';
          myUUID = uuid;
          console.log(document.cookie);
      }
      socket.emit('uuid',myUUID);
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
                    chessBoard:  new ChessBoard('board1',cfg),
                    uuid: myUUID
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
