'use client'

import RandomDiv from '@/components/RandomDiv';
import '../styles/globals.css';
import { useState } from 'react';

export default function Home() {

  const [count, setCount] = useState(30);
  const [difficulty, setDifficulty] = useState('easy');
  const handleCountChange = (e) => setCount(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(e.target.value);


  return (
    <div className='flex flex-row justify-evenly'>
        <div className='flex flex-col justify-center ml-12 inline-block'>
            <h1 className='text-5xl font-bold text-black'>Shoot the target</h1>
            <RandomDiv mode={difficulty} counter={count}/>
        </div>
        <div>
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
        </div>
    </div>
  );
}
