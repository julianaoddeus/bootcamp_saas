import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import AppSidebar from "../_components/app-siderbar";
import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  //--------* acesso a seção de usuário *----------
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic");
  }
  //--------* fim do acesso a seção de usuário *----------
  return (
    <>
      <div className="flex items-center gap-2 p-4">
        <Image
          src={session?.user?.image as string}
          width={24}
          height={24}
          alt="User"
          className="rounded-full"
        />
        <h2> Bem vindo, {session.user.name}!</h2>
      </div>
      <SignOutButton />
      <AppSidebar />
    </>
  );
};

export default DashboardPage;
