import React, { useState, useEffect } from 'react';
import { Lock, Plus, Trash, X } from 'react-feather';
import { useParams } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { updateFormDataAction, getChildFormsAction } from '../../../store/action';
import NewStepModal from './NewStepModal';
import { getUserData } from '../../../../../auth/utils';

export default function Sidebar({ active, setActive, dispatch, store }) {
  // ** STATE
  const [openNewStep, setOpenNewStep] = useState(false);
  const [style, setStyle] = useState('0');

  const user = getUserData();
  const { id } = useParams();
  // ** TOGGLERS
  const toggleNewStep = () => setOpenNewStep(!openNewStep);

  const mySwal = withReactContent(Swal);

  const handleDeleteStep = async (e, stepId) => {
    e.stopPropagation();
    const res = await mySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this step in funnel?',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      let formData = store.form.formData;
      formData = formData.filter((x) => x.id !== stepId);

      dispatch(updateFormDataAction(id, { formData: formData }));
    }
  };

  useEffect(() => {
    dispatch(getChildFormsAction(store?.form?._id)).then((res)=>{
      if(res && res.length){
        setActive(res[0]._id)
      }
    });
  }, []);
  return (
    <div style={{ minWidth: '260px', height: 'calc(100vh - 2rem)', border:'1px solid #ebe9f1' }}>
      <div className='sidebar-title d-flex justify-content-around' style={{paddingTop:'15px', paddingLeft:'15px'}}>
        <h4>Forms</h4>
      </div>
      <div className="sidebar-content task-sidebar">
        {
          store?.childForms.length>0 ?            
          <ListGroup options={{ wheelPropagation: false }}>
          {
            store?.childForms?.map((x, idx) => {
              return (
                <ListGroupItem
                  key={idx}
                  active={active === x._id}
                  onMouseEnter={() => {
                    setStyle(x._id);
                  }}
                  onMouseLeave={() => {
                    setStyle('0');
                  }}
                  onClick={() => {
                    setActive(x._id)

                  }}
                  style={{ cursor: 'pointer', padding:'10px', paddingLeft:'0px' }}
                >
                  <div
                    className={`d-flex justify-content-between align-middle px-2 ${
                      active === x._id ? ' border-start-primary border-2' : ' border-none'
                    }`}
                  >
                    <div className="ws-name">
                      <span> {x.name}</span>
                    </div>
                    <div className={`${style === x._id ? 'd-block' : 'd-none'} text-secondary`}>
                      {user.id === store?.form?.userId ? (
                        <Trash size={16} onClick={(e) => handleDeleteStep(e, x._id)} />
                      ) : (
                        <Lock size={14} className="text-muted" />
                      )}
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
        </ListGroup>:
        <div className='text-center mt-4'>No forms available</div>
        }

      </div>
    </div>
  );
}
