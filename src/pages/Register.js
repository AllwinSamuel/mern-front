import React, { useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {


  const navigate = useNavigate()
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");

    const handleSubmit =(e)=>{
     
    e.preventDefault();
    
    axios.post(`${process.env.REACT_APP_KEY}/user` , {username,password})
    .then((res)=>{
      console.log(res)
      if(res.data !== "failed"){
        
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered successfully",
          showConfirmButton: false,
          timer: 1500
        });

        navigate("/login")

       }else{
        
        Swal.fire({
          position: "center",
          icon: "error",
          title: "User already  exit",
          showConfirmButton: false,
          timer: 1500
        });
       }
    })
 
 
 
    }
  return (
    <div className='h-screen dark:bg-black w-full flex '>
        <form className="flex flex-col  items-center relative top-[30%] h-full w-full" onSubmit={handleSubmit}>
        <p className='text-black dark:text-white  text-xl font-bold mb-2'>REGISTER</p>
            <input className='h-10 dark:bg-black dark:placeholder:text-white dark:border-white  w-[80%] pl-2 outline-none placeholder:pl-2 placeholder:text-black mb-2 border border-black border-2 rounded-md'
            type="required"
            placeholder='username'
            onChange={(e)=>{setUsername(e.target.value)}} 
            />

           <input  className='h-10 dark:bg-black dark:placeholder:text-white dark:border-white  w-[80%] pl-2 placeholder:pl-2 outline-none placeholder:text-black mb-2 border border-black border-2 rounded-md'
            type="required"
            placeholder='password'
            title="minimum 6 characters"
            pattern=".{6,}"
            onChange={(e)=>{setPassword(e.target.value)}} 
            />
                
            <button  className='h-10 dark:border w-[80%] dark:bg-white dark:text-black font-bold outline-none bg-black text-white mb-2 border border-black border-2 rounded-md' type="submit">register</button>
            <p>already have an account?<Link to="/login"><span className='font-bold text-sm p-2 pr-3'>Login</span></Link ></p>    
        </form>
    </div>
  )
}

export default Register