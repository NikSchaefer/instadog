import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import github from './github.svg'
import share from './share.svg'
import Axios from 'axios'
const apiUrl: string = 'https://random.dog/woof.json'
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
function CopyToClipboard(text: string) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
let isActive: boolean = false
function App() {
  function ShareUI(props: { url: string }) {
    if (isActive) {
      return (
        <div className="share-div" onClick={function () {
          isActive = false
        }}>
          <div>
            <p id='copy-id'>{props.url}</p>
            <p onClick={function () { CopyToClipboard(props.url) }} className='copy-button'>Copy</p>
          </div>
        </div>
      )
    }
    return <></>
  }


  const [allData, setAllData] = useState<data[]>([])
  const [shareURL, setShareURL] = useState<string>("http://localhost:3000/")

  function Card(props: { src: data, iter: number }) {
    function Like(e: any) {
      let temp = [...allData]
      temp[props.iter].isLiked = !temp[props.iter].isLiked
      setAllData(temp)

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
      if (props.value) {
        return (
          <svg className="like" onClick={Like} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#ed4956" fill="#ed4956" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        )
      }
      return (
        <svg className="like" onClick={Like} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      )
    }
    function TopImg() {
      const arrs = ['blue', 'red', 'yellow']
      const num: number = Math.floor((Math.random() * arrs.length))
      return <div style={{ backgroundColor: arrs[num] }} className='profile' />
    }
    return (
      <div className="card">
        <div className='flex'>
          <TopImg />
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
              isActive = true;
              setShareURL(String(window.location.hostname + ':3000/?share=' + encodeURIComponent(props.src.img.replace("https://random.dog/", ""))))
            }} className='right' src={share} alt='' />
          </div>
          <p>{props.src.description}</p>
        </div>
      </div>
    )
  }

  function Render(props: { arr: data[], func: Function, all: data[] }): any {
    let out: any = []
    for (let i = 0; i < props.arr.length; i++) {
      out.push(<Card key={props.arr[i].img} src={props.arr[i]} iter={i} />)
    }
    return out
  }

  function generate() {
    const num: number = Math.floor((Math.random() * possibleTitles.length))
    Axios.get(apiUrl).then(
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
      return <div />
    }
    const data: data = {
      title: 'Shared Post',
      img: String('https://random.dog/' + decodeURIComponent(share)),
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto',
      isLiked: false
    }
    return [
      <Card
        iter={0}
        src={data} />,
      <div style={{ margin: '200px 0' }} />
    ]
  }

  window.onload = function () {
    for (let i = 0; i < 4; i++) {
      generate()
    }
  }
  window.onscroll = function () {
    if ((window.innerHeight + window.scrollY + 1500) >= document.body.offsetHeight) {
      generate()
    };
  }
  return (
    <div className='home'>
      <SharePost />
      <Render arr={allData} all={allData} func={setAllData} />
      <ShareUI url={shareURL} />
    </div>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)