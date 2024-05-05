import React, { useState } from 'react';

export const Main = () => {
  const [count, setCount] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div className={darkTheme ? 'App dark' : 'App'}>
      <h1>Welcome to My React App!</h1>
      <button onClick={toggleTheme}>Switch to {darkTheme ? 'Light' : 'Dark'} Theme</button>
      <p>This is a simple React component built witha TypeScript.</p>
      <div>
        <button onClick={decrementCount}>-</button>
        <span> Counter: {count} </span>
        <button onClick={incrementCount}>+</button>
      </div>
    </div>
  );
};
