"use client"
import React from 'react'
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitProduct() {
    const { pending } = useFormStatus()
  return (
    <Button disabled={pending} className="bg-gray-700 font-semibold hover:bg-gray-700/80 text-white float-end flex py-1 px-3 rounded-lg" type="submit">
        {pending ? "Save product..." : "Add Product"}
    </Button>
  )
}
