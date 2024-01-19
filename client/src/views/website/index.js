import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { Input, Spinner } from 'reactstrap'
import { Modal } from 'reactstrap';
import { getPreviewPageAction, getPublishPageAction, getPreviewBlogPageAction, getPublishBlogPageAction, updateThankyouProductsAction, updateSelectedProductAction, getWebCollectionsAction } from "../webBuilder/store/action";
import renderHTML from 'react-render-html';
import { BiMobile } from 'react-icons/bi';
import {Loader, LoaderOptions} from 'google-maps';
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
import { updateCartProductsAction, getProductDatasetAction, createDatasetAction, getWebConnectionValuesAction } from '../webBuilder/store/action';
import {setFormDatasetReducer} from '../webBuilder/store/reducer';
const days = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];
import { Helmet } from 'react-helmet';
import Cartsidebar from '../pages/cart/cartsidebar';

export default function Index() {
  const { id, pageName, blogId } = useParams();
  const { search } = useLocation();
// Iterating the search parameters
const searchParams = new URLSearchParams(search);
let paramKeys=[];
let paramValues=[];
for (const [key, value] of searchParams.entries()) {
  paramKeys.push(key);
  paramValues.push(value);
};
  const history = useHistory();
  const [pageContent, setPageContent] = useState();
  const [popupData, setPopupData] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [cartLink, setCartLink] = useState("");
  const [thankyouLink, setThankyouLink] = useState("");
  const [productLink, setProductLink] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [storeProducts, setStoreProducts] = useState({});
  const store = useSelector((state) => state.websiteEditor);
  const iframeRef = useRef(null);
  const storeRef = useRef(null);
  storeRef.current = store;
  const productRef = useRef();
  productRef.current = storeProducts;

  const setThankyouProducts = () => {
    const iframe = iframeRef.current;
    if (!iframe || !pageContent) return;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const cartItems = iframeDocument.querySelector('.product-lit');
    if(!cartItems) return;
    if (cartItems.childNodes.length > 0) {
      while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
      }
    }
    let sum = 0;
    storeRef.current?.thankyouProducts?.forEach((item) => {
      sum += item.product.price * item.count;
      const cartItem = document.createElement('div');
      cartItem.classList.add('product-item');
      // cartItem.setAttribute('productid', item.product.id);
      // Generate the HTML structure for the cart item
      cartItem.innerHTML = `
          <div class="product-img">
            <img src=${item.product.url} width="100" height="100" />
          </div>
          <div class="product-detail">
            <div class="product-name">${item.product.name}</div>
            <div class="product-price">${item.product.currency} ${item.product.price}</div>
          </div>
          <div class="product-qty">Qty: ${item.count}</div>
          <div class="product-total">${item.product.currency} ${item.product.price * item.count}</div>
        
        
      `;
      cartItems.appendChild(cartItem);
    });
    iframeDocument.querySelector('.subtotal-price').innerHTML = "USD " + sum;
    iframeDocument.querySelector('.total-price').innerHTML = "USD " + sum;
  }

  const setCartProducts = () => {
    const iframe = iframeRef.current;
    if (!iframe || !pageContent) return;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const cartItems = iframeDocument.querySelector('.cart-items');
    if(!cartItems) return;
    if (cartItems.childNodes.length > 0) {
      while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
      }
    }
    let sum = 0;
    storeRef.current?.cartProducts?.forEach((item) => {
      sum += item.product.price * item.count;
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.setAttribute('productid', item.product.id);
      // Generate the HTML structure for the cart item
      cartItem.innerHTML = `
        <img src="${item.product.url}" alt="Product" width="100" height="100">
        <div class="cart-item-details">
            <h3 class="product-name">${item.product.name}</h3>
            <p class="product-price">${item.product.currency}${item.product.price}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="decrement">-</button>
            <input type="text" class="quantity-input" value="${item.count}">
            <button class="increment">+</button>
        </div>
        <div class="cart-item-total">
            <p class="total-price">${item.product.currency}${(item.product.price * item.count).toString()}</p>
            <button class="remove-item">Remove</button>
        </div>
        <style>
        .cart-item {
            display: flex;
            align-items: center;
            margin-top: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            padding-bottom: 1rem;
        }
        
        .cart-item img {
            max-width: 100px;
            height: auto;
            margin-right: 1rem;
        }
        
        .product-name {
            font-size: 1.2rem;
            color: #333;
        }
        
        .product-price {
            font-size: 1rem;
            color: #333;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            margin-left: auto;
        }
        
        .quantity-input {
            width: 40px;
            text-align: center;
            border: 1px solid #333;
            border-radius: 4px;
            margin: 0 0.5rem;
            padding: 0.2rem;
            font-size: 1rem;
        }
        
        .increment,
        .decrement {
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
            padding: 0.2rem 0.5rem;
            font-size: 1rem;
            border-radius: 4px;
        }
        
        .cart-item-total {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-left: 1rem;
        }
        </style>
      `;
      cartItems.appendChild(cartItem);
    });
    iframeDocument.querySelector('.item-value').innerHTML = "USD " + sum;
    iframeDocument.querySelector('.total-value').innerHTML = "USD " + sum;
  }

  const setProduct = () => {
    const iframe = iframeRef.current;
    if (!iframe || !pageContent) return;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const productName = iframeDocument.querySelector('.product-name');
    productName.innerHTML = storeRef.current?.selectedProduct.name;
    const productPrice = iframeDocument.querySelector('.product-price');
    productPrice.innerHTML = storeRef.current?.selectedProduct.currency + " " + storeRef.current?.selectedProduct.price;
    const imgElement = iframeDocument.querySelector('.product-img');
    imgElement.setAttribute("src", storeRef.current?.selectedProduct.url);
  }

  const updateCart = (productId, value, remove = false) => {
    console.log(productId);
    let cartProducts = [];
    const index = storeRef.current?.cartProducts.findIndex((element) => element.product.id === productId);
    if (storeRef.current?.cartProducts[index].count == 1 && value == -1) return;
    if (remove) {
      cartProducts = [...store?.cartProducts?.slice(0, index), ...store?.cartProducts?.slice(index + 1)];
      dispatch(updateCartProductsAction(cartProducts));
    } else {
      cartProducts = store?.cartProducts.map((item, idx) => idx === index ? { ...item, count: (storeRef.current?.cartProducts[index].count + value) } : item);
      dispatch(updateCartProductsAction(cartProducts));
    }
  };

  function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
  }


  function filterByDistance(google, locationsToFilter, referencePoint, radius) {
    
    var j;
    var results = [];
    for (j = 0; j < locationsToFilter.length; j++) {
        var location = locationsToFilter[j];
        console.log('j', location)
        let R = 6378137;
        let dLat = degreesToRadians(parseFloat(location.lat) - referencePoint.lat());
        let dLong = degreesToRadians(parseFloat(location.lng) - referencePoint.lng());
        let a = Math.sin(dLat / 2)
                *
                Math.sin(dLat / 2) 
                +
                Math.cos(degreesToRadians(referencePoint.lat())) 
                * 
                Math.cos(degreesToRadians(referencePoint.lng())) 
                *
                Math.sin(dLong / 2) 
                * 
                Math.sin(dLong / 2);

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = R * c;
        if(distance<radius){
          location={...location, distance:distance*0.000621371192};
          results.push(location);
        }
    }
     
    return results;
  }

  useEffect(() => {
    if(store.webCollections) {
      store.webCollections.map((collection) => {
        if(collection.category == "store") {
          setStoreProducts(collection);
          return;
        }
      })
    }
  }, [store.webCollections])
  
  useEffect(() => {
    dispatch(getWebCollectionsAction(id));
    let name;
    if (pageName) {
      name = pageName;
    } else {
      name = "Home";
    };
    const payload = { id, pageName: name };
    const linkUrl = store.linkUrl;
    if (!linkUrl || linkUrl === 'website') {
      if (blogId) {
        const payload = { id, blogId };
        setIsPageLoading(true);
        dispatch(getPublishBlogPageAction(payload)).then((res) => {
          setPageContent(res);
          setIsPageLoading(false);
        });
      }
      else {
        let payload={id, pageName:name, pageViewed:false, totalViewed:false};
        setCartLink(`/website/${id}/Cart%20Page`);
        setThankyouLink(`/website/${id}/Thankyou%20Page`);
        setProductLink(`/website/${id}/Product%20Page`);
        setIsPageLoading(true);
        if(localStorage.getItem(name)){
          payload.pageViewed=true;
        }
        if(localStorage.getItem('totalViewed')){
          payload.totalViewed=true;
        }
        dispatch(getPublishPageAction(payload)).then((res) => {
          if(res){
            localStorage.setItem(name, 'true');
            localStorage.setItem('totalViewed','true');
            const parser = new DOMParser();
            let htmlCmp = parser.parseFromString(res.data, 'text/html');
            let linkElements = htmlCmp.getElementsByTagName('a');
            for (let i = 0; i < linkElements.length; i++) {
              let link_href = linkElements[i].getAttribute('href');
              if (link_href && !link_href.includes('mailto:') && !link_href.includes('tel:') && !link_href.includes('https') && !link_href.includes('http') && !link_href.includes('preview') && !link_href.includes('website')) {
                link_href = '/website' + link_href;
              }
              linkElements[i].setAttribute('href', link_href);
            };
            let ids=[];
            const repeaterEl=htmlCmp.querySelector('.repeater');
            if(repeaterEl){
              const componentId=repeaterEl.id;
              const repeaterItems=repeaterEl.children;
              const repeaterItem=repeaterItems[0];
              const clonerepeaterItem=repeaterItem.cloneNode(true);
              const connectedEls=repeaterItem.children;
              for(let i=0; i<connectedEls.length;i++){
                ids.push(connectedEls[i].id);
              }
              if(componentId!=''){
                const payload={
                  ids:ids
                }
                dispatch(getWebConnectionValuesAction(id, payload)).then((res)=>{
                  if(res){
                    const {connectedkeys, connectedvalues}=res.data;
                    if(paramKeys && paramKeys.length===1 && paramKeys[0]==='zipcode'){
                      const zipcode=paramValues[0];
                      const radius_m=15000000000000000;
                      const options={};
                      const loader = new Loader('AIzaSyBUSVulzSzbfl45dgmM8lWUQanfMz4Fb9o', options);     
                      loader.load().then(function (google){
                        var mapOptions = {
                          zoom: 14,
                          fullscreenControl: false,
                          clickableIcons: false,
                          mapTypeControl: false,
                          streetViewControl: false,
                          center: new google.maps.LatLng(37.7749295, -122.4194155)
                        };
                        const geocoder = new google.maps.Geocoder();
                        // const mapResult = new google.maps.Map(mapEl, mapOptions);
                        geocoder.geocode({ address: zipcode, componentRestrictions: { country: 'us' }} , function(results, status) {
                          if (status === google.maps.GeocoderStatus.OK){
                            if(results && results.length>0){
                              var filteredLocations = filterByDistance(google, connectedvalues, results[0].geometry.location, radius_m);
                              while (repeaterEl.firstChild) {
                                repeaterEl.firstChild.remove();
                              };
                              if(filteredLocations && filteredLocations.length>0){
                                for(let i=0; i<filteredLocations.length;i++){
                                  const filteredlocation=filteredLocations[i];
                                  let connectedItems=clonerepeaterItem.children;
                                  for(let j=0; j<(connectedItems.length); j++){
                                      const connectedkey=connectedkeys[j];
                                      let connectedItem=connectedItems[j];                      
                                      connectedItem.innerText=filteredlocation[connectedkey];
                                  };
                                  const item=clonerepeaterItem.cloneNode(true);
                                  repeaterEl.append(item);
                                }
                              }

                              var tmp = document.createElement("div");
                              tmp.append(htmlCmp.body)
                              setPageContent(tmp.innerHTML);
                              // const position = { position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}, map: mapResult };
                              // const marker = new google.maps.Marker(position);
                            }
                          }
                        });
                      });
                    }
                    else{
                      while (repeaterEl.firstChild) {
                        repeaterEl.firstChild.remove();
                      };
                      for(let i=0; i<connectedvalues.length;i++){
                        const connectedValue=connectedvalues[i];
                        let connectedItems=clonerepeaterItem.children;
                        for(let j=0; j<connectedItems.length; j++){
                            const connectedkey=connectedkeys[j];
                            let connectedItem=connectedItems[j];                      
                            connectedItem.innerText=connectedValue[connectedkey];
                        };
                        const item=clonerepeaterItem.cloneNode(true);
                        repeaterEl.append(item);
                      }
                      var tmp = document.createElement("div");
                      tmp.append(htmlCmp.body)
                      setPageContent(tmp.innerHTML);
                    }
                }
                })
              }
            }
            else{
              var tmp = document.createElement("div");
              tmp.append(htmlCmp.body)
              setPageContent(tmp.innerHTML);
            }
            setIsPageLoading(false);
            setPageInfo(res.pageInfo);
            setPopupData(res.pageInfo.popups || []);
          }
        });
      }
    }
    if (linkUrl === 'preview') {
      if (blogId) {
        const payload = { id, blogId };
        setIsPageLoading(true);
        dispatch(getPreviewBlogPageAction(payload)).then((res) => {
          setPageContent(res);
          setIsPageLoading(false);
        })
      }
      else {
        setCartLink(`/preview/${id}/Cart%20Page`);
        setThankyouLink(`/preview/${id}/Thankyou%20Page`);
        setProductLink(`/website/${id}/Product%20Page`);
        setIsPageLoading(true);
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
          setIsPageLoading(false);
          setPageInfo(res.pageInfo);
          setPopupData(res.pageInfo.popups || []);
        })
      }
    };

  }, [id, pageName, blogId]);

  useEffect(() => {
    if(pageName === "Cart%20Page" || pageName === "Cart Page") {
      setCartProducts();
    } else if(pageName === "Thankyou%20Page" || pageName === "Thankyou Page") {
      setThankyouProducts();
    } else if(pageName === "Product%20Page" || pageName === "Product Page") {
      setProduct();
    }
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
            if(itemsCountElement)
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
      const hour = currentDate.getHours();
      const min = currentDate.getMinutes();
      const second = currentDate.getSeconds();
      let scriptContent = '';
      setIsPageLoading(true);
      popupData.map((e, i) => {
        const startTime = e.startTime;
        const endTime = e.endTime;
        const cycle = e.cycle;
        const cycleDetails = e.cycleDetails;
        const triggerId = e.triggerId;
        const wrapperId = e.wrapperId;
        const currentTime = currentDate.getTime();

        if (startTime && new Date(startTime).getTime() <= currentTime && endTime && new Date(endTime).getTime() >= currentTime) {
          if (cycle === 'start_page') {
            scriptContent = `setTimeout(() => {
              document.getElementById("${wrapperId}").style.display = "block";
            }, ${cycleDetails.afterSeconds * 1000})`;
          }
  
          if (cycle === 'daily') {
            const time = cycleDetails.time;
            scriptContent = `
              document.getElementById("${triggerId}").style.display = "none";
              setInterval(() => {
                if (new Date().getHours() === parseInt("${time}".split(':')[0], 10) && new Date().getMinutes() === parseInt("${time}".split(':')[1], 10)) {
                  document.getElementById("${wrapperId}").style.display = "block";
                }
              }, 30000)`;
          }
  
          if (cycle === 'weekly') {
            const time = cycleDetails.time;
            const selectedDays = cycleDetails.days;
            let daysStr = '';
            days.map((day, i) => {
              if (selectedDays.indexOf(day) !== -1) {
                daysStr += selectedDays.indexOf(day);
              }
            });
            scriptContent = `
              document.getElementById("${triggerId}").style.display = "none";
              setInterval(() => {
                if ("${daysStr}".includes(new Date().getDay().toString()) && new Date().getHours() === parseInt("${time}".split(':')[0], 10) && new Date().getMinutes() === parseInt("${time}".split(':')[1], 10)) {
                  document.getElementById("${wrapperId}").style.display = "block";
                }
              }, 30000)`;
          }
  
          if (cycle === 'monthly') {
            const time = cycleDetails.time;
            const dates = cycleDetails.dates;
            scriptContent = `
              document.getElementById("${triggerId}").style.display = "none";
              setInterval(() => {
                if ("${dates}" === new Date().getDate().toString() && new Date().getHours() === parseInt("${time}".split(':')[0], 10) && new Date().getMinutes() === parseInt("${time}".split(':')[1], 10)) {
                  document.getElementById("${wrapperId}").style.display = "block";
                }
              }, 30000)`;
          }

          if (cycle === 'click_btn') {
            scriptContent = `document.getElementById("${triggerId}").style.display = "block";`
          }
        }
      });
      setPageContent(`${pageContent}<script>${scriptContent}</script>`);
      setIsPageLoading(false);
    }
  }, [popupData]);

  useEffect(() => {
    dispatch(getProductDatasetAction(id));
  }, [id]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // Ensure iframe is fully loaded
    const onLoad = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      
      if(pageName === "Cart%20Page" || pageName === "Cart Page") {
        setCartProducts();
      } else if(pageName === "Thankyou%20Page" || pageName === "Thankyou Page") {
        setThankyouProducts();
      } else if(pageName === "Product%20Page" || pageName === "Product Page") {
        setProduct();
      }

      const formHandler=(formId, _fields, _values, messageContainer)=>{
        let name;
        if (pageName) {
          name = pageName;
        }
        else {
          name = "Home";
        };
        const payload={
          websiteId:id,
          pageName:name,
          formId:formId,
          fields:_fields,
          values:_values
        };
        dispatch(createDatasetAction(payload)).then((res)=>{
          if(res){
            let tempDataset=store.formDataset;
            tempDataset=[...tempDataset, res];
            dispatch(setFormDatasetReducer(tempDataset));
            if(messageContainer){
              messageContainer.style.display='block';
            }
          }
        })
      }
      // Event handler
      const clickHandler = (event) => {
        let target = event.target;
        // Check if the clicked element is your specific element
        if (target.matches('.addtocartbutton')) {
          // Handle the click event
          console.log('cart button clicked');
          let cartProducts = [];
          const newItem = productRef.current?.values.find(item => item.id === target.getAttribute('productId'))
          const existingItem = storeRef.current?.cartProducts.find(item => item.product.id === newItem.id);
          if (existingItem) {
            cartProducts = storeRef.current?.cartProducts.map(item => item.product.id === newItem.id ? { ...item, count: item.count + 1 } : item);
          } else {
            cartProducts = [...storeRef.current?.cartProducts, { product: newItem, count: 1 }];
          }
          dispatch(updateCartProductsAction(cartProducts));
          setShowCartSidebar(true);
        } else if(target.matches('.product-item-cart')) {
          const quantity = parseInt(iframeDocument.querySelector('.product-quantity').value);
          let cartProducts = [];
          const existingItem = storeRef.current?.cartProducts.find(item => item.product.id === storeRef.current?.selectedProduct.id);
          if (existingItem) {
            cartProducts = storeRef.current?.cartProducts.map(item => item.product.id === storeRef.current?.selectedProduct.id ? { ...item, count: parseInt(item.count) + parseInt(quantity) } : item);
          } else {
            cartProducts = [...storeRef.current?.cartProducts, { product: storeRef.current?.selectedProduct, count: quantity }];
          }
          dispatch(updateCartProductsAction(cartProducts));
          setShowCartSidebar(true);
        } else if(target.matches('.product-cart')) {
          let cartProducts = [];
          const newItem = productRef.current?.values.find(item => item.id === target.parentElement.parentElement.getAttribute('productid'))
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
        else if(target.matches('.increment')) {
          updateCart(target.parentElement.parentElement.getAttribute('productid'), 1, false);
        } else if(target.matches('.decrement')) {
          updateCart(target.parentElement.parentElement.getAttribute('productid'), -1, false);
        } else if(target.matches('.remove-item')) {
          updateCart(target.parentElement.parentElement.getAttribute('productid'), 0, true);
        } else if(target.matches('.checkout-button')) {
          dispatch(updateThankyouProductsAction(storeRef.current?.cartProducts));
          dispatch(updateCartProductsAction([]));
          history.push(thankyouLink);
        } else if(target.matches('.product-img2') || target.matches('.quick-view')) {
          const selectedProduct = productRef.current?.values?.find((element) => element.id === target.parentElement.parentElement.parentElement.parentElement.getAttribute('productid'));
          dispatch(updateSelectedProductAction(selectedProduct));
          history.push(productLink);
        }
        else if(target.matches('.form-submit-link-element')){
        }
        else if(target.matches('.input-submit-element')){
          const formId=target.id;
          const submitContainer=target.parentElement.parentElement;
          const messageContainer=submitContainer.querySelector('.message');
          const parentContainer=target.parentElement.parentElement.parentElement.parentElement.parentElement;
          const childrenEls=parentContainer.children;
          let fields=[];
          let values=[];
          if(childrenEls.length>0){
             for(let i=0; i<childrenEls.length;i++){
              const childEl=childrenEls[i];
              if(childEl.matches('.birthday-element')){
                const _selectEl=childEl.getElementsByTagName('select')[0];
                const inputEls=childEl.getElementsByTagName('input');
                const month=_selectEl.value;
                const day=inputEls[0].value;
                const year=inputEls[1].value;
                const value=new Date(year, month-1, day);
                const name='birthday';
                const type='date';
                const required=true;
                fields.push({
                  type,
                  name,
                  required
                });
                values.push({
                  name,
                  value
                })
              }
              else if(childEl.matches('.dropdown-element')){
                const _selectEl=childEl.getElementsByTagName('select')[0];
                const id=_selectEl.id;
                const name=_selectEl.name;
                const type='select';
                const value=_selectEl.value;
                const required=_selectEl.required?true:false;
                fields.push({
                  id,
                  type,
                  name,
                  required
                });
                values.push({
                  id,
                  name,
                  value
                })

              }
              else if(childEl.matches('.single-choice-element')){
                const inputElements=childEl.getElementsByTagName('input');
                for(let j=0; j<inputElements.length;j++){
                  const _inputEl=inputElements[j];
                  if(_inputEl.checked){
                    const id=_inputEl.id;
                    const type=_inputEl.type;
                    const name=_inputEl.name;
                    const value=_inputEl.value;
                    fields.push({
                      id,
                      type,
                      name,
                    });
                    values.push({
                      id,
                      name,
                      value
                    })
                  }
                }
              }
              else if(childEl.matches('.multi-choice-element')){
                const inputElements=childEl.getElementsByTagName('input');
                let _values=[];
                let _names=[];
                let _ids=[];
                let _types=[];
                for(let j=0; j<inputElements.length;j++){
                  const _inputEl=inputElements[j];
                  if(_inputEl.checked){
                    const id=_inputEl.id;
                    const type=_inputEl.type;
                    const name=_inputEl.name;
                    const value=_inputEl.value;
                    _values.push(value);
                    _ids.push(id);
                    _names.push(name);
                    _types.push(type);
                  }
                }
                fields.push({
                  id:_ids,
                  type:_types,
                  name:_names
                });
                values.push({
                  id:_ids,
                  name:_names,
                  value:_values
                })
              }
              else{
                const inputElements=childEl.getElementsByTagName('input');
                if(inputElements.length>0){
                  const _inputEl=inputElements[0];
                  const id=_inputEl.id;
                  const value=_inputEl.value;
                  const type=_inputEl.type;
                  const name=_inputEl.name;
                  const placeholder=_inputEl.placeholder;
                  const required=_inputEl.required;
                  if(type!='button'){
                    fields.push({
                      id,
                      type,
                      name,
                      placeholder,
                      required
                    });
                    values.push({
                      id,
                      name,
                      value
                    })
                  }
                }
              }
             };
             const parentLinkEL=parentContainer.querySelector('.form-submit-link-element');
             const type=parentContainer.getAttribute('type');
             let requestParams='';
             if(type==='GET'){
              requestParams='/?';
              values && values.map((_field, i)=>{
                const param=_field.name+'='+_field.value;
                if(i===0){
                  requestParams+=param;
                }
                else{
                  requestParams+='&&'+param;
                }
              });
             };
             formHandler(formId, fields, values, messageContainer);
             if(parentLinkEL){
              parentLinkEL.href=parentLinkEL.href+requestParams;
             } 
          } 
        }
      };

      // Attach event listener
      iframeDocument.addEventListener('click', clickHandler);

      // Cleanup
      // return () => {
      //   iframeDocument.removeEventListener('click', clickHandler);
      // };
    };

    iframe.addEventListener('load', onLoad);

    // Cleanup
    // return () => {
    //   iframe.removeEventListener('load', onLoad);
    // };
  }, [pageContent]);

  window.onunload=()=>{
    let name;
    if (pageName) {
      name = pageName;
    }
    else {
      name = "Home";
    };
    localStorage.removeItem(name);
    localStorage.removeItem('totalViewed');
  }

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
      {isPageLoading ? <div className='loadingLayer'>
        <div className="d-flex  justify-content-center mb-2 mt-2" style={{ position: 'absolute', top: "50%", left: "50%", zIndex: 10 }}>
          <Spinner color="secondary">Loading...</Spinner>
        </div>
      </div> : <></>}
      <div className='main'>
        {(!store.linkUrl || store.linkUrl === 'website') && pageContent &&
          <iframe srcDoc={`<head><script
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1_opG1B7MRaTXYYy0B_fTPWg-RI3Mcs&libraries=places&callback=myMap"
            ></script></head>${pageContent}`} width={window.innerWidth} height={window.innerHeight} ref={iframeRef} />
        }
        <Cartsidebar store={store} showCartSidebar={showCartSidebar} setShowCartSidebar={setShowCartSidebar} cartLink={cartLink} />
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
            
              <iframe className="bg-white" width={width} height={window.innerHeight - 50} srcDoc={`<head><script
                  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1_opG1B7MRaTXYYy0B_fTPWg-RI3Mcs&libraries=places&callback=myMap"
                ></script></head>${pageContent}`} ref={iframeRef} />

            </div>

          </div>
        }
      </div>
      {pageInfo?.seoDetails?.bodyCode}
    </>

  );
}