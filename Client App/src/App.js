
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

import React, { Component } from 'react'

export default class App extends Component {
  
  render() {
    
    return (
      <>
        <Navbar />
        <Home/>
      </>
    )
  }
}

