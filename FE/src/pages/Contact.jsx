
import { Input,Textarea , Button} from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import {FiMail, FiMapPin,FiPhone } from "react-icons/fi";

export default function Contact() {
  return (
    <>
    <Navbar/>
    <p className="text-3xl text-center py-9 font-bold text-orange-400">Contact Us</p>
    <div className="grid gap-12 lg:grid-cols-3 lg:gap-8 p-12 bg-gray-100">
    
      <div className="space-y-4 lg:col-span-2">
      
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-orange-400">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400">Please fill out the form below to contact our team.</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="first-name">First name</label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="last-name">Last name</label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <label htmlFor="message">Message</label>
            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
          </div>
          <Button>Send message</Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-orange-400">Contact Information</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Contact us via phone, email, or visit our office during business hours.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FiPhone size="1.5em" />
            <div className="space-y-1.5">
              <h4 className="font-medium">Call us</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">+1 (123) 456-7890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FiMail size="1.5em" />
            <div className="space-y-1.5">
              <h4 className="font-medium">Email</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">info@example.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FiMapPin className="w-6 h-6 flex-shrink-0" />
            <div className="space-y-1.5">
              <h4 className="font-medium">Office</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">123 Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div></>
  )
}

