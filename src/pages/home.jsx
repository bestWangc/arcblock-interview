import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import blockletLogo from '../assets/blocklet.svg';
import viteLogo from '../assets/vite.svg';
import './home.css';
import api from '../libs/api';
import Profile from '../components/Profile';

function Home() {

  return (
    <>
      <div className="App">
        <Profile />
      </div>
    </>
  );
}

export default Home;
