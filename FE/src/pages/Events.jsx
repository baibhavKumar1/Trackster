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
    let { isAuth } = useSelector((store) => store.Reducer);
    const events = useSelector((store) => store.EventReducer.attendingEvents);
    console.log(events)
    let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(GetAttendingEvent(token))
    }, [dispatch, token]);
    function Timenow(date) {
        const t = date
        const previous = new Date(t);
        return (test.isAfterToday(previous) == true)
    }
    const filteredEvents = events.filter((item) => (Timenow(item.date)));
    return (
        <div className="flex h-full justify-between relative">
            <Sidebar />
            <div className=" absolute right-0  w-5/6">
                <TopBar />
                <Divider />
                <div>
                    <Text className="ml-2 text-xl">Upcoming Events</Text>
                    <div className="absolute grid grid-cols-4 grid-flow-row right-0 w-full">
                        {isAuth && filteredEvents.length > 0 ? filteredEvents.map((item) => {
                            return (
                                <ExploreCard key={item._id} item={item} />
                            )
                        }) : <div>No events found</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
