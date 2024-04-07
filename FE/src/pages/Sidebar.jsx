import { GiFeather } from "react-icons/gi";
import { Text } from "@chakra-ui/react";
import { CiCalendar } from 'react-icons/ci'
import { RiCompassLine } from "react-icons/ri";
import { GoGear } from 'react-icons/go';
import { TiMessages } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Eventcreator } from "../components/Eventcreator";

const Sidebar = () => {
    const [SignOpen, setSignOpen] = useState(false);
    function SignClose() {
        setSignOpen(!SignOpen);
    }
    return (
        <div className="h-screen border-r flex flex-col w-[20%] p-6 justify-between sm:hidden xs:hidden">
            <div>
                <NavLink to='/'><div className="flex items-center gap-3 my-3 mb-7">
                    <GiFeather color="darkorange" size="2em" /><Text className="text-3xl font-semibold">Trackster</Text>
                </div></NavLink>
                <div className="flex flex-col gap-7 text-lg">
                    <NavLink to='/explore'><div className="flex items-center gap-4"><RiCompassLine size="1.5em" /><Text>Explore</Text></div></NavLink>
                    <NavLink to="/events"><div className="flex items-center gap-4"><CiCalendar size="1.5em" /><Text>Attending Events</Text></div></NavLink>
                    <NavLink to="/admin"><div className="flex items-center gap-4"><TiMessages size="1.5em" /><Text>Your Events</Text></div></NavLink>
                    <button className='bg-orange-500 p-2 rounded-lg text-white' onClick={() => { setSignOpen(!SignOpen) }}>
                        Create an Event
                    </button>
                    {SignOpen && <Eventcreator
                        onOpens={SignOpen}
                        LetClose={SignClose} />}
                </div>
            </div>
            <div className="flex items-center gap-2 text-xl"><GoGear size="1em"/><Text>Settings</Text></div>
        </div>
    )
}

export default Sidebar
