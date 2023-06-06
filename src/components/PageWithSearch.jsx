import React, { useEffect, useRef, useState } from 'react';
import '../styles/PageWithSearch.scss';
import bosch_logo from '../assets/bosch-logo-only.svg';
import banner from '../assets/banner.png';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import nav_data from '../mock_data/nav_links.json';
import search_data from '../mock_data/search_data_2.json';
import product_data from '../mock_data/suggestion_data.json';
import axios from 'axios';
import SearchedResults from './SearchedResults';
import loader_svg from '../assets/loader.svg';

const PageWithSearch = () => {
  const [searchFocusStatus, setSearchFocuStatus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [apiData] = useState(product_data);
  const [searchedProducts, setSearchedProducts] = useState();
  const searchRef = useRef(null);
  const [searchResponse, setSearchResponse] = useState();
  const [loadingStatus, setLoadingStatus] = useState(false);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClickOutside();
      }
    };

    const onClickOutside = () => {
      setSearchFocuStatus(false);
    };

    document.addEventListener('mousedown', (event) => {
      handleClickOutside(event);
    });
    return () => {
      document.removeEventListener('mousedown', (event) => {
        handleClickOutside(event);
      });
    };
  }, []);

  useEffect(() => {
    if (searchText?.length > 0) {
      setSearchedProducts({
        ...apiData,
        products: apiData?.products?.filter((filtered_products) => {
          if (
            filtered_products?.displayName
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase())
          ) {
            return filtered_products;
          }
        })
      });
    } else {
      setSearchedProducts(null);
    }
  }, [searchText]);

  const searchCallHandler = () => {
    setLoadingStatus(true);
    setSearchFocuStatus(false);
    // setSearchResponse(search_data);
    axios
      .post('http://192.168.0.137:5000/search', {
        query: searchText?.toLowerCase()
      })
      .then(function (response) {
        console.log(response?.data);
        setSearchResponse(response?.data);
        setLoadingStatus(false);
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div>
      <div className='sticky_head'>
        {/* strip */}
        <div className='bosch_strip'></div>
        {/* header */}
        <div className='header_container'>
          <div className='logo_container'>
            <img
              src={bosch_logo}
              alt='bosch'
              onClick={() => {
                setSearchResponse();
                setSearchText('');
              }}
            />
          </div>
          <button
            className='search_container'
            ref={searchRef}
            onFocus={() => setSearchFocuStatus(true)}
            onClick={() => setSearchFocuStatus(true)}
          >
            <div className='search_contents'>
              <input
                onKeyDown={(e) => {
                  if (e?.key === 'Enter') {
                    searchCallHandler();
                  }
                }}
                type='search'
                className='search_field'
                placeholder='Search APIs, Services etc'
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value)}
              />
              <span className='search_icon'>
                <SearchRoundedIcon
                  fontSize='large'
                  onClick={searchCallHandler}
                />
              </span>
            </div>

            {searchFocusStatus && searchText?.length > 0 ? (
              <div className='search_result_container'>
                {searchedProducts?.products?.length > 0 ? (
                  <div>
                    {searchedProducts?.products?.map((p_data) => {
                      return (
                        <button
                          key={p_data?.id}
                          className='search_content'
                          onClick={() => {
                            setSearchText(p_data?.productName);
                            searchCallHandler();
                            setSearchFocuStatus(false);
                          }}
                        >
                          <span>{p_data?.productName}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    {searchText?.length > 0 && (
                      <h3 className='search_content'>No results found</h3>
                    )}
                  </div>
                )}
              </div>
            ) : (
              ''
            )}
          </button>
          <div className='top_links'>
            <div className='contact'>Get In Touch</div>
            <div className='divider'></div>
            <div className='login_signup'>Sign in or Create an account</div>
          </div>
        </div>

        {/* nav */}
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
      </div>

      {searchResponse ? (
        <SearchedResults searchResponse={searchResponse} />
      ) : (
        <div className='banner_container'>
          <img
            src={banner}
            alt='banner'
          />
        </div>
      )}

      {loadingStatus && (
        <div className='loader_container'>
          <img
            src={loader_svg}
            alt='loader'
          />
        </div>
      )}
    </div>
  );
};

export default PageWithSearch;
