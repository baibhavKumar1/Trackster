import { InputGroup,InputRightElement,Input } from '@chakra-ui/react'
import { CiSearch } from 'react-icons/ci'
import LoginMenu from './Login'
import { PiBellSimple } from 'react-icons/pi'
const TopBar = () => {
  return (
    <div>
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
    </div>
  )
}

export default TopBar
