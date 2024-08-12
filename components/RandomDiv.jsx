'use client';
import { useEffect, useState, useRef } from 'react';
import '../styles/globals.css';
import ProMessage from './ProMessage';
import { Cover } from './Cover';


const RandomPositionDiv = (props) => {
  let time = 0;
  let mode = props.mode;
  let counter = Number(props.counter);
  let counter2 = Number(counter+2);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(counter2);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalId = useRef(null);
  const [bgChanged, setBgChanged] = useState(false);
  useEffect(() => {
    if (bgChanged) {
      const timer = setTimeout(() => {
        setBgChanged(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [bgChanged]);

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

  async function postData() {
    try {
        const response = await fetch('./api/shooter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {"user":props.user,
             "difficulty":mode,
             "count":count,
             "hits":score,
            }),
        });
        const result = await response.json();
      } catch (error) {
        console.error('Error inserting data:', error);
      }
  }

  useEffect(() => {
    const moveDiv = () => {
      if (count >= counter && gameStarted) {
        clearInterval(intervalId.current);
        setGameStarted((prev) => !prev);
        if(props.user !== null){
          if(score <= count){
            postData();
          }
        }
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
    setScore(0);
    setCount(0);
    setGameStarted((prev) => !prev);
  }

  const handleClick = () => {
    setBgChanged(true);
    if (count < counter) {
      setScore((prevScore) => prevScore + 1);
      setCount((prevCount) => prevCount + 1);
      const container = document.getElementById('container');
      const movingDiv = document.getElementById('movingDiv');
      const { x, y } = getRandomPosition(container, movingDiv);
      movingDiv.style.left = `${x}px`;
      movingDiv.style.top = `${y}px`;

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
    <div className='flex flex-col ml-5'>
    <div className='flex flex-row justify-evenly'>
        <div className='font-bold text-red-600 text-xl'>Score: {score}</div>
        {count===counter2 ? <div className='font-bold text-red-600 text-xl'>Count: 0</div> : <div className='font-bold text-red-600 text-xl'> Count: {counter}</div>}
    </div>
    <div className='flex justify-center z-10 glowing-border-wrapper'>
        <div id="container" className="container glowing-border">
            {gameStarted && <div
            id="movingDiv"
            className={`absolute w-10 h-10 rounded-full bg-cover
             ${ bgChanged ? "bg-[url('../public/focus.gif')]" : "bg-[url('../public/focus.png')]" }`}
            onClick={handleClick}
            ></div>}
            {(score === count && count !== 0 && !gameStarted) && <ProMessage />}
        </div>
      </div>
    <div className='flex justify-center'>
    {!gameStarted && <button className="text-4xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white" onClick={startGame}>
           <Cover>Start</Cover>
       </button>}
    </div>
</div>

  );
};



export default RandomPositionDiv;
