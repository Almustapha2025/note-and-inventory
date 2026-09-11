import { Input } from '@base-ui/react/input';
import React from 'react'

export default function Addform() {
  return (
    <div>
        
               
                <Input type="text" placeholder="Title" name="title" className="border outline-none text-sm font-serif text-gray-600 placeholder-gray-500 py-1 
                px-2 rounded-lg w-full my-3" required /><br/>

                <textarea placeholder="Content" name="content" className="border outline-none text-sm font-serif text-gray-600 placeholder-gray-500 py-1 
                px-2 rounded-lg w-full my-3" required /><br/>
    </div>
  )
}
