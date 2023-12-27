import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import LoginMenu from "../components/Login"
import { CiSearch } from "react-icons/ci"
import { PiBellSimple } from 'react-icons/pi'
import { FiRadio } from 'react-icons/fi'
import { TbMessages } from 'react-icons/tb'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import { Divider, InputGroup, Input, InputRightElement, Text } from "@chakra-ui/react"
import { TiLocation } from "react-icons/ti"
import { MdPeople } from "react-icons/md"
import { IoIosPeople } from 'react-icons/io'
const SingleEvent = () => {
    const { id } = useParams()
    //console.log(id)
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
                    <div className="bg-gray-300 rounded-xl p-3">
                        <img src='https://images.unsplash.com/photo-1592089654538-a122ce23241b' alt="img" className="h-[500px] w-full rounded-xl" />
                        <div className="flex justify-between m-2">
                            <div>
                                <Text className="text-3xl">Protest event</Text>
                                <Text className="border w-max border-gray-800 px-1 rounded-lg">Admin</Text>
                            </div>
                            <div className="flex flex-col">
                                <button className="bg-rose-400 p-2 rounded-xl self-end">RSVP</button>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="border rounded-lg h-max">
                                        <Text className="bg-gray-400 rounded-lg text-xs p-0.5 px-2">JAN</Text>

                                        <Text className="rounded-lg text-center bg-white text-xs p-0.5">1</Text>
                                    </div>
                                    <div>
                                        <Text className="font-semibold">Sunday, January 1st</Text>
                                        <Text>1:31 AM to 2:31 AM</Text>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="border m-auto p-2.5 rounded-l"><TiLocation /></div>
                                    <div>
                                        <Text className="font-semibold">Odell Brewing Sloans Lake Brewhouse & Pizzeria
                                        </Text>
                                        <Text>1625 Perry St, Denver, CO 80204, USA</Text>
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
                            <div className="bg-white m-2 rounded-xl p-1">{id}</div>
                        </div>
                        <div className=" items-center bg-rose-300 rounded-xl gap-2">
                            <div className="flex items-center gap-2 p-1">
                                <IoIosPeople />
                                <Text>Attendees</Text>
                            </div>
                            <div className="bg-white m-2 rounded-xl p-1">Hi</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SingleEvent
