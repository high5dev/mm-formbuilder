import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Modal } from 'reactstrap';
import {getPublishPageAction} from "../formBuilder/store/action";
import renderHTML from 'react-render-html';
export default function Index() {
  const {id, pageName}=useParams();
  const [pageContent, setPageContent]=useState();
  const dispatch=useDispatch();
  useEffect(()=>{
    let name;
    if(pageName){
      name=pageName;
    }
    else{
      name="Home";  
    };
    const payload={id, pageName:name};
    dispatch(getPublishPageAction(payload)).then((res)=>{
        setPageContent(res);
    })

  }, []);
  return (
    <div className='main-body'>
        {pageContent && renderHTML(pageContent)}
    </div>
  );
}