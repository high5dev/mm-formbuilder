import React, {useState} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {getUserData} from "../../../../../auth/utils";
import {Trash} from "react-feather";
import { setCurrentPage, setFormReducer } from '../../../store/reducer';
import { deletePageAction } from '../../../store/action';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const Sidebar = ({active, setActive, dispatch, store}) => {
    const MySwal = withReactContent(Swal);
    const deletePage = async (pageId) => {
        const result = await MySwal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to delete the page? ',
            icon: 'danger',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-danger ms-1',
            },
            buttonsStyling: false,
        });
        if (result.value) {
            dispatch(deletePageAction(pageId)).then((res)=>{
                if(res){
                  const formData=store.form.formData.filter((_page)=>_page._id !== pageId);
                  const _form={
                    ...store.form,
                    formData:formData
                  };
                  dispatch(setFormReducer(_form));
                }
            })
        }
    }
    return (
        <div className="sidebar" style={{width: '260px', height: 'calc(100vh - 2rem)'}}>
            <div className="sidebar-content task-sidebar">
                <div className="task-app-menu">

                    <div className="create-workspace-btn m-1">
                        <h4 className={'text-center'}>PAGES</h4>
                    </div>

                    <ListGroup className={'mx-1 mt-2'}>
                        {store?.form &&
                            store?.form?.formData?.map((x, idx) => {
                                return (
                                    <ListGroupItem
                                        key={idx}
                                        active={active === x?._id}
                                        onClick={() => {
                                            setActive(x?._id);
                                            dispatch(setCurrentPage(x));
                                        }}
                                        style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-between'}}
                                    >

                                        <div className="ws-name">
                                            <span> {x?.name}</span>
                                        </div>
                                        <div>
                                            {x?.name ? <Trash size={16} onClick={() => {deletePage(x._id)}}/> : 'No tab available'}
                                        </div>
                                    </ListGroupItem>
                                );
                            })}
                    </ListGroup>
                </div>
            </div>
            {/*<NewStepModal toggle={toggleNewStep} open={openNewStep} store={store} dispatch={dispatch} />*/}
        </div>
    );
}
