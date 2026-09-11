
import prisma from '@/app/libs/prisma';
import Sidebar from '@/components/Sidebar';
import { auth } from '@clerk/nextjs/server';
import { TrendingDown, TrendingUp, TrendingUpDown } from 'lucide-react';
import { log } from 'next/dist/server/typescript/utils';
import { Sumana } from 'next/font/google';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
 const user = await auth()
  if(!user.userId) redirect("/sign-in")

    const totalProduct = await prisma.product.count({
      where:{
        clerkId: user.userId
      }
    })

    const recentProduct = await prisma.product.findMany({
      where:{
        clerkId: user.userId
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    })

    const allProduct = await prisma.product.findMany({
       where:{
        clerkId: user.userId
      },
      select: {
        name: true, price: true, quantity: true, lowstock: true
      }
    });

    const totalValue = allProduct.reduce(
      (sum, product) => sum + Number(product.price) * Number(product.quantity), 
      0
    )


  return (
    <>
        <div className="min-h-screen w-full flex">
        <div>
            <Sidebar />
        </div>
        <div className="m-2 w-full mr-4">
          <div className="text-2xl text-gray-700 pl-4 font-bold font-serif space-y-2">Dashboard</div>
          <p className="text-gray-400 text-xs pl-4 font-semibold">Welcome back! Here is an overview of inventory</p>
            
          <div className="grid lg:grid-cols-2 md:grid-cols-1 w-full m-2">
            <div className="rounded p-4 m-2 bg-white pb-16">
              <h1 className="text-gray-600 text-sm font-bold font-serif">Key metrics</h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center my-4">
                <div className="flex flex-col items-center ">
                  <h3 className="text-green-600 text-2xl font-semibold font-mono">{totalProduct}</h3>
                  <h4 className="text-gray-900 text-sm font-semibold font-serif">Total Product</h4>
                  <span className="flex gap-1 font-mono">{totalProduct}<TrendingUp className="w-5 h-5 text-gray-700" /></span>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-green-600 text-2xl font-semibold font-mono"><span>&#8358;{totalValue}</span></h3>
                  <h4 className="text-gray-900 text-sm font-semibold font-serif">Total Value</h4>
                  <span className="flex gap-1 font-mono">{totalValue}<TrendingUp className="w-5 h-5 text-gray-700" /></span>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-green-600 text-2xl font-semibold font-mono">{totalProduct}</h3>
                  <h4 className="text-gray-900 text-sm font-semibold font-serif">Recent Product</h4>
                  <span className="flex gap-1 font-mono">{totalProduct}<TrendingUp className="w-5 h-5 text-gray-700" /></span>
                </div>
              </div>
            </div>

            <div className="rounded p-4 m-2 bg-white">
              <h1 className="text-gray-600 text-lg font-bold font-serif mb-6">Product Information</h1>

              <h1 className={`font-bold text-3xl text-green-600 font-serif flex gap-2`}>Total Product 
                {totalProduct === 0
                            ? <TrendingDown className="" />
                            : totalProduct === 1
                              ? <TrendingUpDown className="" />
                              : <TrendingUp className="" />} 
                <span className={`${totalProduct === 0
                            ? 'text-red-500'
                            : totalProduct === 1
                              ? 'text-yellow-500'
                              : 'text-green-600'}`}>
                                {totalProduct}
                  </span>
              </h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 md:grid-cols-2 w-full m-2">
            {/* % 5 recent Product in my store */}
            <div className="rounded p-4 m-2 bg-white">
              <h1 className="text-gray-600 text-sm font-bold font-serif">Stock Levels</h1>
              <div className="w-full py-2">
                {
                  recentProduct.map((p, index) => {
                    const quantity = Number(p.quantity);
                    const stocklevel = quantity === 0 ? 0 : quantity <= 5 ? 1 : 2;
                     

                    return (
                      <div key={index} className="p-2 bg-gray-100 flex gap-2 justify-between items-center rounded-sm m-4">
                        <div className={`flex gap-1 pl-1 items-center rounded-sm `}>
                          <div className={`w-3 h-3 rounded-full ml-1  ${stocklevel === 0
                            ? 'bg-red-500'
                            : stocklevel === 1
                              ? 'bg-yellow-500'
                              : 'bg-green-600'}`} />
                          <div className="text-xs text-gray-500 font-bold font-sans">{p.name}</div>
                        </div>
                        <span className={`text-xs font-serif font-bold ${
                          stocklevel === 0
                            ? 'text-red-500'
                            : stocklevel === 1
                              ? 'text-yellow-500'
                              : 'text-green-600'
                        }`}>
                          {stocklevel === 0 ? p.quantity +` Unit` : stocklevel === 1 ?  p.quantity +` Unit` : p.quantity +` Unit`}
                        </span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="rounded p-4 m-2 bg-white">
              <h1 className="text-gray-600 text-lg font-bold font-serif mb-10">Total Value Product in The Stock</h1>

              <h1 className={`font-bold text-3xl text-green-600 font-serif flex gap-2`}>Total Product 
                {totalProduct === 1000000
                            ? <TrendingDown className="" />
                            : totalProduct === 15000000
                              ? <TrendingUpDown className="" />
                              : <TrendingUp className="" />} 
                <span className={` font-serif ${totalProduct === 0
                            ? 'text-red-500'
                            : totalProduct === 1
                              ? 'text-yellow-500'
                              : 'text-green-600'}`}>
                                &#8358;{totalValue}
                  </span>
              </h1>
            </div>
          </div>

        </div>
    </div>
    </>
   
  )
}

export default Dashboard 