import { Divider, Text } from "@chakra-ui/react"
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import TopBar from "../components/TopBar";
import ExploreCard from '../components/ExploreCard'
import { useSelector, useDispatch } from "react-redux";
import test from '@date/today'
import { GetAttendingEvent } from "../redux/EventReducer/action";
const Events = () => {
    const dispatch = useDispatch();
    let { isAuth } = useSelector((store) => store.AuthReducer);
    const events = useSelector((store) => store.EventReducer.attendingEvents);
    //(events)
    let token = localStorage.getItem('trackster');
    useEffect(() => {
        dispatch(GetAttendingEvent(token))
    }, [dispatch, token]);
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
      
      return (
        <div className="flex h-full justify-between w-screen">
          <Sidebar />
          <div className="lg:w-[80%] md:w-[80%] w-full">
            <TopBar />
            <Divider />
            <div className="grid grid-cols-2 grid-row-flow p-4">
            <div>
              <Text className="ml-2 text-xl">Attending Events</Text>
              <div className=" grid grid-cols-4 grid-flow-row right-0 w-full">
                {isAuth && filteredAfterEvents.length > 0 ? filteredAfterEvents.map((item) => {
                  return (
                    <div key={item._id} >
                      <ExploreCard item={item} />
                      
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
                    <div key={item._id} >
                      <ExploreCard item={item} />
                      
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

export default Events
