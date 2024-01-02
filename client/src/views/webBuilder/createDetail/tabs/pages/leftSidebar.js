import React, {useState} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {getUserData} from "../../../../../auth/utils";
import {Trash} from "react-feather";

export const Sidebar = ({active, setActive, dispatch, store}) => {

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
                                        active={active === x?.id}
                                        onClick={() => setActive(x?.id)}
                                        style={{cursor: 'pointer'}}
                                    >

                                        <div className="ws-name">
                                            <span> {x?.name}</span>
                                        </div>
                                        <div>
                                            {x?.name ? <Trash size={16}/> : 'No tab available'}
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
