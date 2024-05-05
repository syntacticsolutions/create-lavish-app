import React, { useState } from 'react';
import './App.css'; // Make sure to create an App.css file for styling
import { Main } from '@pages/Main';

interface AppProps {
  // Additional props can be added here if necessary
}

const App: React.FC<AppProps> = () => {
  return <Main />;
};

export default App;
