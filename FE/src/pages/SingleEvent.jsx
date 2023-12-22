import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import LoginMenu from "../components/Login"
import { CiSearch } from "react-icons/ci"
import { PiBellSimple } from 'react-icons/pi'
import { Divider, InputGroup, Input, InputRightElement } from "@chakra-ui/react"
const SingleEvent = () => {
    const { id } = useParams()
    console.log(id)
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
                <div>
                    
                </div>
                {id}
            </div>
        </div>
    )
}

export default SingleEvent
