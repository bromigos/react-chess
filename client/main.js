// React package that deals with DOM interactions
import ReactDOM from 'react-dom';

// React package for constructing components (and all non-DOM related actions)
import React from 'react';
var ChessBoard = require('./models/chessboardjs-0.3.0/js/chessboard-0.3.0');
var $ = require('jquery');

// Import React component from Chat
import Chat from './components/Chat';
import ChessboardComponent from './components/ChessboardComponent';

// Render that component to the DOM!
ReactDOM.render(<ChessboardComponent />, document.getElementById('app'));
