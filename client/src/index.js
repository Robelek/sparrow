import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import { Route, Routes, Navigate} from "react-router";
import './index.css';
import LoginPage from "./components/LoginPage.js";
import reportWebVitals from './reportWebVitals';
import Dashboard from './components/Dashboard';
import RegisterPage from './components/RegisterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
async function getData()
{
  let result = await fetch("/getuser");
  
  let resultText = await result.text();
  console.log(`Result: ${await result}`);
  console.log(`ResultText: ${await resultText}`);
  if(resultText=="")
  {
    return null;
  }
  else
  {
    return await JSON.parse(resultText);
  }
  
}
async function checker()
{
 return await getData();
}

async function reRender()
{
  let user = await checker();
  console.log(`User is: ${user}, type ${typeof user}`);
  root.render(
    <React.StrictMode>
      <Router>
      <Routes>
        
        <Route  path='/dashboard' element={<Dashboard user={user}/>}/>
        <Route  path='/login' element={<LoginPage/>}/>
        <Route  path='/register' element={<RegisterPage/>}/>
        
        {
          user===null ? <Route path="*" element={<Navigate to="/login" replace/>}/> : <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
        }
      </Routes>
      </Router>
     
      
   
    </React.StrictMode>
  );
}
reRender();

