import { Divider, Text } from "@chakra-ui/react"
import AdminSidebar from "./AdminSidebar"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import test from '@date/today'
import { DeleteEvent, GetHostingEvent } from "../../redux/EventReducer/action"
import ExploreCard from "../../components/ExploreCard"
import TopBar from "../../components/TopBar"
import { Eventcreator } from "../../components/EventEditor"
const Dashboard = () => {
  const dispatch = useDispatch();
  let { isAuth } = useSelector((store) => store.Reducer);
  const events = useSelector((store) => store.EventReducer.hostingEvents);
  let token = localStorage.getItem('token');
  const [SignOpen, setSignOpen] = useState(false);
  function SignClose() {
    setSignOpen(!SignOpen);
  }
  useEffect(() => {
    dispatch(GetHostingEvent(token))
  }, [dispatch, token]);
  const handleDelete=(id)=>{
    console.log(id)
    dispatch(DeleteEvent({id,token}))
  }
  function Timenow(date) {
    const previous = new Date(date);
    return (test.isToday(previous) == true)
  }
  const filteredEvents = events.filter((item) => (Timenow(item.date)));
  console.log(filteredEvents.length)
  return (
    <div className="flex h-full justify-between relative">
      <AdminSidebar />
      <Divider />
      <div className="absolute right-0 w-5/6">
        <TopBar />
        <Divider />
        <div>
          <Text className="ml-2 text-xl">Hosting Events</Text>
          <div className="absolute grid grid-cols-4 grid-flow-row right-0 w-full">
            {isAuth && events.length > 0 ? events.map((item) => {
              return (
                <div key={item._id} >
                  <ExploreCard item={item} />
                  <div className="flex justify-around">
                    <button className="bg-red-500 p-2 rounded-lg text-white" onClick={handleDelete(item._id)}>Delete Event</button>
                    <button className='bg-orange-500 p-2 rounded-lg text-white' onClick={() => { setSignOpen(!SignOpen) }}>Edit Event</button>
                    {SignOpen && <Eventcreator onOpens={SignOpen} LetClose={SignClose} />}
                  </div>
                </div>
              )
            }) : <div>No events found</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
