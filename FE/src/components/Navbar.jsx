import { GiFeather } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import LoginMenu from './Login'

const Navbar = () => {
  return (
    <div className='flex m-3 items-center justify-around'>
        <Link to='/' className="mt-1 ">
            <GiFeather color="darkorange" size="2em" />
        </Link>
        
        <Link to='/explore'><p>Explore</p></Link>
        <Link className='' to='/events'><p>Events</p></Link>

        <Link to='/about'><p>About</p></Link>
        <Link to='/contact'><p>Contact</p></Link>
        <LoginMenu/>
      </div>
  )
}

export default Navbar