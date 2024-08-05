'use client';
import { useEffect, useState, useRef } from 'react';
import '../styles/globals.css';

const RandomPositionDiv = (props) => {
  let time = 0;
  const mode = props.mode;
  const counter = props.counter;
  const counter2 = counter+2;
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(counter2);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalId = useRef(null);
  if(mode === "easy"){
    time = 2000;
  }
  else if(mode === "medium"){
    time = 1000
  }
  else if(mode === "hard")
  {
    time = 750
  }
  else{
    time = 500
  }

  useEffect(() => {
    const moveDiv = () => {
      if (count >= counter && gameStarted) {
        clearInterval(intervalId.current);
        setGameStarted((prev) => !prev);
        return;
      }
      if(count < counter){
        const container = document.getElementById('container');
        const movingDiv = document.getElementById('movingDiv');
        const { x, y } = getRandomPosition(container, movingDiv);
        movingDiv.style.left = `${x}px`;
        movingDiv.style.top = `${y}px`;

        setCount((prevCount) => prevCount + 1);
      }
    };

    intervalId.current = setInterval(moveDiv, time);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [count,gameStarted]);

  const startGame = () => {
    setCount((prevCount) => 0);
    setScore((prevScore) => 0);
    setGameStarted((prev) => !prev);
  }

  const handleClick = (e) => {
    const element = e.target;
    element.classList.add('animate-explode');
    setTimeout(() => {
      element.classList.remove('animate-explode');
    }, 250);
    if (count < counter) {
      setScore((prevScore) => prevScore + 1);
      setCount((prevCount) => prevCount + 1);

      // Immediately move the div after click
      const container = document.getElementById('container');
      const movingDiv = document.getElementById('movingDiv');
      const { x, y } = getRandomPosition(container, movingDiv);
      movingDiv.style.left = `${x}px`;
      movingDiv.style.top = `${y}px`;

      // Clear the existing interval and set a new one
      clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, time);
    }
  };

  const getRandomPosition = (container, movingDiv) => {
    const containerRect = container.getBoundingClientRect();
    const elementRect = movingDiv.getBoundingClientRect();

    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
  };

  return (
    <div className='flex flex-col justify-center'>
      <h1 className='text-black'>Score: {score}</h1>
      {count===counter2 ? <h1 className='text-black'>Count: 0</h1> : <h1> Count: {count}</h1>}
      <div id="container" className="container">
        <div
          id="movingDiv"
          className="movingDiv"
          onClick={handleClick}
        ></div>
      </div>
      {!gameStarted && <button class="relative overflow-hidden px-6 py-3 font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={startGame}>
            Start
       </button>}
      

</div>
  );
};

export default RandomPositionDiv;
