import { formatISO9075 } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'

const Posts = ({title,createdAt,summary,author,cover,_id}) => {
  return (
    <div className=' md:w-screen flex md:flex-row flex-col   mt-5'>
          <div className=' md:w-2/4  '>
            <Link to={`/post/${_id}`}>
            <img  src={`${process.env.REACT_APP_KEY}/`+cover}  className='h-auto lg:h-auto md:mt-6 md:h-96 w-[95%]   mx-auto '/>
            </Link>
            </div>
              
        <div className='flex flex-col md:w-2/4 lg:w-3/4 mr-2 items-center'>
            <h2 className='text-xl font-bold text-justify p-3'>{title}</h2>
            <p className='text-xs font-semibold  my-2'><span className='mr-2'>@{author}</span><time>{ formatISO9075(new Date(createdAt))}</time></p>
            <p className='p-3 text-justify '>{summary}</p>
            <Link to={`/post/${_id}`}><span className='font-bold text-lg'>Read more</span></Link>
        </div>
        

    </div>
  )
}

export default Posts