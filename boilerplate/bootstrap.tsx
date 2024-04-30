import React from 'react';
import ReactDOM from 'react-dom/client';
import { Main } from '@pages/Main';

const Container = () => {
  return <Main />;
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Container />);
