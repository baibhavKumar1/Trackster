import {Routes,Route} from 'react-router-dom';

import Home from './Home';
import Explore from './Explore';
import Events from './Events';
import SingleEvent from './SingleEvent';
import Dashboard from './Admin/Dashboard';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path='/event/:id' element={<SingleEvent/>}/>
      </Routes>
    </>
  )
}

export default MainRoutes
