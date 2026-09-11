import { deleteProduct, viewProduct } from '@/app/libs/action';
import prisma from '@/app/libs/prisma';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@base-ui/react/input';
import { auth } from '@clerk/nextjs/server';
import { LucideTrash2, PenTool, PenToolIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const ITEMS_PER_PAGE = 10;

const inventory = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const u = await auth()
  // console.log(u.userId)
  if(!u.userId) redirect("/sign-in")

  const product = await viewProduct();
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const products = await prisma.product.findMany({
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProducts = await prisma.product.count();

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  return (
    <>
        <div className="min-h-screen w-full flex">
    <div>
        <Sidebar />
    </div>
    <div className="m-4 w-160">
        <div className="text-2xl m-2 text-gray-500 font-bold font-serif space-y-2 rounded-xl">Inventory Record</div>
         <div className=" bg-gray-100 p-2 rounded-t-xl">
      <div className="mx-auto max-w-8xl rounded-xl bg-white shadow-lg">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800/90">
            Products
          </h1>
          <p className="text-sm text-gray-300/80">
            List of all registered product
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-2 py-2 text-left">Name</th>
                <th className="px-2 py-2 text-left">Quantity</th>
                <th className="px-2 py-2 text-left">Price</th>
                <th className="px-2 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className={`border-b transition hover:bg-indigo-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-2 py-1 font-bold text-sm text-gray-500">
                    {p.name}
                  </td>

                  <td className="px-4 py-1">
                    <div className="font-bold text-sm text-gray-500">
                      {p.quantity.toString()}
                    </div>
                  </td>

                  <td className="px-2 py-1 font-bold text-sm text-gray-500">
                      {p.price.toString()}
                  </td>

                  <td className="px-2 py-2 font-bold text-sm space-x-4 text-gray-500">
                    <div className="flex items-center">
                      <div>
                        
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/inventory/${p.id}`} className="flex">
                          {/* <PenTool className="w-5 h-5 font-bold text-blue-400 flex" />  */}
                          <span className="text-blue-400">Edit </span>
                          </Link>
                        </div>
                    </div>
                  </td>
                </tr>
              ))}

              {product.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-2 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
      </div>
    </div>
      </div>
    </div>
    </>
  )
}

export default inventory