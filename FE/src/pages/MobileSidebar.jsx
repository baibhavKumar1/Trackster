/* eslint-disable react/prop-types */
import { GiFeather } from "react-icons/gi";
import { FaBell, FaCalendarDays, FaGear,FaXmark } from "react-icons/fa6";
import { HiClipboardList } from "react-icons/hi";
import { TbFileInvoice } from "react-icons/tb";
import { MdDashboard, MdInsertChart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const Mobilesidebar = ({ isOpen, closeMenu }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`z-50 fixed sm:block hidden top-0 left-0 h-full w-[80%] rounded-r-xl bg-gray-100 text-black transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform ease-in-out duration-300`}
    >
      
      <div className='w-[90%] m-auto h-full py-10 space-y-8 '>
      <div className='flex justify-between'>
      <div className='flex gap-4 justify-center items-center'>
      <GiFeather size="2em" color="orange" onClick={()=>navigate('/')}/>
      <p className='text-2xl text-orange-400'>TRACKSTER</p>
      </div>
      <button onClick={closeMenu}><FaXmark/></button>
      </div>
      <div className='w-4/5 m-auto space-y-8'>
      <div className='flex gap-4 items-center'>
      <MdDashboard size="1.5em" color='gray'/>
        <p className='text-lg'>Dashboard</p>
      </div>      
      <Link to='/explore' ><p>Explore</p></Link>
        <Link className='' to='/events'><p>Events</p></Link>
        <Link to='/about'><p>About</p></Link>
        <Link to='/contact'><p>Contact</p></Link>
      <div className='flex gap-4 items-center'>
      
      <FaGear  size="1.5em" color='gray'/>
        <p className='text-lg'>Settings</p>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Mobilesidebar;
