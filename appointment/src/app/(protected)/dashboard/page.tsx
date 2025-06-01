import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AppSidebar from "../_components/app-siderbar";
import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic");
  }

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
