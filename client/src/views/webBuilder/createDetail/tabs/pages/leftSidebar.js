import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

export const Sidebar = () => {
    // ** STATE
    return (
        <div className="sidebar" style={{width: '260px', height: 'calc(100vh - 2rem)'}}>
            <div className="sidebar-content task-sidebar">
                <div className="task-app-menu">

                    <div className="create-workspace-btn m-1">
                       <h4 className={'text-center'}>PAGES</h4>
                    </div>

                    <ListGroup className={'mx-1 mt-2'}>
                        <ListGroupItem
                            active
                            tag="a"
                        >
                            Item 1
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                        >
                            Item 2
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                        >
                            Item 3
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </div>
            {/*<NewStepModal toggle={toggleNewStep} open={openNewStep} store={store} dispatch={dispatch} />*/}
        </div>
    );
}
