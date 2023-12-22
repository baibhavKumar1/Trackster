/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
const ExploreCard = ({item}) => {
    const {_id,image,name,date,time,attendees,venue} = item;
    return (
        <div key={_id} className='border border-rose-300 relative rounded-lg w-80 h-96 m-3'>
            <div className='w-64'>
                <img className='rounded-lg h-96 w-64' src={image} alt='img'/>
                <div className='bg-white/50 text-center absolute bottom-0 left-0 right-0 rounded-xl m-3'>
                    <Text>{name}</Text>
                    <Text>Date: {date}</Text>
                    <Text>Time: {time}</Text>
                    <Text>Attendee: {attendees.length}</Text>
                    <Text>Venue: {venue}</Text>
                    <NavLink to={`/event/${_id}`}>View details</NavLink>
                </div>
            </div>
        </div>
    )
}

export default ExploreCard
