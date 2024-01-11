
import { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { CiUser } from 'react-icons/ci'
import { Button, Input, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, VStack, Box, useDisclosure, InputGroup, InputLeftElement, InputRightElement, Text, } from '@chakra-ui/react';
import { BiSolidLockAlt } from "react-icons/bi";
import { PiEyeBold, PiEyeClosedBold, } from 'react-icons/pi';

import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../redux/AuthReducer/action';
import { SignupModal } from './Signup';
import { NavLink } from 'react-router-dom';

const LoginMenu = () => {
    const [SignOpen, setSignOpen] = useState(false);
    function SignClose() {
        setSignOpen(!SignOpen);
    }
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [email, setUsername] = useState("");
    const dispatch = useDispatch();
    const [pass, setPassword] = useState("");
    // let {token} = useSelector((store) => store.AuthReducer)||localStorage.getItem('token');
    let { isAuth, name } = useSelector((store) => store.AuthReducer);

    function HandleLogout() {
        //dispatch(LogoutStoringUserDatainLS);
    }

    const handleSubmit = () => {
         dispatch(Login({ email, pass }));
        onClose()
    }

    return (
        <VStack align="end">
            <Popover isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose} placement="bottom-end">
                <PopoverTrigger>
                    <Button className='rounded-full'>
                        <CiUser />
                    </Button>
                </PopoverTrigger>
                {isAuth ?
                    <PopoverContent w={"100%"} m="5px" p="10px" borderRadius={"15px"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader border="none" fontWeight={"bold"} color="#2b3954"
                            fontSize="22">Welcome,<Text textTransform={"capitalize"}>{name}</Text>
                        </PopoverHeader>
                        <PopoverBody >
                            <NavLink to='/admin' className='mb-2'><Box className='border'><Text>My Events</Text></Box></NavLink>
                            <Button colorScheme="white" fontSize="16" w="100%" fontWeight="400" bg="#2b3954" _hover={{ bgColor: "#e89f22" }} letterSpacing={"1px"} onClick={HandleLogout}>LOGOUT
                            </Button>
                        </PopoverBody>
                    </PopoverContent>
                    :
                    <PopoverContent m="5px" p="10px" borderRadius={"15px"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader border="none" fontWeight={"bold"} color="#2b3954" fontSize="25">Login</PopoverHeader>
                        <PopoverBody>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' fontSize={"22px"} className='justify-center text-center items-center'>
                                    <MdEmail />
                                </InputLeftElement>
                                <Input value={email} type='email' onChange={(e) => setUsername(e.target.value)} placeholder="User Email" marginBottom={2} />
                            </InputGroup>

                            <InputGroup>
                                <InputLeftElement pointerEvents='none' fontSize={"22px"} className='justify-center text-center items-center'>
                                    <BiSolidLockAlt />
                                </InputLeftElement>
                                <Input value={pass} onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} placeholder="Password" marginBottom={2} />
                                <InputRightElement>
                                    {!show ? <PiEyeClosedBold fontSize={"18px"} className='justify-center text-center items-center' onClick={handleClick} /> : <PiEyeBold fontSize={"18px"} className='justify-center text-center items-center' onClick={handleClick} />}
                                </InputRightElement>
                            </InputGroup>

                            <Button colorScheme="white" fontSize="16" w="100%" fontWeight="400" bg="#2b3954" _hover={{ bgColor: "#e89f22" }} letterSpacing={"1px"} onClick={handleSubmit}>
                                LOGIN
                            </Button>

                            <Box m={"10px 35%"} mb={"0"} className='justify-center  items-center' w={"100%"}>
                                <Button color="#2b3954" fontSize="sm" variant={"link"} onClick={() => { setSignOpen(!SignOpen) }} textDecoration="none">
                                    New User ?
                                </Button>
                                {SignOpen && <SignupModal
                                    onOpens={SignOpen}
                                    LetClose={SignClose} />}
                            </Box>

                        </PopoverBody>
                    </PopoverContent>}
            </Popover>
        </VStack>
    );
};

export default LoginMenu;
