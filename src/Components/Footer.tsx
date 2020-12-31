import React from 'react'
import home from '../SVG/home.svg'
import Inbox from '../SVG/inbox.svg'
import Bell from '../SVG/bell.svg'
import plus from '../SVG/plus.svg'

export default function Main() {
    return (
        <footer>
            <img src={home} alt='' />
            <img src={Inbox} alt='' />
            <img src={plus} alt='' />
            <img src={Bell} alt='' />
        </footer>
    )
}
