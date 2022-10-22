import React from 'react'
import { searchIcon } from '../../assets'
import './style.css'

const Header = () => {
  return (
   <header className='header flex justify-sb'>
   <div className="logo">
    <img src="./logo.jpg" style={{width:'30px' ,height:'30px'}} alt="music logo soon" />
   </div>
   <div>
    <img src={searchIcon} alt="" />
   </div>
   </header>
  ) 
}

export default Header
