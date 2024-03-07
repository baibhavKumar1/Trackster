import { Link, NavLink } from 'react-router-dom'
import { GiFeather } from 'react-icons/gi'
import { Text } from '@chakra-ui/react'
import LoginMenu from '../components/Login'
const Home = () => {
  return (
    <div>
      <div className='flex m-3 items-center justify-around'>
      <Link to='/'>
          <div className="mt-1">
            <GiFeather color="darkorange" size="2em" />
          </div>
        </Link>
        <Link to='/explore'><p>Explore</p></Link>
        <Link to='/events'><p>Events</p></Link>
        
        <Link to='/about'><p>About</p></Link>
        <Link to='/contact'><p>Contact</p></Link>
        <LoginMenu/>
      </div>
      <div className='flex p-16 m-16 gap-24'>
        <div className='space-y-3'>
          <div>
            <Text className='text-3xl'>Own your Events</Text>
            <Text className='text-3xl'>Only on <b className='text-orange-500'>Trackster</b></Text>
          </div>
          <Text className=''>We&apos;re bringing events and meet ups onto Trackster. The days of walled gardens are coming to an end. It&apos;s time to truly own your events, no-longer dependent on an external company.</Text>
          <button className='bg-orange-500 text-white p-3 rounded-xl'><NavLink to='/explore'>Start Exploring</NavLink></button>
        </div>
        <div>
          <img className='w-[900px] h-[300px] rounded-xl' src='https://images.unsplash.com/photo-1523580494863-6f3031224c94' alt='img' />
        </div>
      </div>
      <div className='flex items-center p-16 m-16 gap-20'>
      <div className='space-y-3 w-[700px]'>
        <Text className='font-bold text-2xl'>Why Trackster</Text>
        <Text>
          The internet is changing. We have shifted from the open frontier of &ldquo;The Network&rdquo; to a series of walled gardens hording userdata to best monetize their engagement. Trackster breaks down these walls, your data follows you wherever you decide to go.</Text>
        <Text>This is often portrayed as a defense against the censorious Big Tech company. But, it means so much more. It means having the freedom to move to a different platform for reasons as simple as preferring the UI, or maybe just exploring a new feature.
        </Text>
        <Text>Switching from one platform to another is as effortless as comparing sports scores on different websites. The underlying data is the same; you just now have the power to decide how it is presented to you.</Text></div>
        <div className=''>
          <Text className='text-4xl'>111,597</Text>
          <Text className='text-sm'>Trusted users on Trackster</Text>
          <Text className='text-4xl'>1.2 million</Text>
          <Text className='text-sm'>Minutes Live</Text>
          <Text className='text-4xl'>1,915</Text>
          <Text className='text-sm'>Active Events</Text>
        </div>
      </div>
    </div>
  )
}

export default Home
