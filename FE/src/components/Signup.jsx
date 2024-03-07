/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Register } from '../redux/AuthReducer/action';
import { useDispatch } from 'react-redux';

export const SignupModal = ({ onOpens, LetClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    pass: '',
    city: ''
  });
  const [avatar,setAvatar]= useState(null)

  const handleChange = (e) => {
    const {type, name, value } = e.target;
    if (type === "file") {
      setAvatar(e.target.files[0]);
    } else {
      setFormData({...formData,[name]: value});
    }
};

  const handleSignup = (e) => {
    e.preventDefault()
    const formValue= new FormData();
    formValue.append('name',formData.name)
    formValue.append('email',formData.email)
    formValue.append('pass',formData.pass)
    formValue.append('city',formData.city)
    formValue.append('age',formData.age)
    formValue.append('avatar',avatar)
    (avatar)
    dispatch(Register(formValue))
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
       <form onSubmit={handleSignup}>
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
          <Input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            marginBottom={4}
            fontSize={"16px"} className='justify-center  items-center'
          />
          <Input
            name="avatar"
            type="file"
            onChange={handleChange}
            marginBottom={4}
            fontSize={"16px"} className='justify-center  items-center'
          />
          <Button
            colorScheme="white"
            fontSize="16"
            w="100%"
            fontWeight="400"
            bg="#2b3954"
            _hover={{ bgColor: "#e89f22" }}
            letterSpacing={"1px"}
            onClick={handleSignup}
            type="submit"
          >
            SIGN UP
          </Button>
          </form>
        </ModalBody>

        
      </ModalContent>
    </Modal>
  );
};