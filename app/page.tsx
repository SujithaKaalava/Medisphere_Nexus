import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { getRole } from "@/utils/roles";
import { redirect } from "next/navigation";


export default async function Home() {
  const { userId } = await auth();
  const role=await getRole()

  if(userId && role){
    redirect(`/${role}`)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">Kinda HMS</span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            Loreum ipsum dolar sit amet consecutive dollar in a way to achieve the big thing
          </p>
          <div className="flex gap-4">
            {userId ? (
              <>
              <Link href={'`/${role}`'}>
              <Button>View Dashboard</Button>
              </Link>
              <UserButton/>
              </>
            ) : (
              <>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">New Patient</Button>
                </Link>
                <Link href="/sign-in">
                  <Button className="md:text-base underline hover:text-blue-600" 
                  variant={"outline"}>Login to Account</Button>
                </Link>
              </>
            )}
          </div>
          
        </div>
      </div>
      <footer className="my-8">
        <p className="text-center text-sm">&copy; 2025 kinda hospital management system .All rights reserverd
        </p>
              </footer>
    </div>
  );
}
