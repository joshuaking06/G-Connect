import ReactDOM from 'react-dom'
import React from 'react'
// const socket = require('socket.io-client')(`http://localhost:4000`);

//import styles
import './style.scss'
// global.socket = socket

import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))
