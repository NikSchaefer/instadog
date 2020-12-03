import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios'

const fetch: string = 'https://random.dog/woof.json'
function App() {

  const [source, setSource] = useState<string>('')

  function generate() {
    axios.get(fetch).then(
      res => {
        setSource(res.data.url)
      })
  }
  function File() {
    const fileType = source.substr(source.length - 3);
    if (fileType === 'mp4') {
      return <video onClick={generate} className='dog-image' autoPlay loop muted>
        <source src={source} type='video/mp4' />
      </video>
    }
    return <img onClick={generate} src={source} className='dog-image' alt='loading... maybe' />
  }
  window.onload = function () {
    generate()
  }
  return (
    <div className='home'>
      <File />
      <p onClick={generate} className='button'>More Doggos</p>
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);