import { deleteProduct, updateProduct, viewProduct } from '@/app/libs/action';
import prisma from '@/app/libs/prisma';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import Updateform from '@/components/Update-form';
import UpdateProduct from '@/components/Update-Product';
import { Input } from '@base-ui/react/input';
import { auth } from '@clerk/nextjs/server';
import { LucideTrash2, PenTool, PenToolIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const inventoryId = async ({params}: {params: Promise<{id : string}>}) => {
  const u = await auth()
  if(!u.userId) redirect("/sign-in")

  const {id: paramId} = await params
  const id = await Number(paramId)

  const p = await prisma.product.findUnique({
    where:{
        id: id
    }
  })

  const productQuantity = p?.quantity != null ? Number(p.quantity) : 0
  const productPrice = p?.price != null ? Number(p.price).toString() : ""
  const productLowStock = p?.lowstock != null ? p.lowstock.toString() : ""

  return (
    <>
        <div className="min-h-screen w-full flex">
            <div>
                <Sidebar />
            </div>
            <div className="m-4 p-2 w-130">
        <div className="flex justify-between items-center">
            <div className="text-2xl text-gray-700 font-bold font-serif py-2 space-y-2">Edit {p?.name}</div>
           <div>
             <form action={async (formData: FormData) => {
                          "use server"
                          await deleteProduct(formData)
                        }}>
                          <Input type="hidden" name="id" value={id} required />
                          <button type="submit">
                            <LucideTrash2 className="w-7 h-7 font-bold text-red-400" />
                          </button>
                        </form>
           </div>
        </div>
        
          
          <div className="w-130  bg-white border rounded-lg p-4">
            <form action={updateProduct}>
              <div className="space-y-2 m-2">
                {/* <input type="hidden" name="clerkId" value={u.userId} /> */}
                <input type="hidden" name="id" value={p?.id} />
                <label htmlFor="name" className="font-bold text-gray-700">Product Name <span className="text-red-400">*</span></label>
                <Input type="text" defaultValue={p?.name} name="name" id="name" placeholder="Product Name" 
                className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" required />
              </div>

              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
                <div className="space-y-2 m-2">
                  <label htmlFor="quantity" className="font-bold text-gray-700">Quantity <span className="text-red-400">*</span></label>
                  <input type="number" defaultValue={productQuantity} min={0} max={50} name="quantity" id="quantity" placeholder="Quantity" 
                  className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" required />
                </div>

                <div className="space-y-2 m-2">
                  <label htmlFor="price" className="font-bold text-gray-700">Price <span className="text-red-400">*</span></label>
                  <Input type="number" defaultValue={productPrice} min={10} max={9999999} name="price" id="price" placeholder="9000.00" 
                  className="p-2 w-full font-bold text-sm text-gray-900 font-serif border outline-none rounded" required />
                </div>
              </div>

              <div className="space-y-2 m-2">
                <label htmlFor="lowstock" className="font-bold text-gray-700">Low Stock <span className="">(Optional)</span></label>
                <Input type="text" defaultValue={productLowStock} name="lowstock" id="lowstock" placeholder="Low Stock" 
                className="p-2 w-full font-bold text-gray-900 text-sm font-serif border outline-none rounded" />
              </div>
                <div className="space-y-2 m-2 mb-4">
                    <UpdateProduct />
                </div>
            </form><br/>
          </div>
          
        </div>
        </div>
    </>
  )
}

export default inventoryId