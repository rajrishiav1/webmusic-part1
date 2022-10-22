import React from 'react'
import { searchIcon } from '../../assets'
import './style.css'

const SearchInput = () => {
  return (
    <div className='search-input-container flex' >
        <img src={searchIcon} alt="" />
      <input type="text" placeholder='Find your Music'/>
    </div>
  )
}

export default SearchInput
