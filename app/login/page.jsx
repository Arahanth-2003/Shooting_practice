'use client'

import { getProviders, signIn } from "next-auth/react";


export default async function LoginPage() {
  const providers = await getProviders();

  return (
<<<<<<< HEAD
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950">
      <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
=======
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id,{callbackUrl: '/'})}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}
