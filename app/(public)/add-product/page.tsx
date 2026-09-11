import { createProduct } from '@/app/libs/action';
import Sidebar from '@/components/Sidebar';
import SubmitProduct from '@/components/Submit-Product';
import { Button } from '@/components/ui/button';
import { Input } from '@base-ui/react/input';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Product = async () => {
  const u = await auth()
  console.log(u.userId)
  if(!u.userId) redirect("/sign-in")
  return (
<>
  <div className="min-h-screen w-full flex">
    <div>
        <Sidebar />
    </div>
    <div className="m-4 w-130">
        <div className="text-3xl text-gray-700 font-bold font-serif space-y-2">Add Product</div>
          <form action={createProduct}>
          <div className="w-130 h-auto bg-white border rounded-lg p-4">
              <div className="space-y-2 m-2">
                <input type="hidden" name="clerkId" value={u.userId} />
                <label htmlFor="name" className="font-bold text-gray-700">Product Name <span className="text-red-400">*</span></label>
                <Input type="text" name="name" id="name" placeholder="Product Name" 
                className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" required />
              </div>

              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="space-y-2 m-2">
                  <label htmlFor="quantity" className="font-bold text-gray-700">Quantity <span className="text-red-400">*</span></label>
                  <Input type="number" min={1} max={50} name="quantity" id="quantity" placeholder="Quantity" 
                  className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" required />
                </div>

                <div className="space-y-2 m-2">
                  <label htmlFor="price" className="font-bold text-gray-700">Price <span className="text-red-400">*</span></label>
                  <Input type="number" min={10} max={9999999} name="price" id="price" placeholder="9000.00" 
                  className="p-2 w-full font-bold text-sm text-gray-900 font-serif border outline-none rounded" required />
                </div>
              </div>

              <div className="space-y-2 m-2">
                <label htmlFor="lowstock" className="font-bold text-gray-700">Low Stock <span className="">(Optional)</span></label>
                <input type="number" max={100} name="lowstock" id="lowstock" placeholder="Low Stock" 
                className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" />
              </div>

              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="space-y-2 m-2">
                  
                </div>

                <div className="space-y-2 m-2">
                  <SubmitProduct />
                </div>
              </div>
          </div>
          </form>
      </div>
    </div>
    </>
  )
}

export default Product