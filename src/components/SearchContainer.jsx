import React, { useEffect, useRef, useState } from 'react';
import '../styles/PageWithSearch.scss';
import bosch_logo from '../assets/bosch-logo-only.svg';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import search_data from '../mock_data/search_data_2.json';
import product_data from '../mock_data/suggestion_data.json';
import product_icon from '../assets/product_icon.png';
import pdf_icon from '../assets/pdf_icon.svg';
import xlxs_icon from '../assets/xlxs_icon.svg';
import earth_icon from '../assets/earth_icon.png';

const SearchContainer = () => {
  // local variables
  //   const [apiData, setApiData] = useState(product_data);
  const [searchFocusStatus, setSearchFocuStatus] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState();
  const [searchText, setSearchText] = useState('');
  const [apiData, setApiData] = useState();
  const searchRef = useRef(null);
  const navigate = useNavigate();

  //   fetching suggestions on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/get-suggestions')?.then((res) => {
      setApiData(res?.data);
    });
    return () => {
      setApiData();
    };

    // setApiData(product_data);
  }, []);

  // handle click outside the suggestion dropdown
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

  //filter api data on every keystoke in search bar
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
        }),

        doc_names: apiData?.doc_names?.filter((filtered_products) => {
          if (
            filtered_products
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase())
          ) {
            return filtered_products;
          }
        }),

        web_titles: apiData?.web_titles?.filter((filtered_products) => {
          if (
            filtered_products
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

  return (
    <div>
      {/* header */}
      <div className='header_container'>
        {/* Click to go to "/" path */}
        <Link
          to='/'
          className='logo_container'
        >
          <img
            src={bosch_logo}
            alt='bosch'
          />
        </Link>

        {/* search container */}
        <button
          className='search_container'
          ref={searchRef}
          onFocus={() => setSearchFocuStatus(true)}
          onClick={() => setSearchFocuStatus(true)}
        >
          {/* search input filed and search icon */}
          <div className='search_contents'>
            <input
              onKeyDown={(e) => {
                if (e?.key === 'Enter') {
                  navigate(
                    `/search/${searchText?.length > 0 ? searchText : 'none'}`
                  );
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
                onClick={() =>
                  navigate(
                    `/search/${searchText?.length > 0 ? searchText : 'none'}`
                  )
                }
              />
            </span>
          </div>

          {/* map search filter suggestions */}
          {searchFocusStatus && searchText?.length > 0 && (
            <>
              {/* old conatiner */}
              <div className='search_result_container'>
                {searchedProducts?.products?.length > 0 ||
                searchedProducts?.doc_names?.length > 0 ||
                searchedProducts?.web_titles?.length > 0 ? (
                  <div>
                    {/* filtered products */}
                    {searchedProducts?.products?.map((p_data) => {
                      return (
                        <div
                          key={p_data?.id}
                          className='search_content'
                          onClick={() => {
                            setSearchText(p_data?.productName);
                            setSearchFocuStatus(false);
                            navigate(`/search/${p_data?.productName}`);
                          }}
                        >
                          <span>{p_data?.productName}</span>

                          <span className='tag'>product</span>
                        </div>
                      );
                    })}
                    {/* filtered docs */}
                    {searchedProducts?.doc_names?.map((d_data, d_index) => {
                      return (
                        <div
                          key={d_index}
                          className='search_content'
                          onClick={() => {
                            setSearchText(d_data);
                            setSearchFocuStatus(false);
                            navigate(`/search/${d_data}`);
                          }}
                        >
                          <span>{d_data}</span>
                          <span className='tag'>document</span>
                        </div>
                      );
                    })}
                    {/* filtered urls */}
                    {searchedProducts?.web_titles?.map((w_data, w_index) => {
                      return (
                        <div
                          key={w_index}
                          className='search_content'
                          onClick={() => {
                            setSearchText(w_data);
                            setSearchFocuStatus(false);
                            navigate(`/search/${w_data}`);
                          }}
                        >
                          <span className='content_text'>{w_data}</span>
                          <span className='tag'>web link</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    {/* "no suggestions found" container */}
                    <div>
                      {searchText?.length > 0 && (
                        <h3 className='search_content'>No suggestions found</h3>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* new container */}
              <div className='search_suggestion_container'>
                {(searchedProducts?.products?.length > 0 ||
                  searchedProducts?.doc_names?.length > 0 ||
                  searchedProducts?.web_titles?.length > 0) && (
                  <div className='search_suggestion_contents'>
                    {/* total products */}
                    {searchedProducts?.products?.length > 0 && (
                      <div className='count_container'>
                        <h1 className='product_count'>
                          <span>{searchedProducts?.products?.length}</span>
                          <span>
                            {searchedProducts?.products?.length > 1
                              ? 'Products'
                              : 'Product'}
                          </span>
                        </h1>

                        {/* <a href='/'>View more</a> */}
                      </div>
                    )}

                    {/* product list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.products?.map((p_data, p_index) => {
                        // if (p_index < 2)
                        return (
                          <div
                            key={p_data?.id}
                            className='single_product_slab'
                          >
                            <div className='product_details_group'>
                              {/* product image */}
                              <div className='product_img'>
                                <img
                                  src={product_icon}
                                  alt=''
                                />
                              </div>
                              {/* product details  */}
                              <div className='product_details_container'>
                                <h1>{p_data?.productName}</h1>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Architecto amet totam
                                  pariatur.
                                </p>

                                <div className='sub_cat_container'>
                                  <span>BOSCH</span>
                                  <span>API</span>
                                  <span>Configure</span>
                                  <span>React</span>
                                </div>
                              </div>
                            </div>

                            {/* icon */}
                            <div className='right_container'>
                              <img
                                src=''
                                alt=''
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* docs list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.doc_names?.map((d_data, d_index) => {
                        // if (d_index < 2)
                        return (
                          <div
                            key={d_index}
                            className='single_product_slab'
                          >
                            <div className='product_details_group'>
                              {/* document image */}
                              <div className='product_img'>
                                <img
                                  src={
                                    d_data?.split('.')[
                                      d_data?.split('.')?.length - 1
                                    ] === 'pdf'
                                      ? pdf_icon
                                      : xlxs_icon
                                  }
                                  alt=''
                                />
                              </div>
                              {/* doc details  */}
                              <div className='product_details_container'>
                                <h1>{d_data}</h1>
                                <p>
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Aperiam obcaecati velit
                                  saepe molestiae earum similique libero
                                  repudiandae temporibus deleniti consectetur a,
                                  eaque facilis quis voluptatibus
                                </p>
                              </div>
                            </div>

                            {/* icon */}
                            <div className='right_container'>
                              <img
                                src=''
                                alt=''
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* url list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.web_titles?.map((w_data, w_index) => {
                        // if (w_index < 2)
                        return (
                          <div
                            key={w_index}
                            className='single_product_slab'
                          >
                            <div className='product_details_group'>
                              {/* document image */}
                              <div className='product_img'>
                                <img
                                  src={earth_icon}
                                  alt=''
                                />
                              </div>
                              {/* doc details  */}
                              <div className='product_details_container'>
                                <h1>{w_data}</h1>
                                <p>
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Aperiam obcaecati velit
                                  saepe molestiae earum similique libero
                                  repudiandae temporibus deleniti consectetur a,
                                  eaque facilis quis voluptatibus
                                </p>
                              </div>
                            </div>

                            {/* icon */}
                            <div className='right_container'>
                              <img
                                src=''
                                alt=''
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </button>

        {/* header mock urls */}
        <div className='top_links'>
          <div className='contact'>Get In Touch</div>
          <div className='divider'></div>
          <div className='login_signup'>Sign in or Create an account</div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
