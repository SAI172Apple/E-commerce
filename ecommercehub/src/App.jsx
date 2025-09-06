import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;