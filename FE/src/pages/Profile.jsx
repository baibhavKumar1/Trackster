import { Link } from 'react-router-dom'
import { GiFeather } from 'react-icons/gi'
import LoginMenu from '../components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { GetUser } from '../redux/AuthReducer/action'
import { UserEditor } from '../components/UserEditor'
const Profile = () => {
    const {token} = useSelector((store)=>store.AuthReducer)|| localStorage.getItem('trackster');
    const dispatch= useDispatch();
    useEffect(()=>{ 
        if(token){
             dispatch(GetUser(token))
        }
    },[token,dispatch])
    let { isAuth, name } = useSelector((store) => store.AuthReducer);
    const {profile} = useSelector((store)=> store.AuthReducer)
    (profile)
    
    const [SignOpen, setSignOpen] = useState(false);
  function SignClose() {
    setSignOpen(!SignOpen);
  }
    return (
        <div className=''>
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
                <LoginMenu />
            </div>
            <div className=' h-[80vh] w-full flex justify-center items-center'>
                {isAuth?<div className='border flex gap-4'>
                <img className='w-44 aspect-1' src= { `http://localhost:3000/${profile?.b?.avatar}` } alt='img'/>
                <div className='w-48 flex flex-col text-center justify-between'>
                <div>
                    <p>Name: {name}</p>
                    <p>City: {profile?.a?.city}</p>
                    <p>Age: {profile?.a?.age}</p>
                    </div>
                    <button className='bg-orange-500 p-2 rounded-lg text-white self-place-end' onClick={() => { setSignOpen(!SignOpen) }}>Edit User</button>
                      {SignOpen && <UserEditor onOpens={SignOpen} LetClose={SignClose} item={profile} />}
                </div>
                <div className='w-48'>
                    <p>No. of Events Attended : {profile?.b?.event.length}</p>
                    <p>No. of Events Hosted : {profile?.b?.hostingEvent.length}</p>
                </div>     
                               
                </div>:<p>Login required</p> }
            </div>
        </div>
    )
}

export default Profile
