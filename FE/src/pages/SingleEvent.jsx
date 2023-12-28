import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import LoginMenu from "../components/Login"
import { CiSearch } from "react-icons/ci"
import { PiBellSimple } from 'react-icons/pi'
import { FiRadio } from 'react-icons/fi'
import { TbMessages } from 'react-icons/tb'
import { FaPlusCircle } from 'react-icons/fa'
import { Divider, InputGroup, Input, InputRightElement, Text } from "@chakra-ui/react"
import { TiLocation } from "react-icons/ti"
import { MdPeople } from "react-icons/md"
import { IoIosPeople } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react"
import {AddAttendee, GetSingleEvent} from '../redux/EventReducer/action.js'
const SingleEvent = () => {
    const { id } = useParams()
    //console.log(id)
    const eventId= id;
    const dispatch= useDispatch();
    let { isAuth } = useSelector((store) => store.Reducer);
    const event = useSelector((store) => store.EventReducer.singleEvent);
    console.log(event)
    let token = localStorage.getItem('token');
    
    useEffect(() => {
        dispatch(GetSingleEvent({id,token}))
    }, [dispatch, token]);
    const Add=()=>{
        console.log("yes")
        dispatch(AddAttendee({eventId,token}))
    }
    function Getday(event) {
        const dateObject = new Date(event.date);
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = dateFormatter.format(dateObject); 
        return formattedDate
        //console.log(formattedDate)
    }
    const date= Getday(event)

    return (
        <div className="flex h-full justify-between relative">
            <Sidebar />
            <div className=" absolute right-0 border w-5/6">
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
                <div className=" m-4">
                {isAuth && <>
                    <div className="bg-gray-300 rounded-xl p-3">
                        <img src={event.image} alt="img" className="h-[500px] w-full rounded-xl" />
                        <div className="flex justify-between m-2">
                            <div>
                                <Text className="text-3xl">{event.name}</Text>
                                <Text className="border w-max border-gray-800 px-1 rounded-lg">{event.description}</Text>
                            </div>
                            <div className="flex flex-col">
                                <button className="bg-rose-400 p-2 rounded-xl self-end" onClick={Add}>RSVP</button>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="border rounded-lg h-max">
                                        <Text className="bg-gray-400 rounded-lg text-xs p-0.5 px-2">JAN</Text>

                                        <Text className="rounded-lg text-center bg-white text-xs p-0.5">1</Text>
                                    </div>
                                    <div>
                                        <Text className="font-semibold">{date}</Text>
                                        <Text>1:31 AM to 2:31 AM</Text>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="border m-auto p-2.5 rounded-l"><TiLocation /></div>
                                    <div>
                                        <Text className="font-semibold">{event.venue}
                                        </Text>
                                        <Text>{event.venue}</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 mt-2 grid-flow-col gap-4">
                        <div className=" border w-full bg-rose-300 border rounded-lg">
                            <Text className="flex items-center gap-2 p-0.5 px-1"><FiRadio />Announcement</Text>
                            <div className=" h-24 m-1 bg-white rounded-xl"><Text>No Announcement</Text>
                            </div>
                        </div>
                        <div className="items-center bg-rose-300 rounded-xl border">
                            <div className="flex items-center gap-2 p-1">
                                <TbMessages /><Text>Discussion</Text>
                                <FaPlusCircle color="darkorange" />
                            </div>

                            <div className="bg-white m-2 rounded-xl p-1">Hi</div>
                        </div>
                        <div className=" items-center bg-rose-300 rounded-xl gap-2">
                            <div className="flex items-center gap-2 p-1">
                                <MdPeople />
                                <Text>Host</Text>
                            </div>
                            <div className="bg-white m-2 rounded-xl p-1">{event.hostId}</div>
                        </div>
                        <div className=" items-center bg-rose-300 rounded-xl gap-2">
                            <div className="flex items-center gap-2 p-1">
                                <IoIosPeople />
                                <Text>{event.attendees.length} Attendees</Text>
                            </div>
                            <div className="bg-white m-2 rounded-xl p-1">{event.attendees[0]}</div>
                        </div>
                    </div>
                    </>
                }
                </div>

            </div>
        </div>
    )
}

export default SingleEvent
