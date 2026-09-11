"use client"
import { UserButton, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { BarChart3, Key, Package, Plus, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { use } from 'react'


const Sidebar = () => {

    const { user } = useUser()

    const currentPath = usePathname()

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3},
        { name: "Inventory", href: "/inventory", icon: Package},
        { name: "Add Product", href: "/add-product", icon: Plus},
        { name: "Settings", href: "/settings", icon: Settings}
    ]

  return (
    <div className="min-h-screen left-0 top-0 z-10 items-center flex-col w-52 bg-gray-900">
        <div className="flex flex-col">
            <div className="flex gap-2 items-center mb-4">
                <BarChart3 className="w-9 h-9 bg-violet-950 shadow-4xl rounded-lg m-1 text-white p-2" />
                <span className="text-white font-semibold font-serif">Inventory App</span>
            </div>
        </div>

        <nav className="space-y-2 flex flex-col justify-between">
            <div className="text-sm capitalize font-semibold text-gray-400 space-y-2 rounded-lg m-2">
            {navigation.map((item) => {
                return (
                    <Link key={item.href} href={item.href} className={currentPath === item.href ? 
                        `flex items-center gap-3 px-4 py-2 text-gray-700 bg-gray-200 rounded` :
                     `flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-600 rounded` }>
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        
                    </Link>
                )
            })}
              
            </div>
            <div className="z-10 left-4 mt-78 ml-6 flex flex-col gap-2 text-sm capitalize font-semibold text-gray-400 space-y-2 rounded-lg m-2">
                 <div className="flex gap-2">
                    <UserButton />
                    <div className="flex justify-center">
                        <p className="text-xm font-mono mt-1 capitalize">
                            {user?.fullName}<br/>
                            {/* {user?.primaryEmailAddress?.emailAddress} */}
                        </p>
                    </div>
                 </div>
            </div>
        </nav>
    </div>
  )
}

export default Sidebar
