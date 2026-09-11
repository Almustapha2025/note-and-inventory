import { getNoteById, updateNote } from '@/app/libs/action';
import prisma from '@/app/libs/prisma';
import Addform from '@/components/Add-form';
import Updateform from '@/components/Update-form';
import Submitform from '@/components/Submit-form';
import { Button } from '@/components/ui/button';
import { Input } from '@base-ui/react/input';
import { Prisma } from '@prisma/client';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'



export default async function NotesId({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = await params;
    const id = Number(paramId);
    
    // const n = await id
    // const nn = await getNoteById(id)
    // console.log(nn)
    const nn = await prisma.note.findUnique({
        where: {
            id: id
        }
    })
    return (
        <>
        <div className="container flex flex-col items-center justify-center w-100 mx-auto space-x-2 p-4 ">
            <h1 className="text-2xl font-bold font-serif mb-4">Create Note</h1>
            <form action={updateNote} className="text-lg font-bold w-130 text-gray-100 bg-white border border-gray-200 m-4 p-4 rounded-lg shadow-lg">
            
                <input type="hidden" name="id" value={id} required />
                <Input type="text" defaultValue={nn?.title} placeholder="Title" name="title" className="border outline-none text-sm font-serif text-gray-600 placeholder-gray-500 py-1 
                px-2 rounded-lg w-full my-3" required /><br/>

                <textarea defaultValue={nn?.content} placeholder="Content" name="content" className="border outline-none text-sm font-serif text-gray-600 placeholder-gray-500 py-1 
                px-2 rounded-lg w-full my-3" required /><br/>
                
                <Updateform />
            </form>
        </div>
            {/* <div className="container mx-auto rounded-lg bg-white p-4 m-2 shadow-lg">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 rounded-lg backdrop:blur-sm">
                    {notes.map((note) => (
                            <div key={note.id} className="border rounded-lg p-2">
                                <div className="flex justify-between items-center gap-2">
                                    <div>
                                        <Link href={`/note/${note.id}`}><h3 className="text-lg font-bold capitalize font-serif mb-2">{note.title}</h3></Link>
                                    </div>
                                    <div>
                                        <form action={async (formData: FormData) => {
                                            'use server'
                                        //     const id = note.id
                                        //     await deleteNote(id)
                                        // }
                                        // }>
                                        //     <input type="hidden" name="id" value={note.id} required />
                                            <Button type="submit" className="font-bold rounded-lg hover:text-white text-gray-700">
                                                <Trash2Icon className="w-7 h-7 hover:text-red-400" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <div className="text-gray-700 text-sm font-serif mb-2">{note.content}</div>
                                <div className="text-gray-500 text-xs font-mono">{new Date(note.createdAt).toLocaleString()}</div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div> */}
    </> 
    )
}
 