import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {Input} from 'reactstrap'
import { Modal } from 'reactstrap';
import {getPreviewPageAction, getPublishPageAction} from "../formBuilder/store/action";
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
import { Helmet } from 'react-helmet';

export default function Index() {
  const {id, pageName}=useParams();
  const history=useHistory();
  const [pageContent, setPageContent]=useState();
  const [pageInfo, setPageInfo] = useState();
  const dispatch=useDispatch();
  const [width, setWidth]=useState(window.innerWidth);
  const store=useSelector((state) => state.formEditor);
  useEffect(()=>{
    let name;
    if(pageName){
      name=pageName;
    }
    else{
      name="Home";  
    };
    const payload={id, pageName:name};
    const linkUrl=store.linkUrl;
    if(!linkUrl || linkUrl === 'website'){
      dispatch(getPublishPageAction(payload)).then((res)=>{
          setPageContent(res.data);
          setPageInfo(res.pageInfo);
      })
    }
    if(linkUrl === 'preview'){
      dispatch(getPreviewPageAction(payload)).then((res)=>{
          setPageContent(res.data);
          setPageInfo(res.pageInfo);
      })
    };
  }, []);

  return (
    <>
      {
        pageInfo?.seoDetails && (
          <>
            <Helmet>
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
              <meta
                property="og:url"
                content={`/${linkUrl}/${id}/${pageInfo?.name}`}
              />
              <meta property="og:site_name" content={`${pageInfo?.seoDetails?.title}`} />

              <meta name="twitter:title" content={`${pageInfo?.seoDetails?.title}`} />
              <meta name="twitter:description" content={`${pageInfo?.seoDetails?.description}`} />
              <meta name="twitter:image" content={`${pageInfo?.seoDetails?.socialImage}`} />
              <meta
                name="twitter:site"
                content={`/${linkUrl}/${id}/${pageInfo?.name}`}
              />
              <meta name="twitter:creator" content={`${pageInfo?.seoDetails?.twitter}`} />
              {pageInfo?.seoDetails?.headCode}
            </Helmet>
          </>
        )
      }
      <div className='main'>
        {(!store.linkUrl || store.linkUrl==='website') && pageContent &&
          <iframe srcDoc={pageContent} width={window.innerWidth} height={window.innerHeight}/>
        }
        {store.linkUrl==='preview' && 
        <div>
        <div className="down-navbar d-flex align-items-center justify-content-between bg-black" style={{height:"50px", paddingLeft:'40%', paddingRight:"30px"}}>
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
            <div className='d-flex align-items-center' style={{width:'20%'}}>
              <span className='text-white'>W</span>
              <Input type="text" onChange={(e)=>setWidth(e.target.value)} style={{margin:'5px'}}/>
              <span className='text-white'>Px</span>
            </div>
            <div className="text-white" onClick={()=>history.goBack()} style={{cursor:'pointer'}}>Back to Editor</div>
        </div>
        <div className='bg-grey d-flex justify-content-around'>
          <iframe className="bg-white" width={width} height={window.innerHeight-50} srcDoc={pageContent}/>
        </div>

        </div>
        }
      </div>
      {pageInfo?.seoDetails?.bodyCode}
    </>
    
  );
}