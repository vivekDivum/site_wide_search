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
import link_icon from '../assets/link.svg';
import fileDownloadIcon from '../assets/file_download_icon.svg';
import truncateString from '../helpers/truncateText';

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
    axios.get('http://192.168.0.137:5000/get-suggestions')?.then((res) => {
      setApiData(res?.data);
      console.log(res?.data);
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

        doc_objects: apiData?.doc_objects?.filter((filtered_products) => {
          if (
            filtered_products?.doc_name
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase())
          ) {
            return filtered_products;
          }
        }),

        web_objects: apiData?.web_objects?.filter((filtered_web_objects) => {
          if (
            filtered_web_objects?.title
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase())
          ) {
            return filtered_web_objects;
          }
        })
      });
    } else {
      setSearchedProducts(null);
    }
  }, [searchText]);

  useEffect(() => {
    console.log('searchedProducts:', searchedProducts);
  }, [searchedProducts]);

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
              {/* new container */}
              <div className='search_suggestion_container'>
                {(searchedProducts?.products?.length > 0 ||
                  searchedProducts?.doc_objects?.length > 0 ||
                  searchedProducts?.web_objects?.length > 0) && (
                  <div className='search_suggestion_contents'>
                    {/* total products */}
                    {searchedProducts?.products?.length > 0 && (
                      <div className='count_container'>
                        <h1 className='product_count'>
                          <span>
                            {searchedProducts?.products?.length > 1
                              ? 'Products'
                              : 'Product'}
                          </span>
                          <span>
                            &#40;{searchedProducts?.products?.length}&#41;
                          </span>
                        </h1>

                        <Link to={'/search/' + searchText}>See All</Link>
                      </div>
                    )}

                    {/* product list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.products?.map((p_data, p_index) => {
                        if (p_index < 2)
                          return (
                            <div
                              key={p_data?.id}
                              className='single_product_slab'
                              onClick={() => {
                                setSearchText(p_data?.displayName);
                                navigate('/search/' + p_data?.displayName);
                              }}
                            >
                              <div className='product_details_group'>
                                <div className='product_img'>
                                  <img
                                    src={p_data?.blobFileUrl}
                                    alt={p_data?.productName}
                                  />
                                </div>
                                <div className='product_details_container'>
                                  <h1>{p_data?.displayName}</h1>
                                  <p>
                                    {truncateString(
                                      p_data?.productShortDesc,
                                      50
                                    )}
                                  </p>

                                  {p_data?.productBusinessCategoryMap?.length >
                                    0 && (
                                    <div className='sub_cat_container'>
                                      {p_data?.productBusinessCategoryMap?.map(
                                        (pb_data, pb_index) => {
                                          if (pb_index < 3)
                                            return (
                                              <span
                                                key={
                                                  pb_data?.businessCategoryId
                                                }
                                              >
                                                {
                                                  pb_data?.businessCategory
                                                    ?.businessCategoryName
                                                }
                                              </span>
                                            );
                                        }
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className='right_container'>
                                <img
                                  src={link_icon}
                                  alt='link'
                                />
                              </div>
                            </div>
                          );
                      })}
                    </div>

                    {/* total urls */}
                    {searchedProducts?.web_objects?.length > 0 && (
                      <div className='count_container'>
                        <h1 className='product_count'>
                          <span>
                            {searchedProducts?.web_objects?.length > 1
                              ? 'Pages'
                              : 'Page'}
                          </span>
                          <span>
                            &#40;{searchedProducts?.web_objects?.length}&#41;
                          </span>
                        </h1>

                        <Link to={'/search/' + searchText}>See All</Link>
                      </div>
                    )}

                    {/* url list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.web_objects?.map((w_data, w_index) => {
                        if (w_index < 2)
                          return (
                            <div
                              key={w_index}
                              className='single_product_slab'
                              onClick={() => {
                                window.open(w_data?.url);
                              }}
                            >
                              <div className='product_details_group'>
                                <div className='product_details_container'>
                                  <h1>{w_data?.title}</h1>
                                  <p>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Aperiam obcaecati velit
                                  </p>
                                </div>
                              </div>

                              <div className='right_container'>
                                <img
                                  src={link_icon}
                                  alt='link'
                                />
                              </div>
                            </div>
                          );
                      })}
                    </div>

                    {/* total docs */}
                    {searchedProducts?.doc_names?.length > 0 && (
                      <div className='count_container'>
                        <h1 className='product_count'>
                          <span>
                            {searchedProducts?.doc_names?.length > 1
                              ? 'Documents'
                              : 'Document'}
                          </span>
                          <span>
                            &#40;{searchedProducts?.doc_names?.length}&#41;
                          </span>
                        </h1>

                        <Link to={'/search/' + searchText}>See All</Link>
                      </div>
                    )}

                    {/* docs list container */}
                    <div className='product_list_container'>
                      {searchedProducts?.doc_objects?.map((d_data, d_index) => {
                        if (d_index < 2)
                          return (
                            <div
                              key={d_index}
                              className='single_product_slab'
                              onClick={() => {
                                window.open(d_data?.doc_url);
                              }}
                            >
                              <div className='product_details_group'>
                                <div className='file_icon_container'>
                                  <img
                                    src={fileDownloadIcon}
                                    alt='file download'
                                  />
                                </div>
                                <div className='product_details_container'>
                                  <h1 className='doc_name'>
                                    {d_data?.doc_name}
                                  </h1>
                                </div>
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
