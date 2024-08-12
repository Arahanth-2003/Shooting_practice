'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button className='white rounded-full' onClick={() => signOut({ callbackUrl: "/" })}>
      Logout
    </button>
  );
}
