import Sidebar from '@/components/Sidebar';
import { UserProfile } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Settings = async () => {
  const u = await auth()
  if(!u.userId) redirect("/sign-in")
  return (
      <>
       <div className="min-h-screen w-full flex">
    <div>
        <Sidebar />
    </div>
    <div className="m-4 w-130">
        <div className="text-2xl text-gray-700 font-bold font-serif space-y-2">Sittings</div>
          <UserProfile path="/settings" />
      </div>
    </div>
    </>
  )
}

export default Settings