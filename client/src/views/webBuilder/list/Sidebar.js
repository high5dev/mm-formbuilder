import React, { useContext, useState } from 'react';
import { Lock, MoreHorizontal, Plus, Users } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Badge, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { setToDefaultReducer } from '../store/reducer';
import { AbilityContext } from '../../../utility/context/Can';
import '../../../assets/styles/Status.scss';
import { AiOutlineAudit } from 'react-icons/ai';
import CreateFormModal from '../createForm/CreateFormModal';
import { getUserData } from '../../../auth/utils';

export default function Sidebar({
  active,
  setActive,
  dispatch,
  isMobileView,
  isTabletView,
  isDesktopView,
  store,
  formsCount
}) {
  const ability = useContext(AbilityContext);
  // ** STATES
  const [style, setStyle] = useState({ display: 'none' });
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const toggleCreateForm = () => setOpenCreateForm(!openCreateForm);

  const user=getUserData();

  return (
    <div className="sidebar h-100 border-end" style={{ minWidth: isMobileView ? '' : '260px' }}>
      <div className="sidebar-content ">
        <div className="task-app-menu ">
          <div className="create-workspace-btn p-1">
            <Button
              className="w-100"
              color="primary"
              block
              disabled={!ability.can('write', 'business/formsFunnels')}
              onClick={toggleCreateForm}
            >
              {ability.can('write', 'business/formsFunnels') ? (
                <Plus size={14} className="me-25" />
              ) : (
                <Lock size={14} className="me-25" />
              )}
              CREATE NEW
            </Button>
            {user?.userType === 'super-admin' && (
              <Button className='w-100 mt-2' color="primary">
                MANAGE ROlES
              </Button>
            )}
          </div>
          <ListGroup
            className="sidebar-menu-list formsnfunnels-tour-2"
            options={{ wheelPropagation: false }}
          >
            <ListGroup className="sidebar-menu-list pt-1" options={{ wheelPropagation: false }}>
              <ListGroupItem
                className="am-1"
                style={{ borderTopLeftRadius: 'unset' }}
                active={active === '1'}
                onClick={() => setActive('1')}
              >
                <div className="d-flex justify-content-between align-middle cursor-pointer">
                  <div className="ws-name">
                    <span>My Websites</span>
                  </div>
                  <Badge color="light-primary">{formsCount?.websites}</Badge>
                </div>
              </ListGroupItem>
              <ListGroupItem
                className="am-1"
                style={{ borderBottomLeftRadius: 'unset' }}
                onClick={() => setActive('2')}
                active={active === '2'}
              >
                <div className="d-flex justify-content-between align-middle cursor-pointer">
                  <div className="ws-name">
                    <span>Templates</span>
                  </div>
                  <Badge color="light-primary">{formsCount?.templates}</Badge>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </div>
        {/* <div className='pt-5'>
          <div className="px-1">
            <h6 className='text-secondary'>Categories</h6>
           
          </div>
        </div> */}
      </div>
      <CreateFormModal
        toggle={toggleCreateForm}
        open={openCreateForm}
        store={store}
        dispatch={dispatch}
      />
    </div>
  );
}
