import { GiFeather } from "react-icons/gi";
import { Text } from "@chakra-ui/react";
import { CiCalendar } from 'react-icons/ci'
import { RiCompassLine } from "react-icons/ri";
import { GoGear, GoPlus } from 'react-icons/go';
import { TiMessages } from "react-icons/ti";
import { PiLightningThin } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen border flex flex-col w-1/6 p-6 justify-between">
            <div>
                <NavLink to='/'><div className="flex items-center gap-3 my-3 mb-7">
                    <GiFeather color="darkorange" size="2em" /><Text className="text-2xl font-semibold">Trackster</Text>
                </div></NavLink>
                <div className="flex flex-col gap-7 text-lg">
                    <NavLink to='/explore'><div className="flex items-center gap-4"><RiCompassLine size="1.5em"/><Text>Explore</Text></div></NavLink>
                    <NavLink to="/events"><div className="flex items-center gap-4"><CiCalendar size="1.5em"/><Text>Events</Text></div></NavLink>
                    <NavLink to="/messages"><div className="flex items-center gap-4"><TiMessages size="1.5em"/><Text>Messages</Text></div></NavLink>
                    <div className="flex items-center gap-4"><PiLightningThin size="1.5em"/><Text>Zap</Text></div>
                    <button ><div className="flex items-center p-2 justify-center gap-2 bg-orange-600 rounded-xl text-white"><GoPlus size="1.8em"/><Text>Add Note</Text></div></button>
                </div>
            </div>
            <div className="flex items-center gap-2 text-xl"><GoGear size="1em" /><Text>Settings</Text></div>
        </div>
    )
}

export default Sidebar
