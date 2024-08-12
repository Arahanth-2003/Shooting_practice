'use client';

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
<<<<<<< HEAD
    <button className='white rounded-full' onClick={() => signOut({ callbackUrl: "/" })}>
=======
    <button className='text-2xl font-bold text-black' onClick={() => signOut({ callbackUrl: "/" })}>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
      Logout
    </button>
  );
}
