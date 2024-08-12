'use client'

import React from 'react';
import RandomDiv from '@/components/RandomDiv';
import '../styles/globals.css';
import { useState,useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import LogoutButton from '../components/LogoutButton';
import AccuracyBarGraph from '../components/AccuracyBarGraph';

export default function Home() {
  const [count, setCount] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const handleCountChange = (e) => {e.target.value !== "" ? setCount(e.target.value) : setCount(0)};
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const { data: session } = useSession();
  const name = (session ? session.user.name : null);
  const [stats,setStats] = useState(null);
  const [ref,setRef] = useState(false);
  const refresh = () => {setRef((prev) => !prev)};
  const [accuracyData,setAcc] = useState([0,0,0,0]);
<<<<<<< HEAD
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

=======
  
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
  const calculateAccuracy = (stats) => {
     let e_hits = 0;
     let m_hits = 0;
     let h_hits = 0;
     let ex_hits = 0;
     let e_count = 0;
     let m_count = 0;
     let h_count = 0;
     let ex_count = 0;

     stats.forEach((stat) => {
        if(stat.difficulty === "easy"){
          e_hits = e_hits+stat.hits;
          e_count = e_count+stat.count;
        }
        else if(stat.difficulty === "medium"){
          m_hits = m_hits+stat.hits;
          m_count = m_count+stat.count;
        }
        else if(stat.difficulty === "hard"){
          h_hits = h_hits+stat.hits;
          h_count = h_count+stat.count;
        }
        else{
          ex_hits = ex_hits+stat.hits;
          ex_count = ex_count+stat.count;
        }
     });
     
     console.log(e_count);
     return [
      (e_count !== 0) ? (e_hits/e_count)*100 : 0,
      (m_count !== 0) ? (m_hits/m_count)*100 : 0,
      (h_count !== 0) ? (h_hits/h_count)*100 : 0,
      (ex_count !== 0) ? (ex_hits/ex_count)*100 : 0
     ];
  };
  
  
  
  useEffect(() => {
    if(stats !== null){
      setAcc(calculateAccuracy(stats));
    }
  },[stats]);
  
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
  }, [name,ref]);

  

  return (
<<<<<<< HEAD
    <div className='flex flex-col w-full h-full justify-center absolute'>
        <div className='flex flex-row justify-between'>   
            <div className='ml-40 mb-10 text-4xl gradient-text'>
                Shoot the target {session && session.user.name}
            </div>
            {!session ? <div className='glowing-border-wrapper w-12 h-12 relative mr-5'><div className='bg-black w-11 h-11 rounded-md flex flex-col items-center justify-center'><Link href="/login" className='text-white'>Login</Link></div></div>

              :<div className="mr-5 w-10 h-10 relative rounded-full flex items-center justify-center text-white cursor-pointer"
                  style={{ backgroundImage: `url(${session?.user?.image})`, backgroundSize: 'contain', backgroundPosition: 'center' }}
                  onClick={toggleLogoutMenu}
                >   
                <div className={`${showLogout ? 'block' : 'hidden'} absolute top-16 left-1/2 transform -translate-x-1/2 glowing-border-wrapper`}>
                  <div className="glowing-border p-2 rounded-md bg-opacity-70">
                    <LogoutButton />
                  </div>
                </div>
              </div>}
=======
    <div className='flex flex-col w-full h-full justify-center'>
        <div className='flex flex-row justify-between'>   
            <div className='ml-40 mb-10 text-4xl font-bold gradient-text'>
                Shoot the target {session && session.user.name}
            </div>
            {!session ? <div className='mr-10 text-2xl font-bold text-black'><Link href="/login">Login</Link></div> : <div className='mr-10'><LogoutButton /></div>}
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
        </div> 
        <div className='flex flex-row justify-between p-6'>
            <div className='ml-20'>
                <RandomDiv mode={difficulty} counter={count} user={name}/>
            </div>
<<<<<<< HEAD
            <div className='flex flex-col mr-12 z-10'>
                <div className='mb-4'>
                    <label htmlFor="count" className="block  font-medium text-gray-500">Target</label>
=======
            <div className='flex flex-col mr-12'>
                <div className='mb-4'>
                    <label htmlFor="count" className="block text-sm font-medium text-gray-700">Count</label>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
                    <input
                    id="count"
                    type="number"
                    step="1"
                    min="0"
                    value={count}
                    onChange={handleCountChange}
<<<<<<< HEAD
                    className="mt-1 block w-full bg-slate-300 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
=======
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
                    required
                    />
                </div>
                <fieldset>
<<<<<<< HEAD
                    <legend className="font-medium text-gray-500">Difficulty</legend>
=======
                    <legend className="text-sm font-medium text-gray-700">Difficulty</legend>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
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
<<<<<<< HEAD
                            <label htmlFor="difficulty-easy" className="ml-3 text-sm font-medium text-gray-500">Easy</label>
=======
                            <label htmlFor="difficulty-easy" className="ml-3 text-sm font-medium text-gray-700">Easy</label>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
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
<<<<<<< HEAD
                            <label htmlFor="difficulty-medium" className="ml-3 text-sm font-medium text-gray-500">Medium</label>
=======
                            <label htmlFor="difficulty-medium" className="ml-3 text-sm font-medium text-gray-700">Medium</label>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
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
<<<<<<< HEAD
                            <label htmlFor="difficulty-hard" className="ml-3 text-sm font-medium text-gray-500">Hard</label>
=======
                            <label htmlFor="difficulty-hard" className="ml-3 text-sm font-medium text-gray-700">Hard</label>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
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
<<<<<<< HEAD
                            <label htmlFor="difficulty-extreme" className="ml-3 text-sm font-medium text-gray-500">Extreme</label>
                        </div>
                    </div>
                </fieldset>
                {(name !== null && stats !== null) ? <div className="mt-4 bg-gray-500 p-4 rounded-lg shadow-lg">
                  <div className='flex flex-row justify-between'>
                    <h2 className="text-2xl mb-4 ">History</h2>
=======
                            <label htmlFor="difficulty-extreme" className="ml-3 text-sm font-medium text-gray-700">Extreme</label>
                        </div>
                    </div>
                </fieldset>
                {(name !== null && stats !== null) ? <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                  <div className='flex flex-row justify-between'>
                    <h2 className="text-2xl font-bold mb-4">History</h2>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
                    <div className="bg-[url('../public/change.png')] bg-contain w-5 h-5" onClick={refresh}></div>
                  </div>
                  <div className="overflow-y-auto max-h-20">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-semibold">Difficulty</div>
                      <div className="font-semibold">Hits</div>
                      <div className="font-semibold">Count</div>
                    </div>
                    <ul>
                      {stats && stats.slice().reverse().map((data) => (
                        <li key={data._id} className="grid grid-cols-3 gap-4">
                          <div>{data.difficulty}</div>
                          <div>{data.hits}</div>
                          <div>{data.count}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
<<<<<<< HEAD
                 : <div className="mt-5 text-center text-2xl text-gray-500 mb-4"> Login to see your History </div>
                }
                {(name !== null && stats !== null) ?
                <div className="bg-gray-500 p-4 rounded-lg shadow-lg mt-4">
                  <h1 className="text-center text-2xl mb-4">{name}'s Dashboard</h1>
                  <div className="bg-slate-300 p-4 shadow rounded-lg z-10">
                    <AccuracyBarGraph accuracyData={accuracyData} />
                  </div>
                </div>
                : <div className="mt-5 text-center text-2xl text-gray-500 mb-4"> Login to see your Accuracies </div>
=======
                 : <div className="mt-5 text-center text-2xl font-bold mb-4"> Login to see your History </div>
                }
                {(name !== null && stats !== null) ?
                <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
                  <h1 className="text-center text-2xl font-bold mb-4">Shooting Practice Dashboard</h1>
                  <div className="bg-white p-4 shadow rounded-lg">
                    <AccuracyBarGraph accuracyData={accuracyData} />
                  </div>
                </div>
                : <div className="mt-5 text-center text-2xl font-bold mb-4"> Login to see your Accuracies </div>
>>>>>>> 6b3b9bf63c58d810b4e6ed29105ada5f874171ad
                } 
           </div>
        </div>
    </div>
  );
}


