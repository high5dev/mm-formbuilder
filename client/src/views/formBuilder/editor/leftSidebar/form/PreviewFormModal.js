import React, { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '@src/assets/styles/form-builder.scss';
import {getChildPreviewFormPageAction} from '../../../store/action';
import {X} from 'react-feather';

export default function Index({store, toggle, currentFormPage}) {
  const dispatch=useDispatch();
  const [pageContent, setPageContent]=useState();
  const [height, setHeight] = React.useState("0px");
  const ref = useRef();
  const resizeIframe=(obj) => {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
  const onLoad = () => {
    setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
  };
  useEffect(()=>{
    const formId=store.childForm._id;
    const payload={
        id:formId,
        pageId:currentFormPage._id
    };
    dispatch(getChildPreviewFormPageAction(payload)).then((res)=>{
        setPageContent(res);
    })
  }, []);

  return (
    <div className='d-flex justify-content-around mt-5'>
      <div style={{border:'1px solid lightgray  '}}>
        <div className="p-1 d-flex justify-content-end">
              <div className="text-primary cursor-pointer" onClick={(e)=>toggle(false)}>
                Back to Editor
              </div>
        </div>
        <div className='d-flex justify-content-around' >
            <iframe ref={ref} srcDoc={pageContent} width={500} onLoad={onLoad}  height={height}/>
        </div>
      </div>
    </div>
    
  );
}
