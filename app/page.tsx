import Link from "next/link";
import getUser from "./libs/db";
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import { auth } from "@clerk/nextjs/server";
import { Button } from "@base-ui/react/button";
// import { useRouter } from "next/navigation";

export default async function Home() {
  
    const record = await getUser()
    // console.log(record);
  return (
   <>
      <div className="min-h-screen flex flex-col justify-center items-center mx-auto text-4xl">
        <div>
          <h1 className="font-bold text-gray-800 font-serif">Inventory Management</h1>
        </div>
        <div className="ml-4 text-gray-400 font-semibold text-sm font-mono text-center mt-2">
          Start managing your inventory with ease and efficiency. <br/> Our system provides a user-friendly 
          interface to track, organize, <br/>and analyze your inventory data, helping you make informed decisions <br/>
          and optimize your business operations.
          
            <div className="ml-4 mt-4 flex justify-center items-center gap-4 text-gray-400 font-semibold text-sm text-center">
            <Link href="/sign-in">
              <Button className="border-2 border-violet-800 hover:bg-violet-700 shadow-sm hover:shadow-violet-900 text-violet-700 hover:text-gray-50 font-bold py-2 px-4 rounded">
                <span>Sign In</span>
              </Button>
            </Link>
              
              <Button className="border-2 border-gray-800 hover:bg-gray-900 text-gray-700 hover:text-gray-50 font-bold py-2 px-4 rounded">
                Learn More
              </Button>
            </div>
        </div>
      </div>
   </>
  );
}
