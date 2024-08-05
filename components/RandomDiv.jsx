'use client';
import { useEffect, useState, useRef } from 'react';

const RandomPositionDiv = () => {
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);

  useEffect(() => {
    const moveDiv = () => {
      if (count >= 30) {
        clearInterval(intervalId.current);
        return;
      }

      const container = document.getElementById('container');
      const movingDiv = document.getElementById('movingDiv');
      const { x, y } = getRandomPosition(container, movingDiv);
      movingDiv.style.left = `${x}px`;
      movingDiv.style.top = `${y}px`;

      setCount((prevCount) => prevCount + 1);
    };

    intervalId.current = setInterval(moveDiv, 2000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [count]);

  const handleClick = () => {
    if (count < 30) {
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
      }, 2000);
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
    <div>
      <h1>Score: {score}</h1>
      <h1>Count: {count}</h1>
      <div id="container" style={{ position: 'relative', width: '500px', height: '500px', border: '1px solid black' }}>
        <div
          id="movingDiv"
          style={{ position: 'absolute', width: '50px', height: '50px', backgroundColor: 'red', cursor: 'pointer' }}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default RandomPositionDiv;
