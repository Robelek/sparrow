import React from "react"
import logo from "./../images/sparrowLogo.png"
import Sidebar from "./Sidebar.js"
import MainContent from "./MainContent.js"
import RightSide from "./Rightside"
export default function Dashboard(props)
{
    return(
       <div className="Dashboard">
            <Sidebar user={props.user}/>
            <MainContent/>
            <RightSide/>
       </div>
    )
}