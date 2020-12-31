import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import github from './github.svg'
import share from './share.svg'
import Axios from 'axios'
const possibleTitles: string[] = [
  "Doggo!",
  "Look at this Doggo",
  "They're sooo cute!",
]
interface data {
  title: string,
  img: string,
  isLiked: boolean,
  description: string
}

let lastRender = Date.now()
function App() {

  const [allData, setAllData] = useState<data[]>([])
  const [shareURL, setShareURL] = useState<string>("http://localhost:3000/")
  const [isActive, setActive] = useState<boolean>(false)

  function ShareUI(props: { url: string }) {
    return (
      <div className="share-div" onClick={function () {
        setActive(false)
      }}>
        <div>
          <p id='copy-id'>{props.url}</p>
          <p onClick={function () { window.prompt("Copy to clipboard: Ctrl+C, Enter", props.url) }} className='copy-button'>Copy</p>
        </div>
      </div>
    )
  }

  function Card(props: { src: data, iter: number }) {
    function Like(e: any) {
      let temp = [...allData]
      temp[props.iter].isLiked = !temp[props.iter].isLiked
      setAllData(temp) // TODO:

      e.target.style.animation = 'Like 1s'
      setTimeout(function () { e.target.style.animation = null }, 1200);
    }
    function Img(props: { source: string }) {
      const fileType = props.source.substr(props.source.length - 3);
      if (fileType === 'mp4') {
        return (
          <video onDoubleClick={Like} className='dog-image' autoPlay loop muted>
            <source src={props.source} type='video/mp4' />
          </video>
        )
      }
      return (
        <img onDoubleClick={Like} src={props.source} className='dog-image' alt='loading... maybe' />
      )
    }
    function Heart(props: { value: boolean }) {
      let color = '#000000'
      let fill = 'none'
      if (props.value) {
        color = "#ed4956"
        fill = '#ed4956'
      }
      return (
        <svg className="like" onClick={Like} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke={color} fill={fill} strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      )
    }
    return (
      <div className="card">
        <div className='flex'>
          <div style={{ backgroundColor: 'blue' }} className='profile' />
          <p>{props.src.title}</p>
        </div>
        <Img source={props.src.img} />
        <div className="card-bottom">
          <div className='card-bottom-imgs'>
            <div className="card-bottom-left">
              <Heart value={props.src.isLiked} />
              <img src={github} alt='' />
            </div>
            <img onClick={function () {
              setActive(true)
              setShareURL(String(window.location.hostname + ':3000/?share=' + encodeURIComponent(props.src.img.replace("https://random.dog/", ""))))
            }} className='right' src={share} alt='' />
          </div>
          <p>{props.src.description}</p>
        </div>
      </div>
    )
  }
  function Render(props: { arr: data[] }): any {
    let out: any = []
    for (let i = 0; i < props.arr.length; i++) {
      out.push(<Card key={props.arr[i].img} src={props.arr[i]} iter={i} />)
    }
    return out
  }
  function generate() {
    const num: number = Math.floor((Math.random() * possibleTitles.length))
    Axios.get('https://random.dog/woof.json').then(
      res => {
        const toAppend: data = {
          title: possibleTitles[num],
          img: res.data.url,
          isLiked: false,
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto'
        }
        setAllData(old => [...old, toAppend])

      })
  }
  function SharePost(): any {
    const Params = new URLSearchParams(window.location.search)
    const share = Params.get("share")
    if (share === null) {
      return <></>
    }
    const data: data = {
      title: 'Shared Post',
      img: String('https://random.dog/' + decodeURIComponent(share)),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto',
      isLiked: true
    }
    return [<Card iter={0} src={data} />, <div style={{ margin: '200px 0' }} />]
  }

  window.onload = function () {
    for (let i = 0; i < 30; i++) {
      generate()
    }
  }
  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY + 2000) >= document.body.offsetHeight) {
      if (Date.now() >= (lastRender + 10000)) {
        for (let i = 0; i < 20; i++) {
          if (allData.length > 100) {
            // Delte old posts
          }
          generate()
        }
        lastRender = Date.now()
      }
    }
  };
  return (
    <div className='home'>
      <SharePost />
      <Render arr={allData} />
      { isActive ? <ShareUI url={shareURL} /> : <></>}
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)