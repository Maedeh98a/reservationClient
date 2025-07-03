import React from 'react'
import github from '../assets/github.png'
import linkdin1 from '../assets/linkdin1.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <Link to="https://github.com/Maedeh98a">
      <img src={github} alt='github'/>
      </Link>
      <Link to="linkedin.com/in/maedeh-ahmadian">
      <img src={linkdin1} alt='linkedin'/>
      </Link>
    </footer>
  )
}

export default Footer