import React from 'react';
import { BsUiChecks } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../../../../../assets/styles/Status.scss';
import { GrDocumentText, GrDocumentTxt } from 'react-icons/gr';
import { FcDocument } from 'react-icons/fc';
import { File } from 'react-feather';

export default function Sidebar({ active, setActive, store, isTabletView }) {
  return (
    <div
      className="sidebar"
      style={{ maxWidth: isTabletView ? '150px' : '260px', height: 'calc(100vh - 2rem)' }}
    >
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <h4
              className="text-center p-1"
              style={{ fontWeight: '700', fontSize: '18px', marginBottom: '0px' }}
            >
              <span style={{ float: 'left' }}>
                <File size={18} style={{ color: '#5e5873' }} />
              </span>
              {store?.form?.name}
            </h4>
            <hr style={{ margin: '0px' }}></hr>
            <ListGroup className="sidebar-menu-list pt-1" options={{ wheelPropagation: false }}>
              <ListGroupItem
                className="am-1 p-1"
                active={active === '1'}
                onClick={() => setActive('1')}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">OVERVIEW</span>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                className="am-1 p-1"
                active={active === '2'}
                onClick={() => setActive('2')}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">SEO</span>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                className="am-1 p-1"
                active={active === '3'}
                onClick={() => setActive('3')}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Connect Domain</span>
                  </div>
                </div>
              </ListGroupItem>
              {/* <ListGroupItem active={active === '3'} onClick={() => setActive('3')}>
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">FACEBOOK PIXEL</span>
                  </div>
                </div>
              </ListGroupItem> */}
            </ListGroup>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
