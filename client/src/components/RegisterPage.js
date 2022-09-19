import React from "react"
import logo from "./../images/sparrowLogo.png"

export default function RegisterPage()
{
    function getParams()
    {
        return new URLSearchParams(window.location.search).get("message");
    }
    return(
        <div className="loginPage">
            <div className="leftSide">
                <h1>
                    Sparrow
                 </h1>
                 <div className="img-container">
                 
                 <div className="background">

                 </div>
                 <img src={logo}/>
                 </div>
                 
            </div>
            <div className="rightSide">
                <div className="rightSide-container">
                <h2> Register a new account </h2>
                <span className="errorMessage"> {getParams()} </span>
                <form action="/registeruser" method="post">
                    <input type="text" name="username" required placeholder="username"/>
                    <input type="password" name="password" required placeholder="password"/>
                    <button type="submit" value="Submit">register</button>
                </form>
                <a className="button" href=""> Forgot your password? </a>
                <a className="button" href="/"> Already have an account? </a>
                </div>
            </div>
        </div>
    )
}