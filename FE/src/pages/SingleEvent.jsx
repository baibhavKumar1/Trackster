import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import LoginMenu from "../components/Login"
import { CiCalendar, CiSearch } from "react-icons/ci"
import { PiBellSimple } from 'react-icons/pi'
import { FiRadio } from 'react-icons/fi'
import { TbMessages } from 'react-icons/tb'
import { FaPlusCircle } from 'react-icons/fa'
import {
    Divider, InputGroup, Input, InputRightElement, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/react"
import { TiLocation } from "react-icons/ti"
import { MdPeople } from "react-icons/md"
import { IoIosPeople } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react"
import { AddAttendee, GetSingleEvent, RemoveAttendee } from '../redux/EventReducer/action.js'
const SingleEvent = () => {
    const userURL = import.meta.env.VITE_BACKEND_URL
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        dispatch(AddAttendee({ id, token }))
    }
    const deleteAttendee=()=>{
        dispatch(RemoveAttendee({id,token}))
    }
    const userURL = import.meta.env.VITE_BACKEND_URL
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
                    {isAuth && event.name && <>
                        <div className="bg-gray-300 rounded-xl p-3">
                            <img src={event.image? `${userURL}/${event.image}` : imageUrl }
                                alt="img" className="h-[500px] w-full rounded-xl" />
                            <div className="flex justify-between m-2">
                                <div>
                                    <Text className="text-3xl">{event.name}</Text>
                                    <Text className="border w-max border-gray-800 px-1 rounded-lg">{event.description}</Text>
                                    
                                </div>
                                <div className="flex flex-col">
                                    <button className="bg-rose-400 p-2 rounded-xl self-end" onClick={Add}>RSVP</button>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="border m-auto p-2.5 rounded-l">
                                            <CiCalendar/>
                                        </div>
                                        <div>
                                            <Text className="font-semibold">{event.date}</Text>
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
                                    <Button onClick={onOpen}><FaPlusCircle color="orange" /></Button>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Add question</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Input type="textarea" placeholder="Write here" />
                                            </ModalBody>
                                            <Button>Submit</Button>
                                        </ModalContent>

                                    </Modal>
                                </div>

                                <div className="bg-white m-2 rounded-xl p-1">No discussions</div>
                            </div>
                            <div className=" items-center bg-rose-300 rounded-xl gap-2">
                                <div className="flex items-center gap-2 p-1">
                                    <MdPeople />
                                    <Text>Host</Text>
                                </div>
                                <div className="bg-white m-2 rounded-xl flex p-1">
                                <img src={`${userURL}/${event.host.avatar}`} className="w-8"/>
                                <p>{event.host.name}</p>
                                {event.hostId}
                                </div>
                            </div>
                            <div className=" items-center bg-rose-300 rounded-xl gap-2">
                                <div className="flex items-center gap-2 p-1">
                                    <IoIosPeople />
                                    <Text>{event.attendees.length} Attendees</Text>
                                </div>
                                {event.attendees.map((item)=>{
                                return(
                                <div key={item.userID} className="flex justify-between bg-white m-2 p-1 rounded-xl">
                                    <div className="  flex gap-2">
                                        <img src={`${userURL}/${item.userImage}`} className="w-8" alt="img"/>
                                        <p>{item.userName}</p>
                                    </div>
                                    <Button onClick={deleteAttendee}>Remove</Button>
                                    </div>
                                    )}
                                )}
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
