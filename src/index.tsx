import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import github from './github.svg'
import Axios from 'axios';

const fetch: string = 'https://random.dog/woof.json'
function App() {

  const [source, setSource] = useState<string>('')

  function generate() {
    Axios.get(fetch).then(
      res => {
        setSource(res.data.url)
      })
  }

  window.onload = function () {
    generate()
  }
  async function GetUrl() {
    const data = await Axios.get(fetch)
    const source = data.data.url
    const fileType = source.substr(source.length - 3);
    if (fileType === 'mp4') {
      return (
        <video className='dog-image' autoPlay loop muted>
          <source src={source} type='video/mp4' />
        </video>
      )
    }
    return (
      <img src={source} className='dog-image' alt='loading... maybe' />
    )
  }
  function Card() {
    return (
      <div className="card">
        <div className='flex'>
          <img src={github} alt='' />
          <p>Card Title Text</p>
        </div>
        <div className='card-file'>
          <GetUrl />
        </div>
        <div className="card-bottom-div">
          <div style={{ display: 'flex' }}>
            <img src={github} alt='' />
            <img src={github} alt='' />
            <img className='third' src={github} alt='' />
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto</p>
        </div>
      </div>
    )
  }

  return (
    <div className='home'>
      <a href='https://github.com/NikSchaefer/Doggo'>
        {/* <img alt='github' src={github} /> */}
      </a>
      <Card />
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
