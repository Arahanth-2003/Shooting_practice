'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button className='text-2xl font-bold text-black' onClick={() => signOut({ callbackUrl: "/" })}>
      Logout
    </button>
  );
}
