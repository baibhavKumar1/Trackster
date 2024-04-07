import { Divider, Text } from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import test from '@date/today'
import { DeleteEvent, GetHostingEvent } from "../../redux/EventReducer/action"
import ExploreCard from "../../components/ExploreCard"
import TopBar from "../../components/TopBar"
import { EventEditor } from "../../components/EventEditor"
import Sidebar from "../Sidebar"
const Dashboard = () => {
  const dispatch = useDispatch();
  let { isAuth } = useSelector((store) => store.AuthReducer);
  const events = useSelector((store) => store.EventReducer.hostingEvents);
  let token = localStorage.getItem('trackster');
  const [SignOpen, setSignOpen] = useState(false);
  function SignClose() {
    setSignOpen(!SignOpen);
  }
  useEffect(() => {
    dispatch(GetHostingEvent(token))
  }, [dispatch, token]);
  const handleDelete = (id) => {
    //(id)
    dispatch(DeleteEvent({ id, token }))
  }
  function TimeBefore(date) {
    const previous = new Date(date);
    return (test.isBeforeToday(previous) == true)
  }
  function TimeAfter(date) {
    const previous = new Date(date);
    return (test.isBeforeToday(previous) == false)
  }
  const filteredBeforeEvents = events.filter((item) => (TimeBefore(item.date)));
  const filteredAfterEvents = events.filter((item) => (TimeAfter(item.date)));
  // //(filteredEvents.length)
  return (
    <div className="flex h-full justify-between ">
      <Sidebar />
      <div  className="lg:w-[80%] md:w-[75%] w-full">
        <TopBar />
        <Divider />
        <div className="flex flex-col gap-2">
          <div>
            <Text className="ml-2 text-xl">Hosting Events</Text>
            <div className=" grid grid-cols-4 grid-flow-row right-0 w-full">
              {isAuth && filteredAfterEvents.length > 0 ? filteredAfterEvents.map((item) => {
                return (
                  <div key={item._id} className=" w-max">
                    <ExploreCard item={item} />
                    <div className="flex justify-around">
                      <button className="border border-red-500 p-2 rounded-lg font-mono" onClick={() => { handleDelete(item._id) }}>Delete Event</button>
                      <button className='bg-orange-500 p-2 rounded-lg text-white font-mono' onClick={() => { setSignOpen(!SignOpen) }}>Edit Event</button>
                      {SignOpen && <EventEditor onOpens={SignOpen} LetClose={SignClose} item={item} />}
                    </div>
                  </div>
                )
              }) : <div>No events found</div>}
            </div>
          </div>
          <div>
            <Text className="ml-2 text-xl">Ended Events</Text>
            <div className=" grid grid-cols-4 grid-flow-row right-0 w-full">
              {isAuth && filteredBeforeEvents.length > 0 ? filteredBeforeEvents.map((item) => {
                return (
                  <div key={item._id} className="w-max">
                    <ExploreCard item={item} />
                    <div className="flex justify-around">
                      <button className="border border-red-500 p-2 rounded-lg font-mono" onClick={() => { handleDelete(item._id) }}>Delete Event</button>
                      <button className='bg-orange-500 p-2 rounded-lg text-white font-mono' onClick={() => { setSignOpen(!SignOpen) }}>Edit Event</button>
                      {SignOpen && <EventEditor onOpens={SignOpen} LetClose={SignClose} id={item._id} />}
                    </div>
                  </div>
                )
              }) : <div>No events found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
