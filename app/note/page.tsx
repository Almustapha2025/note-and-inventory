import { Button } from '@base-ui/react/button';
import { Input } from '@base-ui/react/input';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import createNote, { deleteNote, notesRecord } from '../libs/action';
import Link from 'next/link';
import { Delete, RemoveFormattingIcon, Trash, Trash2Icon } from 'lucide-react';
import Submitform from '@/components/Submit-form';
import Addform from '@/components/Add-form';

const Notes = async () => {
    const user = await auth()
    if(!user.userId) redirect('/sign-in')
    const clerkId = user.userId ?? ''

    const notes = await notesRecord() 

  return (
    <>
        <div className="container flex flex-col items-center justify-center w-100 mx-auto space-x-2 p-4 ">
            <h1 className="text-2xl font-bold font-serif mb-4">Create Note</h1>
            <form action={createNote} className="text-lg font-bold w-130 text-gray-100 bg-white border border-gray-200 m-4 p-4 rounded-lg shadow-lg">
            
                <input type="hidden" name="clerkId" value={clerkId} required />
                
                <Addform />
                <Submitform />
                
            </form>
        </div>
            <div className="container mx-auto rounded-lg bg-white p-4 m-2 shadow-lg">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg backdrop:blur-sm">
                    {notes.map((note) => (
                            <div key={note.id} className="border rounded-lg p-2">
                                <div className="flex justify-between items-center gap-2">
                                    <div>
                                        <Link href={`/note/${note.id}`} className="text-blue-400"><h3 className="text-lg font-bold capitalize font-serif mb-2">{note.title}</h3></Link>
                                    </div>
                                    <div>
                                        <form action={async (formData: FormData) => {
                                            'use server'
                                            const id = note.id
                                            await deleteNote(id)
                                        }
                                        }>
                                            <input type="hidden" name="id" value={note.id} required />
                                            <Button type="submit" className="font-bold rounded-lg hover:text-white text-gray-700">
                                                <Trash2Icon className="w-7 h-7 text-red-400" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <div className="text-gray-900 text-sm font-serif mb-2">{note.content}</div>
                                <div className="text-gray-500 text-xs font-mono">{new Date(note.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
    </> 
  )
}

export default Notes