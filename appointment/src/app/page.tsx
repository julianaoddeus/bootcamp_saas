import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#002E77]">
      {/* Left Section - 30% */}
      <div className="-mt-50 flex w-[30%] flex-col items-start justify-center p-20">
        <h3 className="mb-8 text-2xl leading-tight font-bold text-white">
          Transforme sua clínica com o poder do agendamento inteligente
        </h3>
        <div className="mt-4">
          <Image
            src="/logoHome.svg"
            alt="Logo"
            width={200}
            height={80}
            priority
          />
        </div>
        <Button
          asChild
          className="mt-8 w-[300px] bg-white px-8 py-6 text-lg font-semibold text-[#002E77] hover:bg-white/90"
        >
          <Link href="/authentication">
            <span>Começar Agora</span>
          </Link>
        </Button>
      </div>

      {/* Right Section - 70% */}
      <div className="relative w-[70%]">
        <Image
          src="/dashboardHome.png"
          alt="Dashboard Preview"
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    </main>
  );
}
