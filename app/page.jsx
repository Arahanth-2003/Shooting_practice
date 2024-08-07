'use client'

import React from 'react';
import RandomDiv from '@/components/RandomDiv';
import '../styles/globals.css';
import { useState,useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';


export default function Home() {
  const [count, setCount] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const handleCountChange = (e) => setCount(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const { data: session } = useSession();
  const name = (session ? session.user.name : null);
  const [stats,setStats] = useState([{user:"hello"}]);

  // useEffect(() => {
  //   async function postData() {
  //       try {
  //           const response = await fetch('./api/shooter', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({user:name}),
  //           });
  //           const result = await response.json();
  //         } catch (error) {
  //           console.error('Error inserting data:', error);
  //         }
  //   }

  //   postData();
  // }, [session]);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`./api/getData?user=${name}`);
            const data = await response.json();
            setStats(data);
            console.log(stats.user);
          } catch (error) {
            console.error('Error inserting data:', error);
          }
    }
    if(name !== null){
      fetchData();
    }
  }, [session]);

  

  return (
    <div className='flex flex-col w-full h-full justify-center'>
        <div className='flex flex-row justify-between'>   
            <div className='ml-40 mb-12 text-4xl font-bold gradient-text gradient-text-hover transition-all duration-500'>
                Shoot the target {session && session.user.name}
            </div>
            {!session ? <div className='mr-10 text-2xl font-bold text-black'><Link href="/login">Login</Link></div> : <div className='mr-10'><LogoutButton /></div>}
        </div> 
        <div className='flex flex-row justify-between p-6'>
            <div className='ml-20'>
                <RandomDiv mode={difficulty} counter={count} user={name}/>
            </div>
            <div className='flex flex-col mr-12'>
                <div className='mb-5 mt-12'>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">Count</label>
                    <input
                    id="count"
                    type="number"
                    value={count}
                    onChange={handleCountChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                    />
                </div>
                <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Difficulty</legend>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                            <input
                            id="difficulty-easy"
                            type="radio"
                            name="difficulty"
                            value="easy"
                            checked={difficulty === 'easy'}
                            onChange={handleDifficultyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="difficulty-easy" className="ml-3 text-sm font-medium text-gray-700">Easy</label>
                        </div>
                        <div className="flex items-center">
                            <input
                            id="difficulty-medium"
                            type="radio"
                            name="difficulty"
                            value="medium"
                            checked={difficulty === 'medium'}
                            onChange={handleDifficultyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="difficulty-medium" className="ml-3 text-sm font-medium text-gray-700">Medium</label>
                        </div>
                        <div className="flex items-center">
                            <input
                            id="difficulty-hard"
                            type="radio"
                            name="difficulty"
                            value="hard"
                            checked={difficulty === 'hard'}
                            onChange={handleDifficultyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="difficulty-hard" className="ml-3 text-sm font-medium text-gray-700">Hard</label>
                        </div>
                        <div className="flex items-center">
                            <input
                            id="difficulty-easy"
                            type="radio"
                            name="difficulty"
                            value="extreme"
                            checked={difficulty === 'extreme'}
                            onChange={handleDifficultyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <label htmlFor="difficulty-extreme" className="ml-3 text-sm font-medium text-gray-700">Extreme</label>
                        </div>
                    </div>
                </fieldset>
                <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">History</h2>
                  <div className="overflow-y-auto max-h-64">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-semibold">Difficulty</div>
                      <div className="font-semibold">Hits</div>
                      <div className="font-semibold">Count</div>
                    </div>
                    <ul>
                      {stats && stats.map((data) => (
                        <li key={data._id} className="grid grid-cols-3 gap-4">
                          <div>{data.difficulty}</div>
                          <div>{data.hits}</div>
                          <div>{data.count}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

            </div>
        </div>
    </div>
  );
}


