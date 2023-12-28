import { Divider } from "@chakra-ui/react"
import AdminSidebar from "./AdminSidebar"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import test from '@date/today'
import { GetHostingEvent } from "../../redux/EventReducer/action"
const Dashboard = () => {
  const dispatch = useDispatch();
    let { isAuth } = useSelector((store) => store.Reducer);
  const events = useSelector((store) => store.EventReducer.hostingEvents);
  let token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(GetHostingEvent(token))
    }, [dispatch, token]);
  function Timenow(date){
    const previous = new Date(date);
    return (test.isToday(previous)==true)
  }
  const filteredEvents = events.filter((item) => (Timenow(item.date)));
  console.log(filteredEvents.length)
  return (
    <div className="flex h-full justify-between relative">
      <AdminSidebar />
      <Divider />
      <div className="absolute right-0 border w-5/6">
        {isAuth && events.length>0?events.map((item) => {
          return (
            <div key={item._id}>
              <p>{item._id}</p>
              <p>{item.date}</p>
            </div>
          )
        }):<div>No events found</div>}
      </div>
    </div>
  )
}

export default Dashboard
