import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Swal from "sweetalert2"

const Login = ({setAuth,}) => {
  
    const cookies = new Cookies();
    const {setAuthor} = useContext(UserContext)
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");

    const navigate = useNavigate();
   
    const handleSubmit =async(e)=>{
      e.preventDefault();
      try{
            await axios.post(`${process.env.REACT_APP_KEY}/userlogin`, {username,password})
            .then((res)=>{
                console.log(res)

                if(res.data !== "failed"){
                          if(res.data !== "notok"){
                                  if(res.data.data === "ok"){
                                    
                                        cookies.set("userauth",username)
                                          setAuthor(res.data.user)
                                          setAuth(true)
                                            navigate("/")
                                        }
                                  else{
                                    Swal.fire({
                                      position: "center",
                                      icon: "error",
                                      title: "No user found",
                                      showConfirmButton: false,
                                      timer: 1500
                                    });
                                  }
                          }
                          else{
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "Wrong credentials",
                              showConfirmButton: false,
                              timer: 1500
                            });
                              }
                    }
                else{
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong try later",
                    showConfirmButton: false,
                    timer: 8500
                  });  
                }
      })}
      catch(err){
        console.log(err.message)
      }
   }

  return (
    <div className='h-screen dark:bg-black w-full flex '>
        <form className="flex flex-col items-center relative top-[30%] h-full w-full" onSubmit={handleSubmit}>
          <p className='text-black dark:text-white text-xl font-bold mb-2'>LOGIN</p>
            <input  className='h-10 placeholder:text-black sm:h-10 dark:bg-black dark:placeholder:text-white dark:border-white  w-[80%] pl-2 placeholder:pl-2 outline-none mb-2 border border-black border-2 rounded-md'
            type="required"
            placeholder='username'
            onChange={(e)=>{setUsername(e.target.value)}} 
            />

           <input  className='h-10 placeholder:text-black sm:h-10 dark:bg-black dark:placeholder:text-white dark:border-white w-[80%] pl-2 placeholder:pl-2 outline-none mb-2 border border-black border-2 rounded-md'
            type="required"
            placeholder='password'
            title="minimum 6 characters"
            pattern=".{6,}"
            onChange={(e)=>{setPassword(e.target.value)}} 
            />
                
            <button  className='h-10 dark:border w-[80%] dark:bg-white dark:text-black font-bold bg-black text-white outline-none mb-2 border border-black border-2 rounded-md' type="submit">login</button>
            <p>Don't have an account?<Link to="/register"><span className='font-bold hover:scale-115 text-sm p-2 pr-3'>Register</span></Link ></p>     
        </form>
    </div>
  )
}

export default Login