import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './Components/Header'
import Main from './Components/Main'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)