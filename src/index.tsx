import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import github from './github.svg'
import Axios from 'axios';

function Card(props: { src: string }) {
  function Img(props: { source: string }) {
    const fileType = props.source.substr(props.source.length - 3);
    if (fileType === 'mp4') {
      return (
        <video className='dog-image' autoPlay loop muted>
          <source src={props.source} type='video/mp4' />
        </video>
      )
    }
    return (
      <img src={props.source} className='dog-image' alt='loading... maybe' />
    )
  }
  return (
    <div className="card">
      <div className='flex'>
        <img src={github} alt='' />
        <p>Card Title Text</p>
      </div>
      <div className='card-file'>
        <Img source={props.src} />
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
function Render(props: { arr: string[] }): any {
  let out: any = []
  for (let i = 0; i < props.arr.length; i++) {
    out.push(<Card key={props.arr[i]} src={props.arr[i]} />)
  }
  return out
}
const fetch: string = 'https://random.dog/woof.json'
function App() {
  const [data, setData] = useState<string[]>([])
  function generate() {
    Axios.get(fetch).then(
      res => {
        setData(old => [...old, res.data.url])
      })
  }
  window.onload = function () {
    generate()
    generate()
    generate()
    generate()
    generate()
    generate()
  }
  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY + 2000) >= document.body.offsetHeight) {
      generate()
    }
  }; return (
    <div className='home'>
      <Render arr={data} />
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