'use server'

import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

const ProductSchome = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().nonnegative("Price must be non-negative"),
    quantity: z.coerce.number().min(0).nonnegative("Quantity must be non-negative"),
    lowstock: z.coerce.number().int().min(0).optional()
});


export default async function createNote(formData: FormData) {

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const clerkId = formData.get("clerkId") as string

    const note = await prisma.note.create({
        data: {
             title,
             content,
             clerkId // Must exactly match schema.prisma
        },
    })

    revalidatePath("/note");
}

export async function notesRecord() {

    const notes = await prisma.note.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return notes
}
export async function deleteNote(id: number) {
    await prisma.note.delete({
        where: {
            id: id
        }
    })
    revalidatePath("/note");
}
export async function getNoteById(id: number) {
    await prisma.note.findUnique({
        where: {
            id
        },
    })
    
}

export async function updateNote(formData: FormData) {
    const id = Number(formData.get('id') || "")
    const title = String(formData.get('title') || "")
    const content = String(formData.get('content') || "")
    
    const note = await prisma.note.update({
        where: {
            id
        },
        data: {
            title,
            content
        },
    })
    revalidatePath("/note");
    redirect("/note")
}

//adding Product to database

export async function createProduct(formData: FormData){
    const name = String(formData.get("name") ?? "")
    const price = Number(formData.get("price") ?? "")
    const quantity = Number(formData.get("quantity") ?? "")
    const lowstock = Number(formData.get("lowstock") ?? "")
    const clerkId = String(formData.get("clerkId") ?? "")

    await prisma.product.create({
        data:{
            name,
            price,
            quantity,
            lowstock,
            clerkId
        }
    })
    redirect("/inventory")
    
}

export async function viewProduct(){
    const products = await prisma.product.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
    return products
    
}

export async function updateProduct(formData: FormData){
    const name = String(formData.get("name") ?? "")
    const price = Number(formData.get("price") ?? "")
    const quantity = Number(formData.get("quantity") ?? "")
    const lowstock = Number(formData.get("lowstock") ?? "")
    // const clerkId = String(formData.get("clerkId") ?? "")
    const id = Number(formData.get("id") ?? "")

    await prisma.product.update({
        where:{
            id
        },
        data:{
            name,
            price,
            quantity,
            lowstock
        }
    })

    redirect("/inventory")
    
}
export async function deleteProduct(formData: FormData) {
    const id = Number(formData.get('id') ?? "")

    await prisma.product.delete({
        where:{
            id
        }
    })
    redirect("/inventory")
    
}
