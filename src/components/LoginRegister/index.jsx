import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

function LoginRegister({onLogin}){
    const navigate=useNavigate();
    const [form,setForm]=useState({
        login_name:"",
        password:"",
    });
    const [reg,setReg]=useState({
        login_name:"",
        password:"",
        password2:"",
        first_name:"",
        last_name:"",
        location:"",
        occupation:"",
        description:"",
    })
    const handleLogin=async()=>{
        const res=await fetch(`https://n2rh2r-8081.csb.app/api/admin/login`,{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(form),
        })
        if(!res.ok) return;
        const user=await res.json();
        onLogin(user)
        navigate(`/users/${user._id}`);
    }
    const handleRegister=async()=>{
        const res=await fetch(`https://n2rh2r-8081.csb.app/api/user`,{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(reg),
        })
        if(!res.ok) return;
        else alert("Đăng kí thành công");
        setReg({
            login_name:"",
        password:"",
        password2:"",
        first_name:"",
        last_name:"",
        location:"",
        occupation:"",
        description:"",
        })
    }
    return(
        <>
        <h3>Login</h3>
        <div>
            <input placeholder="Login_name" 
            onChange={(e)=>setForm({...form,login_name:e.target.value})}
            />
            <br/>
            <input placeholder="Password" type="password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </div>
        <h3>Register</h3>
        <div>
            <input placeholder="Login_name" value={reg.login_name}
            onChange={(e)=>setReg({...reg,login_name:e.target.value})}
            />
            <br/>
            <input placeholder="Password" value={reg.password} type="password"
            onChange={(e)=>setReg({...reg,password:e.target.value})}
            />
            <br/>
            <input placeholder="Password2" value={reg.password2} type="password2"
            onChange={(e)=>setReg({...reg,password2:e.target.value})}
            />
            <br/>
            <input placeholder="First_name" value={reg.first_name}
            onChange={(e)=>setReg({...reg,first_name:e.target.value})}
            />
            <br/>
            <input placeholder="Last_name" value={reg.last_name}
            onChange={(e)=>setReg({...reg,last_name:e.target.value})}
            />
            <br/>
            <input placeholder="Location" value={reg.location}
            onChange={(e)=>setReg({...reg,location:e.target.value})}
            />
            <br/>
            <input placeholder="Occupation" value={reg.occupation}
            onChange={(e)=>setReg({...reg,occupation:e.target.value})}
            />
            <br/>
            <input placeholder="Description" value={reg.description}
            onChange={(e)=>setReg({...reg,description:e.target.value})}
            />
            <br/>
            <Button variant="contained" onClick={handleRegister}>Send</Button>
        </div>

        </>
    )
}

export default LoginRegister;