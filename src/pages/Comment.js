import React from 'react'
import {formatISO9075} from "date-fns"

const Comment = ({author,createdAt,comment}) => {
  return (
    <div className='dark:border-white dark:bg-white dark:bg-opacity-10 border border-zinc-500 m-1 rounded-bl-3xl rounded-tr-3xl mb-3 rounded-br-xl bg-black bg-opacity-10'>
        <p className='pl-2 p-1 '><span className='font-bold text-sm'>@{author}</span><span className='pl-4 text-xs'>{formatISO9075(new Date(createdAt))}</span></p>
        <p className='pl-5 leading-5 pb-2  p-1'>{comment}</p>
    </div>
  )
}

export default Comment