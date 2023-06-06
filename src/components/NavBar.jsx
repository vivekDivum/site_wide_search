import React from 'react';
import nav_data from '../mock_data/nav_links.json';

const NavBar = () => {
  return (
    <div className='nav_container'>
      <h1>Mobility Marketplace</h1>

      <nav>
        {nav_data?.map((nav_link_name) => {
          return (
            <div key={nav_link_name}>
              <span>{nav_link_name}</span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavBar;
