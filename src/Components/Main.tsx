import React, { useState } from 'react';
import Axios from 'axios'

import share from '../SVG/share.svg'
import github from '../SVG/github.svg'

const possibleTitles: string[] = ["Doggo!", "Look at this Doggo", "They're sooo cute!",]
interface data {
    title: string,
    img: string,
    isLiked: boolean,
    description: string
}
let lastRender = Date.now()

export default function Main() {

    const [FeedData, setFeed] = useState<data[]>([])
    const [shareURL, setShareURL] = useState<string>("")
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

        const [isLiked, setLiked] = useState<boolean>(props.src.isLiked)

        function Like(e: any) {
            const heartsvg: any = document.getElementsByClassName('like')[props.iter]
            if (isLiked) {
                heartsvg.style.animation = 'UndoLike 0.4s forwards'
            }
            else {
                heartsvg.style.animation = 'Like 0.4s forwards'
            }
            setTimeout(function () {
                setLiked(!isLiked)
            }, 400)

        }
        function Img(props: { source: string }) {
            const fileType = props.source.substr(props.source.length - 3);
            if (fileType === 'mp4') {
                return (
                    <video preload='none' onDoubleClick={Like} className='dog-image' autoPlay loop muted>
                        <source src={props.source} type='video/mp4' />
                    </video>
                )
            }
            return (
                <img loading='lazy' onDoubleClick={Like} src={props.source} className='dog-image' alt='loading... maybe' />
            )
        }
        function Heart(props: { value: boolean }) {
            if (props.value) {
                return (
                    <svg fill="#ed4956" stroke="#ed4956" className="like" onClick={Like} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                )
            }
            return (
                <svg fill="#ffffff" stroke='black' className="like" onClick={Like} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
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
                            <Heart value={isLiked} />
                            <img src={github} alt='' />
                        </div>
                        <img onClick={function () {
                            setActive(true)
                            setShareURL(String(window.location.hostname + '/?share=' + encodeURIComponent(props.src.img.replace("https://random.dog/", ""))))
                        }} className='right' src={share} alt='' />
                    </div>
                    <p>89 Likes</p>
                    <p>{props.src.description}</p>
                </div>
            </div>
        )
    }
    function Render(props: { arr: data[] }): any {
        let out: any = []
        for (let i = 0; i < props.arr.length; i++) {
            out.push(<Card key={i} src={props.arr[i]} iter={i} />)
        }
        return out
    }
    async function fetchNewPost() {
        const num: number = Math.floor((Math.random() * possibleTitles.length))
        const res = await Axios.get('https://random.dog/woof.json')
        const toAppend: data = {
            title: possibleTitles[num],
            img: res.data.url,
            isLiked: false,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto'
        }
        setFeed(old => [...old, toAppend])
    }
    function ShowSharedPost(): any {
        const Params = new URLSearchParams(window.location.search)
        const share = Params.get("share")
        if (share !== null) {
            const data: data = {
                title: 'Shared Post',
                img: String('https://random.dog/' + decodeURIComponent(share)),
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti iusto',
                isLiked: true
            }
            return [<Card iter={0} src={data} />, <div style={{ margin: '200px 0' }} />]
        }
        return <></>
    }
    window.onload = function () {
        for (let i = 0; i < 30; i++) {
            fetchNewPost()
        }
    }
    window.onscroll = function () {
        if ((window.innerHeight + window.scrollY + 2000) >= document.body.offsetHeight) {
            if (Date.now() >= (lastRender + 10000)) {
                for (let i = 0; i < 20; i++) {
                    if (FeedData.length > 100) {
                        // Delte old posts
                    }
                    fetchNewPost()
                }
                lastRender = Date.now()
            }
        }
    };
    return (
        <div className='home'>
            <ShowSharedPost />
            <Render arr={FeedData} />
            { isActive ? <ShareUI url={shareURL} /> : <></>}
        </div>
    );
}