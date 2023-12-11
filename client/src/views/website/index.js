import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Input } from 'reactstrap'
import { Modal } from 'reactstrap';
import { getPreviewPageAction, getPublishPageAction, getPreviewBlogPageAction, getPublishBlogPageAction } from "../formBuilder/store/action";
import renderHTML from 'react-render-html';
import { BiMobile } from 'react-icons/bi';
import {
  MdOutlineDesktopMac,
  MdOutlineTablet,
  MdOutlineLayers,
  MdWorkspacesOutline,
  MdOutlineLibraryBooks,
  MdOutlineGridView,
  MdOutlineNewspaper,
  MdOutlineFormatColorReset,
  MdZoomIn,
  MdOutlineDownloading,
  MdOutlineInsertComment,
  MdOutlineLensBlur
} from 'react-icons/md';
import { updateCartProductsAction, getProductDatasetAction } from '../formBuilder/store/action';
const days = [
  'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
];
import { Helmet } from 'react-helmet';
import Cartsidebar from '../pages/cart/cartsidebar';

export default function Index() {
  const { id, pageName, blogId } = useParams();
  const history = useHistory();
  const [pageContent, setPageContent] = useState();
  const [popupData, setPopupData] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const store = useSelector((state) => state.formEditor);
  const iframeRef = useRef(null);
  const storeRef = useRef(null);
  storeRef.current = store;
  useEffect(() => {
    dispatch(getProductDatasetAction(id));
    let name;
    if (pageName) {
      name = pageName;
    }
    else {
      name = "Home";
    };
    const payload = { id, pageName: name };
    const linkUrl = store.linkUrl;
    if (!linkUrl || linkUrl === 'website') {
      if (blogId) {
        const payload = { id, blogId };
        dispatch(getPublishBlogPageAction(payload)).then((res) => {
          setPageContent(res);
        });
      }
      else {
        dispatch(getPublishPageAction(payload)).then((res) => {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(res.data, 'text/html');
          let linkElements = htmlCmp.getElementsByTagName('a');
          for (let i = 0; i < linkElements.length; i++) {
            let link_href = linkElements[i].getAttribute('href');
            if (link_href && !link_href.includes('https') && !link_href.includes('http') && !link_href.includes('preview') && !link_href.includes('website')) {
              link_href = '/website' + link_href;
            }
            linkElements[i].setAttribute('href', link_href);
            linkElements[i].setAttribute('target', '_parent');
          };
          var tmp = document.createElement("div");
          tmp.append(htmlCmp.body)
          setPageContent(tmp.innerHTML);
          setPageInfo(res.pageInfo);
          setPopupData(res.pageInfo.popups || []);
        });
      }
    }
    if (linkUrl === 'preview') {
      if (blogId) {
        const payload = { id, blogId };
        dispatch(getPreviewBlogPageAction(payload)).then((res) => {
          setPageContent(res);
        })
      }
      else {
        dispatch(getPreviewPageAction(payload)).then((res) => {
          const parser = new DOMParser();
          let htmlCmp = parser.parseFromString(res.data, 'text/html');
          let linkElements = htmlCmp.getElementsByTagName('a');
          for (let i = 0; i < linkElements.length; i++) {
            let link_href = linkElements[i].getAttribute('href');
            if (link_href && !link_href.includes('https') && !link_href.includes('http') && !link_href.includes('preview') && !link_href.includes('website')) {
              link_href = '/preview' + link_href;
            }
            linkElements[i].setAttribute('href', link_href)
            linkElements[i].setAttribute('target', '_blank');
          };
          var tmp = document.createElement("div");
          tmp.append(htmlCmp.body);
          setPageContent(tmp.innerHTML);
          setPageInfo(res.pageInfo);
          setPopupData(res.pageInfo.popups || []);
        })
      }
    };

  }, []);

  useEffect(() => {
    if (store && iframeRef.current) {
      let iframe = iframeRef.current;
      if (iframe && iframe.contentDocument) {
        let sum = 0;
        store?.cartProducts?.forEach((item) => {
          sum += item.count;
        })
        let shoppingCartElements = iframe.contentDocument.querySelectorAll('.shoppingcart');
        if (shoppingCartElements.length > 0) {
          // Elements found. Iterate over NodeList
          shoppingCartElements.forEach(element => {
            let itemsCountElement = element.querySelector('.items-count');
            itemsCountElement.innerHTML = sum;
            // Do something with each element
          });
        }
      }
    }
  }, [store?.cartProducts]);

  useEffect(() => {
    if (popupData?.length > 0) {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const currentDateNum = currentDate.getDate();
      const hour = currentDate.getHours();
      const min = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      const currentSecondTime = hour * 3600 + min * 60 + second;
      let scriptContent = '';
      popupData.map((e, i) => {
        if (e.isTimer) {
          scriptContent = scriptContent + `
            document.getElementById("${e.triggerId}").style.display = "none";
          `;
        }
        if (e.cycle === 'day') {
          if (e.eventDetails.isAllDay) {
            scriptContent = scriptContent + `
              document.getElementById("${e.wrapperId}").style.display = "block";
            `;
          } else {
            const startTimeArray = e.eventDetails.startTime.split(':');
            const endTimeArray = e.eventDetails.endTime.split(':');
            const startHour = parseInt(startTimeArray[0], 10);
            const startMin = parseInt(startTimeArray[1], 10);
            const startSecond = parseInt(startTimeArray[2], 10);
            const endHour = parseInt(endTimeArray[0], 10);
            const endMin = parseInt(endTimeArray[1], 10);
            const endSecond = parseInt(endTimeArray[2], 10);
            const startSecondTime = startHour * 3600 + startMin * 60 + startSecond;
            const endSecondTime = endHour * 3600 + endMin * 60 + endSecond;

            if (currentSecondTime >= startSecondTime && currentSecondTime <= endSecondTime) {
              scriptContent = scriptContent + `
                document.getElementById("${e.wrapperId}").style.display = "block";
              `;
            }
          }
        }
        if (e.cycle === 'week') {
          if (e.eventDetails?.availableDays && e.eventDetails.availableDays[days[currentDay]]) {
            if (e.eventDetails.isAllDay) {
              scriptContent = scriptContent + `
                document.getElementById("${e.wrapperId}").style.display = "block";
              `;
            } else {
              const startTimeArray = e.eventDetails.startTime.split(':');
              const endTimeArray = e.eventDetails.endTime.split(':');
              const startHour = parseInt(startTimeArray[0], 10);
              const startMin = parseInt(startTimeArray[1], 10);
              const startSecond = parseInt(startTimeArray[2], 10);
              const endHour = parseInt(endTimeArray[0], 10);
              const endMin = parseInt(endTimeArray[1], 10);
              const endSecond = parseInt(endTimeArray[2], 10);
              const startSecondTime = startHour * 3600 + startMin * 60 + startSecond;
              const endSecondTime = endHour * 3600 + endMin * 60 + endSecond;

              if (currentSecondTime >= startSecondTime && currentSecondTime <= endSecondTime) {
                scriptContent = scriptContent + `
                  document.getElementById("${e.wrapperId}").style.display = "block";
                `;
              }
            }
          }
        }
        if (e.cycle === 'month') {
          if (e.eventDetails?.dateOfMonth && currentDateNum === e.eventDetails.dateOfMonth) {
            if (e.eventDetails.isAllDay) {
              scriptContent = scriptContent + `
                document.getElementById("${e.wrapperId}").style.display = "block";
              `;
            } else {
              const startTimeArray = e.eventDetails.startTime.split(':');
              const endTimeArray = e.eventDetails.endTime.split(':');
              const startHour = parseInt(startTimeArray[0], 10);
              const startMin = parseInt(startTimeArray[1], 10);
              const startSecond = parseInt(startTimeArray[2], 10);
              const endHour = parseInt(endTimeArray[0], 10);
              const endMin = parseInt(endTimeArray[1], 10);
              const endSecond = parseInt(endTimeArray[2], 10);
              const startSecondTime = startHour * 3600 + startMin * 60 + startSecond;
              const endSecondTime = endHour * 3600 + endMin * 60 + endSecond;

              if (currentSecondTime >= startSecondTime && currentSecondTime <= endSecondTime) {
                scriptContent = scriptContent + `
                  document.getElementById("${e.wrapperId}").style.display = "block";
                `;
              }
            }
          }
        }
      });
      setPageContent(`${pageContent}<script>${scriptContent}</script>`);
    }
  }, [popupData]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // Ensure iframe is fully loaded
    const onLoad = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

      // Event handler
      const clickHandler = (event) => {
        let target = event.target;

        // Check if the clicked element is your specific element
        if (target.matches('.addtocartbutton')) {
          // Handle the click event
          console.log('cart button clicked');
          let cartProducts = [];
          const newItem = storeRef.current?.webProducts?.values.find(item => item.id === target.getAttribute('productId'))
          const existingItem = storeRef.current?.cartProducts.find(item => item.product.id === newItem.id);
          if (existingItem) {
            cartProducts = storeRef.current?.cartProducts.map(item => item.product.id === newItem.id ? { ...item, count: item.count + 1 } : item);
          } else {
            cartProducts = [...storeRef.current?.cartProducts, { product: newItem, count: 1 }];
          }
          dispatch(updateCartProductsAction(cartProducts));
          setShowCartSidebar(true);
        }
        else if (target.matches('.shoppingcart') || target.matches('.shoppingcartDiv')) {
          setShowCartSidebar(true);
        }
      };

      // Attach event listener
      iframeDocument.addEventListener('click', clickHandler);

      // Cleanup
      return () => {
        iframeDocument.removeEventListener('click', clickHandler);
      };
    };

    iframe.addEventListener('load', onLoad);

    // Cleanup
    return () => {
      iframe.removeEventListener('load', onLoad);
    };
  }, [pageContent]);

  return (
    <>
      <Helmet>
        {
          pageInfo?.seoDetails && (
            <div>
                <title>{pageInfo?.seoDetails?.title}</title>
                <meta name="description" content={`${pageInfo?.seoDetails?.description}`} />
                <meta name="keywords" content={`${pageInfo?.seoDetails?.keywords}`} />
                <link rel="icon" href={`${pageInfo?.seoDetails?.socialImage}`} />
                <link rel="shortcut icon" href={`${pageInfo?.seoDetails?.socialImage}`} />
                <link rel="apple-touch-icon" href={`${pageInfo?.seoDetails?.socialImage}`} />
                <meta name="author" content={`${pageInfo?.seoDetails?.author}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${pageInfo?.seoDetails?.title}`} />
                <meta property="og:description" content={`${pageInfo?.seoDetails?.description}`} />
                <meta property="og:image" content={`${pageInfo?.seoDetails?.socialImage}`} />
                {store.linkUrl && <meta
                  property="og:url"
                  content={`/${store.linkUrl}/${id}/${pageInfo?.name}`}
                />}
                <meta property="og:site_name" content={`${pageInfo?.seoDetails?.title}`} />

                <meta name="twitter:title" content={`${pageInfo?.seoDetails?.title}`} />
                <meta name="twitter:description" content={`${pageInfo?.seoDetails?.description}`} />
                <meta name="twitter:image" content={`${pageInfo?.seoDetails?.socialImage}`} />
                {store.linkUrl && <meta
                  name="twitter:site"
                  content={`/${store.linkUrl}/${id}/${pageInfo?.name}`}
                />}
                <meta name="twitter:creator" content={`${pageInfo?.seoDetails?.twitter}`} />
                {pageInfo?.seoDetails?.headCode}
            </div>
          )
        }
      </Helmet>
      <div className='main'>
        {(!store.linkUrl || store.linkUrl === 'website') && pageContent &&
          <iframe srcDoc={pageContent} width={window.innerWidth} height={window.innerHeight} ref={iframeRef} />
        }
        <Cartsidebar store={store} showCartSidebar={showCartSidebar} setShowCartSidebar={setShowCartSidebar} />
        {store.linkUrl === 'preview' &&
          <div>
            <div className="down-navbar d-flex align-items-center justify-content-between bg-black" style={{ height: "50px", paddingLeft: '40%', paddingRight: "30px" }}>
              <div className="w-25 devices-icons d-flex justify-content-around align-items-center">
                <MdOutlineDesktopMac size={26} color={'white'} onClick={() => {
                  setWidth(window.innerWidth);
                }} />
                <MdOutlineTablet size={26} color={'white'} onClick={() => {
                  setWidth(992);
                }
                } />
                <BiMobile size={26} color={'white'} onClick={() => {
                  setWidth(480);
                }} />
              </div>
              <div className='d-flex align-items-center' style={{ width: '20%' }}>
                <span className='text-white'>W</span>
                <Input type="text" onChange={(e) => setWidth(e.target.value)} style={{ margin: '5px' }} />
                <span className='text-white'>Px</span>
              </div>
              <div className="text-white" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>Back to Editor</div>
            </div>
            <div className='bg-grey d-flex justify-content-around'>
              <iframe className="bg-white" width={width} height={window.innerHeight - 50} srcDoc={pageContent} ref={iframeRef} />

            </div>

          </div>
        }
      </div>
      {pageInfo?.seoDetails?.bodyCode}
    </>

  );
}