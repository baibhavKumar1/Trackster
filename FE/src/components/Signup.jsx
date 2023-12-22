/* eslint-disable react/prop-types */
import { useState } from 'react';
import {Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react';
import { Register } from '../redux/AuthReducer/action';
 import { useDispatch } from 'react-redux';

export const SignupModal = ({ onOpens, LetClose }) => {
   const dispatch=useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    console.log(formData)
    dispatch(Register(formData))
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })
    LetClose();
  };

  return (
    <Modal isOpen={onOpens} onClose={LetClose} size="sm" isCentered >
      <ModalOverlay />
      <ModalContent fontFamily={"poppins"} borderRadius={"15px"}>

        <ModalHeader border="none" fontWeight={"bold"} color="#2b3954"
          fontSize="25" className='text-center'>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            marginBottom={4}
            fontSize={"16px"} className='justify-center  items-center'
          />
          <Input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            marginBottom={4}
            fontSize={"16px"} className='justify-center items-center'
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            marginBottom={4}
           fontSize={"16px"} className='justify-center  items-center'
          />
          <Input
            name="pass"
            type="password"
            placeholder="Password"
            value={formData.pass}
            onChange={handleChange}
            marginBottom={4}
            fontSize={"16px"} className='justify-center  items-center'
          />
        </ModalBody>

        <ModalFooter>

          <Button
            colorScheme="white"
            fontSize="16"
            w="100%"
            fontWeight="400"
            bg="#2b3954"
            _hover={{ bgColor: "#e89f22" }}
            letterSpacing={"1px"}
            onClick={handleSignup}

          >
            SIGN UP
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};