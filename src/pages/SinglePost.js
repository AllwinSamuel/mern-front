import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Swal from "sweetalert2"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {formatISO9075} from "date-fns"
import { useNavigate } from 'react-router-dom'
import {useSpeechSynthesis} from "react-speech-kit"
import { RiSpeakFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import Comment from './Comment';


const SinglePost = () => {
    
    const {speak,voices,cancel} = useSpeechSynthesis();
    const {author} = useContext(UserContext)
    const {id} = useParams()
    const navigate = useNavigate()

    const [post,setPost] = useState();
    const [comment,setComment] = useState("");
    const [fetchedcomment,setFetchedcomment] = useState([]);
    const [speed,setSpeed] = useState(1);
    const [selectedVoice , setSelectedVoice ] = useState(0)
    try{
    useEffect(()=>{
     axios.get(`${process.env.REACT_APP_KEY}/post/${id}`).then((res)=>{
     setPost(res.data)})

     axios.get(`${process.env.REACT_APP_KEY}/getcomments`).then((res)=>{
         setFetchedcomment(res.data)
     })
    },[])

    }
    catch(e){
        console.log(e.message)
    }

    

    const handleDelete=()=>{

      Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                                  if (result.isConfirmed) {

                                    axios.delete(`${process.env.REACT_APP_KEY}/delete/${post._id}`).then((res)=>{
                                
                                                    if(res.data === "deleted"){
                                                        
                                                      Swal.fire({
                                                        position: "center",
                                                        icon: "success",
                                                        title: "Deleted successfully",
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                      });
                                                        navigate("/")
                                                  }
                                                  else{
                                                    Swal.fire({
                                                      position: "center",
                                                      icon: "error",
                                                      title: "Something went wrong",
                                                      showConfirmButton: false,
                                                      timer: 1500
                                                    });
                                                  }
                            })
              
                }});
      }

   const handleSpeak =()=>{
    speak({text:post.summary , rate: speed, voice:voices[selectedVoice]} )
   }

   const stop =()=>{
     cancel()
   }

   const addcomment =(e)=>{
    e.preventDefault()
    const postId = post._id
    axios.post(`${process.env.REACT_APP_KEY}/comment`,{postId,author,comment}).then((res)=>
    window.location.reload())
   }

  return (
    <div className='tracking-tight  text-justify sm:p-5 p-3'>
                {post && (<div>
                  <h1 className='text-xl leading-tight font-bold'>{post?.title}</h1>
                  <p className='mt-3 flex font-semibold justify-center'>
                    @{post.author}</p>
                  <time className='flex justify-center text-xs'>published at { formatISO9075(new Date(post.createdAt))}</time>
                  {author === post?.author && 
                  <div className='justify-center mt-2 space-x-3 flex '>
                    <Link to={`/editpost/${post._id}`}>
                        <button className='dark:hover:bg-white dark:hover:text-black dark:border-zinc-200 hover:bg-black w-20 hover:text-white  hover:scale-110 border border-zinc-500 h-8 rounded-md'>Edit</button></Link>
                        <button className='dark:hover:bg-red-600  dark:border-zinc-300 hover:bg-red-600 hover:text-white hover:scale-110 border border-zinc-500 w-20 h-8 rounded-md' onClick={handleDelete}>Delete</button> 
                  </div>}
                  <p className='mt-7'>{post.summary}</p>

                  <div className='flex flex-col sm:flex-row mt-3 items-center justify-center'>
                  <p className='pr-2 pt-2'>Change voice: </p>
                <select className='dark:bg-stone-900 dark:border-white dark:text-white bg-stone-200 mt-4 border outline-none border-black rounded-md p-1 px-3' value={selectedVoice} onChange={(e)=>setSelectedVoice(e.target.value)}>
                  <option value="">Default</option>
                  {voices.map((voice,index)=>(
                    <option value={index}>{voice.name}</option>
                  )
                    
                  )}
                </select>
                </div>
                <div className='flex mt-3 justify-center mt-1 items-center'>
                    <input className='appearance-none outline-none  mr-3 border border-zinc-500 h-2 w-24 bg-zinc-200 rounded-full  '
                        type="range" 
                        min="0.1"
                        max="5" 
                        step="0.01"
                        value={speed}
                        onChange={(e)=>setSpeed(e.target.value)} />
                        <p className='text-sm'>Current speech rate: <span className='font-bold text-lg'>{speed}</span></p>
                    </div>

                    <div className='flex mt-3 mb-4  justify-center'>
                    <button onClick={handleSpeak} className=' dark:hover:bg-white dark:hover:text-black dark:border-zinc-200 hover:bg-black mr-3 flex items-center justify-center border border-zinc-600 font-semibold hover:scale-110 hover:text-white rounded-lg h-10 w-36'><span className='pr-1'><RiSpeakFill /></span>Speak</button>
                    <button className='dark:hover:bg-red-600  dark:border-zinc-300 hover:bg-red-600 flex items-center justify-center border border-zinc-600 font-semibold hover:scale-110 hover:text-white rounded-lg h-10 w-36' onClick={stop}><span className='pr-1'><MdCancel /></span>Cancel</button>
                    </div>
                  
                  <img  className='h-auto my-6 w-[100%] ' src={'http://localhost:5000/'+post.cover} />


                  <div className='flex  mt-3 items-center justify-center'>
                    <p className='pr-2 pt-2'>Change voice: </p>
                      <select className='dark:bg-stone-900 dark:border-white dark:text-white bg-stone-100 w-40 sm:w-auto mt-4 border outline-none border-black rounded-md p-1 px-3' value={selectedVoice} onChange={(e)=>setSelectedVoice(e.target.value)}>
                        <option value="">Default</option>
                        {voices.map((voice,index)=>(
                          <option value={index}>{voice.name}</option>
                        )
                          
                        )}
                      </select>
                </div>
                <div className='flex mt-3 justify-center mt-1 items-center'>
                    <input className='appearance-none outline-none  mr-3 border border-zinc-500 h-2 w-24 md:w-40 bg-zinc-200 rounded-full  '
                        type="range" 
                        min="0.1"
                        max="5" 
                        step="0.01"
                        value={speed}
                        onChange={(e)=>setSpeed(e.target.value)} />
                        <p className='text-sm'>Current speech rate: <span className='font-bold text-lg'>{speed}</span></p>
                    </div>

                    <div className='flex mt-3 mb-4  justify-center'>
                    <button onClick={handleSpeak} className='dark:hover:bg-white dark:hover:text-black dark:border-zinc-200 hover:bg-black mr-3 flex items-center justify-center border border-zinc-600 font-semibold hover:scale-110 hover:text-white rounded-lg h-10 w-36'><span className='pr-1'><RiSpeakFill /></span>Speak</button>
                    <button className='dark:hover:bg-red-600  dark:border-zinc-300 hover:bg-red-600 flex items-center justify-center border border-zinc-600 font-semibold hover:scale-110 hover:text-white rounded-lg h-10 w-36' onClick={stop}><span className='pr-1'><MdCancel /></span>Cancel</button>
                    </div>
            
                <div className='' dangerouslySetInnerHTML={{__html:post.content}} />
                </div>)}

              <div className='w-full md:w-3/5  p-1 h-96 overflow-y-scroll mt-5 '>
                  <p className='font-bold text-2xl sm:text-3xl pl-1 p-1 border-b border-black'>Comments</p>
                  {author ?
                            <form className='w-full mt-1 flex items-center justify-center' onSubmit={addcomment} >
                                  <input
                                  className='w-3/4 md:w-4/5 dark:placeholder:text-black dark:bg-zinc-200 outline-none border border-black rounded-lg pl-2 h-10'
                                  type="text"
                                  placeholder="Enter your comment" 
                                  value={comment}
                                  onChange={(e)=>setComment(e.target.value)}
                                  />
                                  <button className='h-10 md:w-1/6 dark:hover:bg-white dark:hover:text-black dark:border-zinc-200 w-1/4 m-1 hover:bg-black border border-zinc-600 hover:text-white font-bold rounded-lg' type="submit">Add</button>
                                  
                            </form> 
                  :
                  <p className='text-lg text-center p-1'>Login to post a comment</p>
                  }
                            <div>
                              
                              {
                                fetchedcomment?.filter((comment)=>
                                                      comment?.postId === post?._id).map((comment)=>{
                                                        return(
                                                            <Comment {...comment} />
                                                        )
                                                      })
                              }
                          </div>
              </div>
    </div>
  )
}

export default SinglePost