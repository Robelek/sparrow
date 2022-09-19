import React from "react"
import logo from "./../images/sparrowLogo.png"

export default function Sidebar(props)
{
    
   //console.log(props);

    return(
       <div className="Sidebar">
            <div className="Arrow-container" onClick={(e) => {
                 let el = e.target.parentElement;
                 el.classList.toggle("hidden");
                 let children = e.target.children;
                 for(let i=0;i<children.length;i++)
                 {
                    children[i].classList.toggle("clicked");
                 }
                 
            }}>
               <div className="Arrow top"></div>
               <div className="Arrow middle"></div>
               <div className="Arrow bottom"></div>
            </div>
            <div className="userHolder">
               <p> user here </p>
               <p> {props.user.username} </p>
               <a className="button" href="/logout"> LOG OUT </a>
            </div>
       </div>
    )
    }


