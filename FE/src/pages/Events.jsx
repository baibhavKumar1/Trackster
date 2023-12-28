import { CiSearch } from "react-icons/ci"
import { PiBellSimple } from "react-icons/pi"
import { Divider, InputGroup, InputRightElement, Input, Text } from "@chakra-ui/react"
import LoginMenu from "../components/Login"
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import ExploreCard from '../components/ExploreCard'
import { useSelector,useDispatch } from "react-redux";
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
                <div className="my-2 flex items-center justify-between mx-4">
                    <div>
                        <InputGroup className="m-1 ml-4 " size="md">
                            <Input placeholder="Search.." className="" />
                            <InputRightElement><CiSearch /></InputRightElement>
                        </InputGroup>
                    </div>
                    <div className="flex gap-4 items-center">
                        <PiBellSimple size="2em" className="rounded-full bg-slate-200 p-2" />
                        <LoginMenu />
                    </div>
                </div>
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
