import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Posts from './Posts'
import Swal from 'sweetalert2'

const IndexPage = () => {

  const [posts,setPosts] = useState("")
  const [query,setQuery] = useState("")
 

  try{
  useEffect(()=>{
   axios.get(`${process.env.REACT_APP_KEY}/posts`).then((res)=>{
      
      setPosts(res.data)
      console.log(posts)
    })
  },[])
}catch(err){
  Swal.fire({
    position: "center",
    icon: "error",
    title: "server busy",
    showConfirmButton: false,
    timer: 1500
  });
}
  return (
    <div className='h-screen' >
    <div className='w-full flex bg-transparent  justify-center mt-3'>
       <input
        className='w-[90%] dark:bg-white dark:bg-opacity-10 dark:placeholder:text-zinc-400 sticky placeholder:text-zinc-700 bg-stone-100 h-8 outline-none border border-black text-center rounded-xl'
        type="text"
       placeholder="Search here..."
       onChange={(e)=>setQuery(e.target.value)} />
    </div>
    <div className='h-full w-full mb-1  mt-2 overflow-y-scroll'>

      {posts.length >0 && 
         posts.filter((post)=>
                               post.author.toLowerCase().includes(query.toLowerCase()) ||
                               post.title.toLowerCase().includes(query.toLowerCase())).map((post)=>(
        <Posts key={post._id}{...post} />
      )) }
    </div>
    
    <p className='w-full text-center  pt-2  bg-black text-white'>a blog website built by AN</p>
    
    </div>
  )
}

export default IndexPage