import Image from "next/image";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Dashboard(){
    const session = await getServerSession()

    if(!session) return redirect("/login")

    return (
        <div>
            <span>Olá, {session.user?.name}</span>
            <span>Email: {session.user?.email}</span>
            {session.user?.image && (
                <Image 
                    src={session.user.image} 
                    width={100} 
                    height={100} 
                    alt="Foto do usuário" 
                    className="rounded-lg"
                />
            )}
        </div>
    )
}