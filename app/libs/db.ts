import prisma from "./prisma";


export default async function getUser() {
    try{
        const user = await prisma.user.findMany({
            include: {
                todo : {
                    include: {
                        tag : true
                    }
                }
            }
        }) 
        console.log(user.forEach((user) => {
            console.log(user.todo.forEach((todo) => {
                console.log(todo.tag)
            }))
        }))
    }catch(error){
        console.log(error)
    }finally{
        await prisma.$disconnect()
    }
}   