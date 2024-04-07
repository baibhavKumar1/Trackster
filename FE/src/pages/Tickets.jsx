import { useEffect, useState } from 'react'
import { GetSingleEvent, AddAttendee } from '../redux/EventReducer/action'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Input, InputGroup, InputRightAddon, Button, useToast, Divider } from "@chakra-ui/react"
import Sidebar from './Sidebar'
import TopBar from '../components/TopBar'

const Tickets = () => {
  const toast = useToast()
  const arr = Array.from({ length: 30 }, (_, index) => index + 1);
  const navigate = useNavigate()
  const [selectedSeat, setSelectedSeat] = useState(null);

  const userURL = import.meta.env.VITE_BACKEND_URL
  const { id } = useParams()
  let token = useSelector((store) => store.AuthReducer.token) || localStorage.getItem('trackster');
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(GetSingleEvent({ id, token }))
    }
  }, [dispatch, token, id]);

  let { isAuth } = useSelector((store) => store.AuthReducer);
  const event = useSelector((store) => store.EventReducer.singleEvent);

  const imageUrl = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  const Add = () => {
    dispatch(AddAttendee({ id, token,navigate, toast }))
  }

  const handleSeatSelection = (seat) => {
    setSelectedSeat((prevSeat) => {
      // If the clicked seat is already selected, unselect it
      if (prevSeat === seat) {
        return null;
      }
      // Otherwise, select the clicked seat
      return seat;
    });
    // setSelectedSeat(seat);
  }

  const calculatePrice = () => {
    if (selectedSeat === null) {
      return 0;
    }
    if (selectedSeat < 7) {
      return 300;
    } else if (selectedSeat < 19) {
      return 200;
    } else {
      return 100;
    }
  }

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div className="lg:w-[80%] md:w-[75%] w-full">
        <TopBar />
        <Divider />
        <div className="py-6 lg:py-14 px-4 md:px-6">
          {isAuth && event.name && <div className="grid gap-6 lg:grid-cols-2 xl:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{event.name.toUpperCase()}</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {event.description}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p>Select Your Seat</p>
                  <p className='text-center mb-1'>Stage</p>
                  <div className='border-t border-orange-500 grid grid-cols-6 w-[400px] grid-flow-rows gap-2 p-2 m-auto'>
                    {arr.map((item, index) => (
                      <button
                        className={`border border-orange-500 rounded px-1.5  ${selectedSeat === item ? 'bg-orange-500 text-white' : ''}`}
                        key={index}
                        onClick={() => handleSeatSelection(item)}
                        disabled={selectedSeat !== null && selectedSeat !== item}
                      >
                        {index < 6 ? "$300" : index < 18 && index >= 6 ? "$200" : "$100"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className='flex justify-between'>
                  <p>Total Amount</p>
                  <p>${calculatePrice()}</p>
                </div>
                <InputGroup>
                  <Input placeholder='Enter Discount Code (Optional)' />
                  <InputRightAddon>
                    <button>Apply discount</button>
                  </InputRightAddon>

                </InputGroup>
                <Button className="w-full" onClick={Add}>
                  Buy Tickets
                </Button>
              </div>

            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Music in the Park"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="337"
                src={event.image ? `${userURL}/${event.image}` : imageUrl}
                width="600"
              />
            </div>
          </div>}
        </div></div>
    </div>
  )
}

export default Tickets
