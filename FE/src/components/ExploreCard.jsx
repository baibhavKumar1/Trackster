/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const ExploreCard = ({ item }) => {

    const { _id, image, name, date, attendees, venue } = item;
    return (
        
            <div key={_id} className='shadow-sm bg-white/50 relative rounded-lg w-96 m-3'>
                <div className='w-96 '>
                    <img className='rounded-lg ' src={image ? image : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"} alt='img' />
                    <div className='bg-white/50 text-center absolute bottom-0 left-0 right-0 rounded-xl m-3'>
                        <Text>{name}</Text>
                        <Text>Date: {date}</Text>
                        <Text>Attendee: {attendees.length}</Text>
                        <Text>Venue: {venue}</Text>
                        <NavLink to={`/event/${_id}`}>View details</NavLink>
                    </div>
                </div>

            </div>
        
    )
}

export default ExploreCard
