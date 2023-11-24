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

const days = [
  'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
];

export default function Index() {
  const {id, pageName}=useParams();
  const history=useHistory();
  const [pageContent, setPageContent]=useState();
  const [popupData, setPopupData] = useState([]);
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
          setPopupData(res.pageInfo.popups || []);
      })
    }
    if(linkUrl === 'preview'){
      dispatch(getPreviewPageAction(payload)).then((res)=>{
          setPageContent(res.data);
          setPopupData(res.pageInfo.popups || []);
      })
    };
  }, []);

  useEffect(() =>{
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

  return (
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
  );
}