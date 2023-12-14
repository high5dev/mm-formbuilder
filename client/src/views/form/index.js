import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {getChildPreviewFormPageAction} from "../webBuilder/store/action";


export default function Index() {
  const {formId, formPageId}=useParams();
  const [pageContent, setPageContent]=useState();
  const dispatch=useDispatch();
  useEffect(()=>{
    const payload={
        id:formId,
        pageId:formPageId
    };
    dispatch(getChildPreviewFormPageAction(payload)).then((res)=>{
        setPageContent(res);
    })
  }, []);

  return (
    <>
      <div className='main'>
          <iframe srcDoc={pageContent} width={window.innerWidth} height={window.innerHeight}/>
      </div>
    </>
  )
}