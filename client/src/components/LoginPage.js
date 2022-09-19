import React from "react"
import logo from "./../images/sparrowLogo.png"


//console.log(error);
export default  function LoginPage()
{
    
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
                <h2> Login to your account </h2>
             
                <form action="/loginuser" method="post">
                    <input type="text" name="username" required placeholder="username"/>
                    <input type="password" name="password" required placeholder="password"/>
                    <button type="submit" value="Submit">login</button>
                </form>
                <a className="button" href=""> Forgot your password? </a>
                <a className="button" href="/register"> Create new account </a>
                </div>
            </div>
        </div>
    )
}