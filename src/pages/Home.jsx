import React, { useState } from 'react';
import '../styles/PageWithSearch.scss';
import banner from '../assets/banner.png';
import loader_svg from '../assets/loader.svg';
import NavBar from '../components/NavBar';
import SearchContainer from '../components/SearchContainer';

const Home = () => {
  // local variables
  const [loadingStatus] = useState(false);

  return (
    <div>
      {/* loading screen */}
      {loadingStatus && (
        <div className='loader_container'>
          <img
            src={loader_svg}
            alt='loader'
          />
        </div>
      )}
      {/* header */}
      <div className='sticky_head'>
        <SearchContainer />
        <NavBar />
      </div>

      {/* banner */}
      <div className='banner_container'>
        <img
          src={banner}
          alt='banner'
        />
      </div>
    </div>
  );
};

export default Home;
