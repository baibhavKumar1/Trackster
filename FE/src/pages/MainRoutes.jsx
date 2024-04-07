import {Routes,Route} from 'react-router-dom';

import Home from './Home';
import Explore from './Explore';
import Events from './Events';
import SingleEvent from './SingleEvent';
import Dashboard from './Admin/Dashboard';
import Profile from './Profile';
import Tickets from './Tickets';
import About from './About';
import Contact from './Contact';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/ticket/:id" element={<Tickets/>}/>
        <Route path='/event/:id' element={<SingleEvent/>}/>
      </Routes>
    </>
  )
}

export default MainRoutes
