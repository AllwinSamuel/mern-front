import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import axios from 'axios'
import ReactQuill from 'react-quill'
import SpeechRecognition , {useSpeechRecognition} from "react-speech-recognition"
import { RiRestartLine } from "react-icons/ri";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { FaCopy } from "react-icons/fa";
import useClipboard from "react-use-clipboard";
import { FaAngellist } from "react-icons/fa";
import { MdFiberManualRecord } from 'react-icons/md'

const Edit = () => {

    const {id} = useParams()

    const {author} = useContext(UserContext)
    const[err,setErr] = useState(false)
    const navigate = useNavigate()
    const [title,setTitle] = useState ("")
    const [summary,setSummary] = useState ("")
    const [file,setFile] = useState ("")
    const [content,setContent] = useState ("")
    const [isCopied, setCopied] = useClipboard("");
    const {transcript,browserSupportsSpeechRecognition,resetTranscript,listening} = useSpeechRecognition()
    

    try{
        useEffect(()=>{
         axios.get(`${process.env.REACT_APP_KEY}/post/${id}`).then((res)=>{
            console.log(res.data.title)
            setTitle(res?.data.title)
         setContent(res?.data.content)
         setSummary(res?.data.summary)
        
        })
         
        },[])}
        catch(e){
            console.log(e.message)
        }

   

    const data = new FormData();
    data.set("title",title)
    data.set("summary",summary)
    if(file){
    data.set("file",file)}
    data.set("content",content)
   data.set("author",author)

   const update =(e)=>{
    e.preventDefault();
   axios.put(`${process.env.REACT_APP_KEY}/editpost/${id}`,data).then((res)=>{
                if(res === "failed"){
                    
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Something went wrong",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                
                else{
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });

                      navigate(`/post/${id}`)
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
        <form className='flex space-y-4 flex-col items-center' onSubmit={update} >
            <input 
            className='h-8 sm:h-14 dark:placeholder:text-white dark:bg-black dark:border-zinc-300 w-[98%] pl-2 outline-none placeholder:pl-2 mt-7 border border-black border-2 rounded-md'
            type="title"
            placeholder='Title' 
            value={title}
            onChange={e=>{setTitle(e.target.value)}}
             />
            <input 
             className='h-8 sm:h-14 dark:placeholder:text-white dark:bg-black dark:border-zinc-300 w-[98%] pl-2 outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md'
            type="summary"
            placeholder='Summary'
            value={summary}
            onChange={e=>{setSummary(e.target.value)}}
             />
            <input className='hidden' 
            id="img"
            type="file"
            
            onChange={e=>setFile(e.target.files[0])} />
            <label className='h-8 sm:h-14 dark:bg-black dark:border-zinc-300  w-[98%] text-center pl-2 flex justify-center items-center outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md' htmlFor='img'>Upload Image</label>


            <ReactQuill 
            className=' w-[98%] dark:text-white dark:bg-black dark:border-zinc-300   outline-none  mt-2 border border-black border-2 rounded-md'

            value={content}
            onChange={e=>{setContent(e)}} />
            <button className='h-10 font-bold dark:bg-zinc-100 dark:text-black sm:h-14 w-[98%] mb-5 pl-2 bg-black text-white outline-none placeholder:pl-2 mt-2 border border-black border-2 rounded-md' type='submit'>Update Post</button>
        </form>
         <p className='pl-2 text-lg hover:scale-110 mb-2 flex justify-center font-bold'>Speech-to-Text converter</p>
         <div id="speak" className='w-[96%] mb-5 mx-auto   relative  '>
           <div className='flex items-center justify-center'>
         <p >Microphone:<span className='font-bold pl-1'>{listening ? 'on' : 'off'}</span> </p>
         <p >{listening ? 
         <p className='flex items-center pl-3'>listening:<p className='text-red-600 pt-1'><span class="animate-ping absolute h-4 w-4 rounded-full bg-red-600 opacity-75"></span><span><MdFiberManualRecord /></span></p></p> 
          : ''}</p>
         </div>
          <p className='text-black p-2 mt-2 w-full border border-black min-h-40 dark:border-zinc-300 dark:text-white rounded-lg'>{transcript ? transcript : <p className='pt-1 pl-1 text-zinc-500'>your speech will be converted into text and displayed here</p>}</p>
          <div className='space-x-2 flex justify-center mt-3'>
           <button title="copy" onClick={()=>setCopied(transcript)} className=' dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'>{isCopied ? <FaAngellist /> :<FaCopy />}</button>
           <button title="start listening" onClick={start} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'><VscDebugStart /></button>
           <button title="pause listening" onClick={stop} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'><CiPause1 /></button>
           <button title="reset" onClick={resetTranscript} className='dark:hover:bg-zinc-200 dark:hover:text-black dark:border-zinc-300 hover:bg-black hover:text-white hover:scale-110 border border-black h-10 w-10 rounded-full p-3'><RiRestartLine /></button>
          </div>
          </div>
</div>
        : <p>Login to edit post</p>}

<span className='w-screen mb-7 font-semibold text-xs flex justify-center'>A BUILD BY AN</span>
        
    </div>
  )
}

export default Edit