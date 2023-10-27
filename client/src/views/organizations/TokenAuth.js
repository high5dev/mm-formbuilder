import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { getLocalStorageAction } from './store/action'
import { Spinner } from 'reactstrap'

export default function TokenAuth() {
    const {token} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getLocalStorageAction(token)).then(res=>{
          console.log(res)
          if(res && res === true){
            window.location.href = window.location.href.split('token')[0] 
          }
          else{
            window.location.href = 'https://me.mymanager.com/login'
            //window.location.href = '/login'
          }
           
        })
    },[])
  return (
    <div><Spinner color='primary'/></div>
  )
}
