import { Text, Divider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Eventcreator } from '../components/Eventcreator';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvent } from '../redux/EventReducer/action';
import ExploreCard from '../components/ExploreCard';
import test from '@date/today'
import TopBar from '../components/TopBar';
import Mobilesidebar from './MobileSidebar';

const Explore = () => {
    const dispatch = useDispatch();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    let { isAuth } = useSelector((store) => store.AuthReducer);
    const events = useSelector((store) => store.EventReducer.events);
    let token = localStorage.getItem('trackster');
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };
    useEffect(() => {
        dispatch(GetEvent(token))
    }, [dispatch, token]);

    const [SignOpen, setSignOpen] = useState(false);
    function SignClose() {
        setSignOpen(!SignOpen);
    }
    function Timenow(date) {
        const previous = new Date(date);
        return (test.isToday(previous) == true)
    }
    const filteredEvents = events.filter((item) => (Timenow(item.date)));
    return (
        <div className="flex h-full justify-between w-screen">
            <Sidebar />
            <Mobilesidebar isOpen={isSidebarOpen} closeMenu={toggleSidebar}/>
            <div className="lg:w-[80%] md:w-[75%] w-full">
                <TopBar toggleSidebar={toggleSidebar}/>
                <Divider />
                <div className="overflow-auto">
                    <div className='p-2 overflow-y-hidden'>
                        <Text>Explore Calendars</Text>
                        
                        <div className='flex overflow-x-auto w-[65em]'>

                            {isAuth && events.map((item) => {
                                return (
                                    <ExploreCard key={item._id} item={item} />
                                )
                            })}
                        </div>
                        
                    </div>
                    <div className='flex gap-4 border-2 p-2 rounded-xl m-2 mt-4 sm:flex-col xs:flex-col'>
                        <div>
                            <img className='w-[70%] m-auto' src='https://flockstr.vercel.app/_next/image?url=https%3A%2F%2Fwhop.com%2F_next%2Fimage%2F%3Furl%3D%252Fv2%252Fhomepage-whop-sellers-grid.png%26w%3D1080%26q%3D75&w=640&q=75' />
                        </div>
                        <div className='lg:w-1/2 md:w-1/2 p-2 space-y-2 text-center'>
                            <Text className='font-semibold text-xl'>Create Events on <b className='text-orange-500'>Trackster</b></Text>
                            <Text>Start organizing your events an calendar on directly on Trackster. Seamlessly collect payments and engage with your community.</Text>
                            <button className='bg-orange-500 p-2 rounded-lg text-white' onClick={() => { setSignOpen(!SignOpen) }}>
                                Create an Event
                            </button>
                            {SignOpen && <Eventcreator
                                onOpens={SignOpen}
                                LetClose={SignClose} />}
                        </div>
                    </div>
                    {isAuth && filteredEvents.length > 0 && <div className='overflow-y-hidden' >
                        <div className='flex items-center gap-1 p-2'>
                            <Text>Happening Today</Text>
                            <div className='w-8'>
                                <iframe className='w-8 h-8' src="https://lottie.host/embed/426113a8-14ac-4148-bd46-744961283939/a5dsQamynl.json"></iframe>
                            </div>
                        </div>
                        
                            <div className='flex gap-5 overflow-x-auto w-[67em]'>
                                {filteredEvents.map((item) => {
                                    return (

                                        <ExploreCard key={item._id} item={item} />

                                    )
                                })}
                            </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Explore
