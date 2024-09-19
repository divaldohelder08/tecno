"use server"

import { auth, signOut } from '@/services/auth';
import { redirect } from "next/navigation"
import z from "zod"
import { createServerAction } from "zsa"

export const handleSignOut = createServerAction()
  .handler(async () => {
    console.log('outin')
    await signOut();
    redirect('/')
  })