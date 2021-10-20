import {FaBeer,FaHandPeace} from "react-icons/fa"
import "./SideBar.css"

const SideBarIcon = ({icon})=>{
    return(
        <div className="sidebar-icon group">
            {icon}
            <div className="tool-tip group-hover:scale-100">
                tooltip!
            </div>
        </div>
    )
    
}

const SideBar = ()=>{
    return(
        <div className="fixed left-0 h-screen w-16 flex flex-col bg-blue-700 shadow-md">
            <SideBarIcon icon={<FaBeer />} />
            <SideBarIcon icon={<FaHandPeace />} />
            <SideBarIcon icon={<FaHandPeace />} />
            <SideBarIcon icon={<FaHandPeace />} />
            <SideBarIcon icon={<FaHandPeace />} />
        </div>
    )
}



export default SideBar;