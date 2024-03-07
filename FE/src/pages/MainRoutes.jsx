import {Routes,Route} from 'react-router-dom';

import Home from './Home';
import Explore from './Explore';
import Events from './Events';
import SingleEvent from './SingleEvent';
import Dashboard from './Admin/Dashboard';
import Profile from './Profile';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path='/event/:id' element={<SingleEvent/>}/>
      </Routes>
    </>
  )
}

export default MainRoutes
