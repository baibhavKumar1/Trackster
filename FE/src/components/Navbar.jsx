/* eslint-disable react/prop-types */
import { GiFeather } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import LoginMenu from './Login'
import { CiMenuFries } from 'react-icons/ci'
import { useState } from 'react'

const Navbar = ({toggleSidebar}) => {
  
  return (
    <div className='flex m-3 items-center justify-between px-6'>

      <CiMenuFries className='lg:hidden md:hidden' onClick={toggleSidebar}/>

      <Link to='/' className="mt-1 ">
        <GiFeather color="darkorange" size="2em" />
      </Link>
      <div className='flex justify-between w-[60vw] xs:hidden sm:hidden '>
        <Link to='/explore' ><p>Explore</p></Link>
        <Link className='' to='/events'><p>Events</p></Link>
        <Link to='/about'><p>About</p></Link>
        <Link to='/contact'><p>Contact</p></Link></div>
      <LoginMenu />
    </div>
  )
}

export default Navbar 