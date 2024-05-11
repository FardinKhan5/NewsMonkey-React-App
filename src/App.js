import React, { Component } from 'react'
import Navbar from './components/Navbar'
import NewsItem from './components/NewsItem'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {

  constructor(){
    super()
    this.state={
      progress:0,
      newsApi:process.env.REACT_APP_NEWS_API
    }
  }
  setProgress=(prog)=>{
    this.setState({progress:prog});
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="general" setProgress={this.setProgress} key="home" /></>} />
          <Route exact path='/general' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="general" setProgress={this.setProgress} key="general" /></>} />
          <Route exact path='/business' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="business" setProgress={this.setProgress} key="business" /></>} />
          <Route exact path='/entertainment' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="entertainment" setProgress={this.setProgress} key="entertainment" /></>} />
          <Route exact path='/health' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="health" setProgress={this.setProgress} key="health" /></>} />
          <Route exact path='/science' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="science" setProgress={this.setProgress} key="science" /></>} />
          <Route exact path='/sports' element={<> <LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="sports" setProgress={this.setProgress} key="sports" /></>} />
          <Route exact path='/technology' element={<><LoadingBar height={3} progress={this.state.progress} /> <Navbar title="NewsMonkey" /><NewsItem newsApi={this.state.newsApi} category="technology" setProgress={this.setProgress} key="technology" /></>} />
        </Routes>
      </Router>
    )
  }
}