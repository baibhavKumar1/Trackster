import { Button, Text } from "@chakra-ui/react"
import { CiLocationOn, CiSearch } from "react-icons/ci"
import { PiClock, PiBellSimple } from "react-icons/pi"
import { Divider, InputGroup, InputRightElement, Input } from "@chakra-ui/react"
import LoginMenu from "../components/Login"
import Sidebar from "./Sidebar"
const Events = () => {
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
                <div className="m-2 mr-0">
                    <Text className="text-3xl mb-2">Upcoming Events</Text>
                    <div className="overflow-y-scroll h-[34em]">
                        <div className="flex relative justify-center">
                            <div className="sticky border top-0 h-12 flex gap-3 rounded-lg m-2 items-center">
                                <div className="bg-orange-600 rounded-l-lg h-full py-2.5 px-4">Mon</div>
                                <div className="rounded-r-lg px-8">
                                    <Text className="">July 1st</Text>
                                    <Text className="text-xs">now</Text>
                                </div>
                            </div>
                            <div className="w-max m-2">
                                <div className="p-3 mb-3 border rounded-lg">
                                    <Text className="text-sm">Test Botser</Text>
                                    <div className="flex">
                                        <div className="w-4/6 space-y-2">
                                            <Text className="font-bold text-lg">Shock and awe potato salad </Text>
                                            <Text className="">Controversial juicy flame-grilled microwaved WalMart</Text>
                                            <div className="flex items-center gap-1"><PiClock color="orange" /><Text>11:34pm</Text><CiLocationOn color="orange" /><Text>34016 Stark Glen</Text></div>
                                            <div className="flex gap-2"><Button colorScheme="orange" width="70%">RSVP</Button><Button>Details</Button></div>
                                        </div>
                                        <div className="bg-orange-400 w-2/5 rounded-lg text-center mx-4">Hi</div>
                                    </div>
                                </div>
                                <div className="p-3 mb-3 border rounded-lg">
                                    <Text className="text-sm">Test Botser</Text>
                                    <div className="flex">
                                        <div className="w-4/6 space-y-2">
                                            <Text className="font-bold text-lg">Shock and awe potato salad </Text>
                                            <Text className="">Controversial juicy flame-grilled microwaved WalMart</Text>
                                            <div className="flex items-center gap-1"><PiClock color="orange" /><Text>11:34pm</Text><CiLocationOn color="orange" /><Text>34016 Stark Glen</Text></div>
                                            <div className="flex gap-2"><Button colorScheme="orange" width="70%">RSVP</Button><Button>Details</Button></div>
                                        </div>
                                        <div className="bg-orange-400 w-2/5 rounded-lg text-center mx-4">Hi</div>
                                    </div>
                                </div>
                                <div className="p-3 mb-3 border rounded-lg">
                                    <Text className="text-sm">Test Botser</Text>
                                    <div className="flex">
                                        <div className="w-4/6 space-y-2">
                                            <Text className="font-bold text-lg">Shock and awe potato salad </Text>
                                            <Text className="">Controversial juicy flame-grilled microwaved WalMart</Text>
                                            <div className="flex items-center gap-1"><PiClock color="orange" /><Text>11:34pm</Text><CiLocationOn color="orange" /><Text>34016 Stark Glen</Text></div>
                                            <div className="flex gap-2"><Button colorScheme="orange" width="70%">RSVP</Button><Button>Details</Button></div>
                                        </div>
                                        <div className="bg-orange-400 w-2/5 rounded-lg text-center mx-4">Hi</div>
                                    </div>
                                </div>
                                <div className="p-3 mb-3 border rounded-lg">
                                    <Text className="text-sm">Test Botser</Text>
                                    <div className="flex">
                                        <div className="w-4/6 space-y-2">
                                            <Text className="font-bold text-lg">Shock and awe potato salad </Text>
                                            <Text className="">Controversial juicy flame-grilled microwaved WalMart</Text>
                                            <div className="flex items-center gap-1"><PiClock color="orange" /><Text>11:34pm</Text><CiLocationOn color="orange" /><Text>34016 Stark Glen</Text></div>
                                            <div className="flex gap-2"><Button colorScheme="orange" width="70%">RSVP</Button><Button>Details</Button></div>
                                        </div>
                                        <div className="bg-orange-400 w-2/5 rounded-lg text-center mx-4">Hi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex relative justify-center">
                            <div className="sticky border top-0 h-12 flex gap-3 rounded-lg m-2 items-center">
                                <div className="bg-orange-600 rounded-l-lg h-full py-2.5 px-4">Mon</div>
                                <div className="rounded-r-lg px-8">
                                    <Text className="">July 1st</Text>
                                    <Text className="text-xs">now</Text>
                                </div>
                            </div>
                            <div className="border w-max m-2 rounded-lg p-3">
                                <div className="p-3 mb-3 border rounded-lg">
                                    <Text className="text-sm">Test Botser</Text>
                                    <div className="flex">
                                        <div className="w-4/6 space-y-2">
                                            <Text className="font-bold text-lg">Shock and awe potato salad </Text>
                                            <Text className="">Controversial juicy flame-grilled microwaved WalMart</Text>
                                            <div className="flex items-center gap-1"><PiClock color="orange" /><Text>11:34pm</Text><CiLocationOn color="orange" /><Text>34016 Stark Glen</Text></div>
                                            <div className="flex gap-2"><Button colorScheme="orange" width="70%">RSVP</Button><Button>Details</Button></div>
                                        </div>
                                        <div className="bg-orange-400 w-2/5 rounded-lg text-center mx-4">Hi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
