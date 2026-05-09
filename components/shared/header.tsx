"use client"

import { DoorOpen, User } from 'lucide-react';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Logo } from "./logo";
import { useOnboardingContext } from "@/features/onboarding/providers/onboarding-provider";
import { Button } from '../ui/button';

const roles = [
  { value: "visitor", label: "Visitante" },
  { value: "writer", label: "Escritor" },
]

export default function Header() {
  const router = useRouter()
  const { data, clear }  = useOnboardingContext()
  const [role] = useState<string | null>(data?.ie_role || "visitor")


  const backToProfile = () => {
    clear()
    router.push('/')
  }

  const selectedRoleLabel = data?.nm_user
    ? `${data.nm_user} - ${roles.find(r => r.value === role)?.label}`
    : roles.find(r => r.value === role)?.label


  return (
    <header className="p-4 border-b items-center justify-between w-full flex px-24">
      <Logo
        src="/logo/juridiq_logo.webp"
        alt="Juridiq Livraria Logo"
        className="shrink-0 h-1/3"
      />
        
      <div className='flex flex-row items-center gap-4'>
        
        <div className="flex items-center gap-2 bg-gray-200 px-4 py-1 rounded-3xl">
            <User className="w-4 h-4" />
            <span>{selectedRoleLabel ?? ""}</span>
        </div>
        <Button size="sm" onClick={() => backToProfile()}>
            Trocar Perfil
          <DoorOpen className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}