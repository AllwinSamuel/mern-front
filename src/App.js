import './App.css';
import { CgLogOut } from "react-icons/cg";
import { IoMdCreate } from "react-icons/io";
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import IndexPage from './pages/IndexPage';
import { MdLightMode } from "react-icons/md";
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"
import CreatePost from "./pages/CreatePost";
import {  UserContextProvider } from './context/UserContext';
import SinglePost from './pages/SinglePost';
import Edit from './pages/Edit';


function App() {
  
  const cookies = new Cookies()
  const [theme , setTheme] = useState("light")

  useEffect(()=>{
    if(theme === "dark"){
      document.documentElement.classList.add("dark")
    }
    else{
      document.documentElement.classList.remove("dark")
    }
  },[theme])
 
  
  const [auth,setAuth] = useState(cookies.get("userauth"))

  const logout =()=>{
     cookies.set("userauth","")
     setAuth(false)
     window.location.reload()
     }

     const handleThemes =()=>{
      setTheme(theme === "dark" ? "light" : "dark")
     }
 
  return (
    <div className=' w-screen dark:text-white dark:bg-black dark:bg-opacity-95 overflow-y-scroll h-auto'>
    <UserContextProvider>
    <BrowserRouter>
    <div className="flex dark:border-b shadow-xl  h-12 md:h-16 bg-white dark:bg-black  justify-between">
         <p className='text-xl font-bold italic md:pl-8 md:pt-3 pl-5 md:text-3xl p-2'><Link to="/">AN's BLOG</Link></p>

         <div className='flex space-x-6'>
                <div>
                      {auth ?
                      
                      <div className='flex items-center'> 
                      <button className='pr-1.5 md:text-2xl md:pr-3' onClick={handleThemes}><MdLightMode /></button>
                      <Link to="/createpost">
                        <div className='flex  items-center p-4 md:text-xl hover:scale-110  font-bold pr-1 text-sm'>
                          <span><IoMdCreate /></span>
                          <span>Create</span>
                     
                         </div>
                      </Link>
                        <button className="h-10 ml-4 md:text-3xl md:mr-5 mt-1 w-8 hover:scale-110 text-xl" onClick={logout}><CgLogOut /></button>
                        </div>
                        
                        
                      
                        :
                
              <div className='flex mt-4 items-center'>
                 <button className='pr-1.5 md:pr-5 md:text-2xl' onClick={handleThemes}><MdLightMode /></button>
                    <Link to="/createpost">
                    <div className='flex items-center md:text-xl md md:mr-4 hover:scale-110  font-bold pr-1 text-sm'>
                          <span><IoMdCreate /></span>
                          <span>Create</span>
                     
                      </div>
                      </Link>

                      <div>
                          <Link to="/login"><span className='font-bold hover:scale-110 md:text-xl md:mr-3 text-sm p-2 pr-3'>Login</span></Link >
                      </div>
              </div>}
              </div>

         </div>
    </div>

    <Routes>
       <Route path="/login" element={<Login setAuth={setAuth}  />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/createpost" element={<CreatePost />}/>
       <Route path="/" element={<IndexPage />}/>
       <Route path="/post/:id" element={<SinglePost />}/>
       <Route path="/editpost/:id" element={<Edit />}/>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
    </div>
  );
}

export default App;
