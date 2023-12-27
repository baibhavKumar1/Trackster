import { Divider } from "@chakra-ui/react"
import AdminSidebar from "./AdminSidebar"
import { useSelector } from "react-redux"

import test from '@date/today'
const Dashboard = () => {
  const events = useSelector((store) => store.EventReducer.events);
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
        {filteredEvents.length>0?filteredEvents.map((item) => {
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
