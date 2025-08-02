import './App.css';
import React, { Component } from 'react'
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Newscomponent from './components/Newscomponent';

export default class App extends Component {

  state={
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f55403"
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<Newscomponent setProgress={this.setProgress} key="general" pageSize={8} country="us" category="general" />} />
            <Route exact path="/technology" element={<Newscomponent setProgress={this.setProgress} key="technology" pageSize={8} country="us" category="technology" />} />
            <Route exact path="/science" element={<Newscomponent setProgress={this.setProgress} key="science" pageSize={8} country="us" category="science" />} />
            <Route exact path="/sports" element={<Newscomponent setProgress={this.setProgress} key="sports" pageSize={8} country="us" category="sports" />} />
            <Route exact path="/entertainment" element={<Newscomponent setProgress={this.setProgress} key="entertainment" pageSize={8} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<Newscomponent setProgress={this.setProgress} key="health" pageSize={8} country="us" category="health" />} />
            <Route exact path="/business" element={<Newscomponent setProgress={this.setProgress} key="business" pageSize={8} country="us" category="business" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
