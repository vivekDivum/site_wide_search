import React from 'react';
import banner from '../assets/search_banner.png';
import no_results_found from '../assets/no-results-found.svg';
import '../styles/SearchedResults.scss';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import LinkIcon from '@mui/icons-material/Link';

const SearchedResults = (props) => {
  return (
    <div className='search_results'>
      {/* banner */}
      <div className='banner_container'>
        <img
          src={banner}
          alt='banner'
        />
      </div>

      {props?.searchResponse?.products?.products?.length === 0 &&
      props?.searchResponse?.web_url?.length === 0 &&
      props?.searchResponse?.doc_url?.length === 0 ? (
        <div className='no_results_container'>
          <img
            src={no_results_found}
            alt='no results found'
          />

          <h1>No results found!</h1>
        </div>
      ) : (
        <div>
          {/* products */}
          {props?.searchResponse?.products?.products?.length > 0 && (
            <section className='response_content_wrapper'>
              <div className='section_header'>
                <h1 className='section_heading'>
                  Products &#40;
                  {props?.searchResponse?.products?.products?.length}
                  &#41;
                </h1>

                {props?.searchResponse?.products?.products?.length > 3 && (
                  <a
                    href='https://www.mobilitymarketplace.io/api/iot-&-ai/listing?asset-type=apis,data'
                    rel='noreferrer'
                    target='_blank'
                    className='view_all_btn'
                  >
                    View All
                  </a>
                )}
              </div>

              <div className='product_container'>
                {props?.searchResponse?.products?.products
                  ?.slice(0, 4)
                  ?.map((all_products) => {
                    return (
                      <div
                        className='each_product'
                        key={all_products?.id}
                      >
                        <div>
                          <h1 className='card_title'>
                            {all_products?.displayName}
                          </h1>
                          <p className='card_desc'>
                            {all_products?.productShortDesc}
                          </p>
                        </div>

                        <div className='card_categories'>
                          {all_products?.productBusinessCategoryMap?.map(
                            (c_data) => {
                              return (
                                <p
                                  key={
                                    c_data?.businessCategory?.businessCategoryId
                                  }
                                >
                                  {
                                    c_data?.businessCategory
                                      ?.businessCategoryName
                                  }
                                </p>
                              );
                            }
                          )}
                        </div>

                        <div>
                          <button className='arrow_icon_container'>
                            <EastRoundedIcon
                              fontSize='small'
                              className='arrow_icon'
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          )}

          {/* URLs */}
          {props?.searchResponse?.web_url?.length > 0 && (
            <section className='response_content_wrapper'>
              <div className='section_header'>
                <h1 className='section_heading'>
                  Links &#40;{props?.searchResponse?.web_url?.length}
                  &#41;
                </h1>

                {props?.searchResponse?.web_url?.length > 3 && (
                  <button className='view_all_btn'>View All</button>
                )}
              </div>
              <div className='web_urls_container'>
                {props?.searchResponse?.web_url?.map((all_urls, i) => {
                  return (
                    <div
                      key={all_urls?._id}
                      className='each_urls'
                    >
                      <span className='web_urls'>{all_urls?.title}</span>

                      <div className='link_icon_container'>
                        <span>
                          <LinkIcon fontSize='large' />
                        </span>

                        <a
                          href={all_urls?.url}
                          rel='noreferrer'
                          target='_blank'
                          className='arrow_icon_container'
                        >
                          <EastRoundedIcon
                            fontSize='small'
                            className='arrow_icon'
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
          {props?.searchResponse?.doc_url?.length > 0 && (
            <section className='response_content_wrapper'>
              <div className='section_header'>
                <h1 className='section_heading'>
                  Documents &#40;{props?.searchResponse?.doc_url?.length}
                  &#41;
                </h1>

                {props?.searchResponse?.doc_url?.length > 3 && (
                  <button className='view_all_btn'>View All</button>
                )}
              </div>

              <div>
                {props?.searchResponse?.doc_url?.map((all_documents) => {
                  return (
                    <div
                      key={all_documents?._id}
                      className='document_card'
                    >
                      <a
                        className='doc_links'
                        href={all_documents?.doc_url}
                        rel='noreferrer'
                        target='_blank'
                      >
                        <span>
                          <FilePresentIcon
                            fontSize='large'
                            className='file_icon'
                          />
                        </span>
                        <span>{all_documents?.doc_name}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchedResults;
