import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

export const authenticated = async () => {
  const user = await auth()
  if(!user.userId){
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center mx-auto text-4xl">
        <div>
          <Link href="/sign-in">
            <button className="border-2 border-violet-800 hover:bg-violet-700 text-gray-700 hover:text-gray-50 font-bold py-2 px-4 rounded">
              <span>Sign In</span>
            </button>
          </Link>
          <div className="ml-4 text-gray-400 font-semibold text-sm font-mono text-center mt-2">
            Please sign in to access the dashboard.
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default authenticated