import axios from 'axios'
import React,{useState} from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SpeechRecognition , {useSpeechRecognition} from "react-speech-recognition"
import { RiRestartLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import useClipboard from "react-use-clipboard";
import { FaAngellist } from "react-icons/fa";
import { MdFiberManualRecord } from "react-icons/md";


const CreatePost = () => {
    const {transcript,browserSupportsSpeechRecognition,resetTranscript,listening} = useSpeechRecognition()
    const {author} = useContext(UserContext)
    const [isCopied, setCopied] = useClipboard("");
    const navigate = useNavigate()
    const [title,setTitle] = useState ("")
    const [summary,setSummary] = useState ("")
    const [file,setFile] = useState ("")
    const [content,setContent] = useState ("")
    const data = new FormData();
    data.set("title",title)
    data.set("summary",summary)
    data.set("file",file)
    data.set("content",content)
   data.set("author",author)
   
    const create =(e)=>{
        e.preventDefault();
       axios.post(`${process.env.REACT_APP_KEY}/create`,data).then((res)=>{
                    if(res.data === "ok"){

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "published successfully",
                            showConfirmButton: false,
                            timer: 1500
                          });
                        navigate("/")}
                        else{
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Something went wrong",
                                showConfirmButton: false,
                                timer: 8500
                              });
                        }
         })
      
       }
    
       if (!browserSupportsSpeechRecognition) {
         alert("not supported")
      }
       const start =()=>{
           SpeechRecognition.startListening({continuous:true})
       } 

       const stop =()=>{
        SpeechRecognition.stopListening()
    } 
    
  return (
    
    <div className='h-full bg-white dark:bg-black dark:bg-opacity-10 dark:text-zinc-200  w-full'>{ author ?
      <div>
        <form className='flex space-y-4 flex-col items-center' onSubmit={create} >
            <input 
            className='h-8 w-[98%] dark:placeholder:text-white dark:bg-black dark:border-zinc-300  sm:h-12 pl-2 outline-none placeholder:pl-2 mt-7 border border-black border-2 rounded-md'
            type="title"
            placeholder='Title' 
            required
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
             />
            <input 
            className='h-8 dark:placeholder:text-white dark:bg-black dark:border-zinc-300  w-[98%] sm:h-12 pl-2 outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md'
            type="summary"
            placeholder='Summary'
            required
            value={summary}
            onChange={e=>{setSummary(e.target.value)}}
             />
            <input
            id='img'
            className='h-8 w-[98%]  hidden pl-2 outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md'
             type="file"
            required
            onChange={e=>setFile(e.target.files[0])} />
            <label className='h-8 dark:bg-black dark:border-zinc-300 flex items-center justify-center sm:h-12 w-[98%] text-center pl-2 outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md' htmlFor='img'>Upload Image</label>

            <ReactQuill 
            className=' w-[98%] dark:text-white dark:bg-black dark:border-zinc-300  outline-none  mt-2 border border-black border-2 rounded-md'
              required
              value={content}
              onChange={e=>{setContent(e)}} />
            <button className='h-10 dark:bg-zinc-300 dark:text-black font-bold sm:h-12 w-[98%] mb-5 pl-2 bg-black text-white outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md'
            type='submit'>Publish</button>
        </form>
         <p className='pl-2 text-lg mb-2 flex hover:scale-110 justify-center font-bold'>Speech-to-Text converter</p>
          <div id="speak" className='w-[96%] mb-5 mx-auto   relative  '>
            <div className='flex items-center justify-center'>
          <p>Microphone:<span className='font-bold pl-1'>{listening ? "on" : 'off'}</span> </p>
          <p>{listening ?
          <p className='flex items-center pl-3'>listening:<p className='text-red-600 pt-1'><span class="animate-ping absolute h-4 w-4 rounded-full bg-red-600 opacity-75"></span><span><MdFiberManualRecord /></span></p></p> : ''}</p>
          </div>
           <p className='text-black p-2 mt-2 w-full border border-black dark:border-zinc-300 dark:text-white min-h-40 rounded-lg'>{transcript ? transcript : <p className='pt-1 pl-1 text-zinc-500'>your speech will be converted into text and displayed here</p>}</p>
           <div className='space-x-2 flex justify-center mt-3'>
            <button title="copy"  onClick={()=>setCopied(transcript)} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'>{isCopied ? <FaAngellist /> :<FaCopy />}</button>
            <button title="start listening" onClick={start} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'><VscDebugStart /></button>
            <button title="pause listening"
            onClick={stop} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10  rounded-full p-3'><CiPause1 /></button>
            <button title="reset" onClick={resetTranscript} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'><RiRestartLine /></button>
           </div>
          
          </div>
        </div>
         
         :
         <div className='h-screen dark:bg-black bg-zinc-200 w-full flex flex-col items-center justify-center '>
          <p className='text-lg  italic'>Sign in to create post</p>
          <Link to="/login"><button className='bg-black font-bold dark:bg-white dark:text-black text-white hover:scale-110 w-24 rounded-lg mt-2 h-9'>Sign in</button></Link>
          </div>
          }
         <span className='w-screen mb-14 font-semibold text-xs flex justify-center'>A BUILD BY AN</span>
    </div>
  )
}

export default CreatePost