import React, { Component } from 'react';
import './App.css';
import Nav from './containers/Nav';
import Main from './containers/Main';
import Footer from './containers/Footer';


class App extends Component {
  constructor(){
    super();
    this.state={
      liens:[]
    }
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
