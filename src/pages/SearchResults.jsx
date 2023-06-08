import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import banner from '../assets/search_banner.png';
import no_results_found from '../assets/no-results-found.svg';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LinkIcon from '@mui/icons-material/Link';
import search_data from '../mock_data/search_data_2.json';
import NavBar from '../components/NavBar';
import SearchContainer from '../components/SearchContainer';
import loader_svg from '../assets/loader.svg';
import right_arrow from '../assets/right_arrow.png';
import pdf_icon from '../assets/pdf_icon.svg';
import xlxs_icon from '../assets/xlxs_icon.svg';
import earth_icon from '../assets/earth_icon.png';
import product_icon from '../assets/product_icon.png';
import file_download from '../assets/file_download_icon.svg';
import '../styles/SearchedResults.scss';
import truncateString from '../helpers/truncateText';
import { SearchFocusAtom } from '../state_management/SearchFocusAtom';
import { useRecoilState } from 'recoil';

const SearchResults = () => {
  // local variables
  const params = useParams();
  const [searchResponse, setSearchResponse] = useState();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [searchFocusStatus, setSearchFocuStatus] =
    useRecoilState(SearchFocusAtom);
  const [viewAllData, setViewAllData] = useState({
    products: false,
    links: false,
    docs: false
  });
  const navigate = useNavigate();

  // search api call
  useEffect(() => {
    console.log('params:', params?.search_term);
    if (params?.search_term) {
      setLoadingStatus(true);
      setSearchFocuStatus(false);

      setSearchResponse(search_data);
      setLoadingStatus(false);

      // axios
      //   .post('http://192.168.0.137:5000/search', {
      //     query: params?.search_term === 'none' ? '' : params?.search_term
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //     setSearchResponse(response?.data);
      //     setLoadingStatus(false);
      //     setViewAllData({
      //       products: false,
      //       links: false,
      //       docs: false
      //     });
      //   })
      //   .catch(function (error) {
      //     alert(error);
      //   });
    }

    return () => {
      setSearchResponse(null);
    };
  }, [params]);

  useEffect(() => {
    console.log('searchFocusStatus:', searchFocusStatus);
  }, [searchFocusStatus]);

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

      <SearchContainer />

      {/* <NavBar /> */}

      {/* body */}
      <div className='search_results'>
        {/* banner */}
        {/* <div className='banner_container'>
          <img
            src={banner}
            alt='banner'
          />
        </div> */}

        {/* conditionally rendering main content or no results  */}

        <>
          {searchResponse?.products?.length === 0 &&
          searchResponse?.web_url?.length === 0 &&
          searchResponse?.doc_url?.length === 0 ? (
            <>
              {/* No results container */}
              <div className='no_results_container'>
                <img
                  src={no_results_found}
                  alt='no results found'
                />

                <h1>No results found!</h1>
              </div>
            </>
          ) : (
            <div>
              {/* products */}
              {searchResponse?.products?.length > 0 && (
                <section className='response_content_wrapper'>
                  <div className='section_header'>
                    <h1 className='section_heading'>
                      Products &#40;
                      {searchResponse?.products?.length}{' '}
                      {searchResponse?.products?.length > 1
                        ? 'Results'
                        : 'Result'}
                      &#41;
                    </h1>

                    {searchResponse?.products?.length > 4 &&
                    !viewAllData?.products ? (
                      <button
                        onClick={() =>
                          setViewAllData({
                            ...viewAllData,
                            products: true
                          })
                        }
                        className='view_all_btn'
                      >
                        View All
                      </button>
                    ) : (
                      <>
                        {searchResponse?.products?.length > 4 && (
                          <button
                            className='view_all_btn'
                            onClick={() =>
                              setViewAllData({
                                ...viewAllData,
                                products: false
                              })
                            }
                          >
                            View Less
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className='product_container'>
                    {searchResponse?.products?.map((all_products, index) => {
                      if (
                        index <=
                        (viewAllData?.products
                          ? searchResponse?.products?.length
                          : 3)
                      )
                        return (
                          <>
                            {/* new card */}
                            <div className='single_product_card'>
                              {/* card header container */}
                              <div className='product_card_header'>
                                {/* image container */}
                                <div className='product_card_img_container'>
                                  {/* image with negative margin bottom */}
                                  <img
                                    src={all_products?.blobFileUrl}
                                    alt='links'
                                  />
                                  {/* 
                                    <img
                                      src={product_icon}
                                      alt='links'
                                    /> */}
                                </div>
                              </div>

                              {/* card body container */}
                              <div className='product_card_body_container'>
                                {/* sub_text */}
                                <h2>BGSW</h2>
                                {/* heading */}
                                <h1>
                                  {truncateString(
                                    all_products?.displayName,
                                    30
                                  )}
                                </h1>
                                {/* description */}
                                <p>
                                  {' '}
                                  {all_products?.productShortDesc?.length > 100
                                    ? all_products?.productShortDesc?.substring(
                                        0,
                                        100
                                      ) + '...'
                                    : all_products?.productShortDesc}
                                </p>

                                {/* category container */}
                                <div className='category_container'>
                                  <div>
                                    {all_products?.productBusinessCategoryMap?.map(
                                      (c_data, c_index) => {
                                        if (c_index < 3)
                                          return (
                                            <div
                                              key={
                                                c_data?.businessCategory
                                                  ?.businessCategoryId
                                              }
                                            >
                                              {
                                                c_data?.businessCategory
                                                  ?.businessCategoryName
                                              }
                                            </div>
                                          );
                                      }
                                    )}
                                  </div>
                                </div>

                                {/* updated date */}
                                <div className='updated_date_container'>
                                  <span className='updated_text'>
                                    Updated as on
                                  </span>
                                  <span className='updated_date'>
                                    12/03/2023
                                  </span>
                                </div>
                              </div>

                              {/* fixed or absolute positioned arrow  */}
                              <button
                                className='go_to_btn'
                                title='View more'
                              >
                                <img
                                  src={right_arrow}
                                  alt='go to btn'
                                />
                              </button>
                            </div>
                          </>
                        );
                    })}
                  </div>
                </section>
              )}

              {/* URLs */}
              {searchResponse?.web_url?.length > 0 && (
                <section className='response_content_wrapper'>
                  <div className='section_header'>
                    <h1 className='section_heading'>
                      Pages &#40;{searchResponse?.web_url?.length}{' '}
                      {searchResponse?.web_url?.length > 1
                        ? 'Results'
                        : 'Result'}
                      &#41;
                    </h1>

                    {searchResponse?.web_url?.length > 4 &&
                    !viewAllData?.links ? (
                      <button
                        className='view_all_btn'
                        onClick={() =>
                          setViewAllData({
                            ...viewAllData,
                            links: true
                          })
                        }
                      >
                        View All
                      </button>
                    ) : (
                      <>
                        {searchResponse?.web_url?.length > 4 && (
                          <button
                            className='view_all_btn'
                            onClick={() =>
                              setViewAllData({
                                ...viewAllData,
                                links: false
                              })
                            }
                          >
                            View Less
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  <div className='web_urls_container'>
                    {searchResponse?.web_url?.map((all_urls, i) => {
                      if (
                        i <=
                        (viewAllData?.links
                          ? searchResponse?.web_url?.length
                          : 3)
                      )
                        return (
                          <div
                            key={all_urls?._id}
                            className='each_urls'
                          >
                            <span
                              className='web_urls'
                              title={all_urls?.title}
                            >
                              {truncateString(all_urls?.title, 30)}
                            </span>

                            <p className='link_desc'>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Ipsa mollitia sunt, fugiat obcaecati eius
                              deserunt!
                            </p>

                            <div className='link_icon_container'>
                              {/* <span>
                                <img
                                  src={earth_icon}
                                  alt=''
                                />
                              </span> */}

                              <a
                                href={all_urls?.url}
                                rel='noreferrer'
                                target='_blank'
                                className='arrow_icon_container'
                              >
                                <img
                                  src={right_arrow}
                                  alt='link btn'
                                />
                              </a>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </section>
              )}

              {/* documents */}
              {searchResponse?.doc_url?.length > 0 && (
                <section className='response_content_wrapper'>
                  <div className='section_header'>
                    <h1 className='section_heading'>
                      Documents &#40;{searchResponse?.doc_url?.length}{' '}
                      {searchResponse?.doc_url?.length > 1
                        ? 'Results'
                        : 'Result'}
                      &#41;
                    </h1>

                    {searchResponse?.doc_url?.length > 4 &&
                    !viewAllData?.docs ? (
                      <button
                        className='view_all_btn'
                        onClick={() =>
                          setViewAllData({
                            ...viewAllData,
                            docs: true
                          })
                        }
                      >
                        View All
                      </button>
                    ) : (
                      <>
                        {searchResponse?.doc_url?.length > 4 && (
                          <button
                            className='view_all_btn'
                            onClick={() =>
                              setViewAllData({
                                ...viewAllData,
                                docs: false
                              })
                            }
                          >
                            View Less
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <div className='doc_container'>
                    {searchResponse?.doc_url?.map((all_documents, i) => {
                      if (
                        i <=
                        (viewAllData?.docs
                          ? searchResponse?.doc_url?.length
                          : 3)
                      )
                        return (
                          <div
                            key={all_documents?._id}
                            className='document_card'
                            title={all_documents?.doc_name}
                            onClick={() => {
                              window.open(`${all_documents?.doc_url}`);
                            }}
                          >
                            <div className='doc_links'>
                              <span>
                                {/* <img
                                  src={
                                    all_documents?.doc_name?.split('.')[
                                      all_documents?.doc_name?.split('.')
                                        ?.length - 1
                                    ] === 'pdf'
                                      ? pdf_icon
                                      : xlxs_icon
                                  }
                                  alt={all_documents?.doc_name}
                                /> */}

                                <img
                                  src={file_download}
                                  alt='file download'
                                />
                              </span>
                              <span>
                                <span>{all_documents?.doc_name}</span>
                              </span>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default SearchResults;
