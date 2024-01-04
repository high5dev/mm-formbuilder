// React component
import { React, useState, Fragment, useEffect, useRef } from 'react';
import { Button, Row, Col, Collapse, NavLink, Nav, NavItem, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import { ChevronRight } from 'react-feather';
// custom import
import Templates from './template/Templates';
import CategorySidebar from '../CategorySidebar';

import { getWebBuilderTemplatesAction } from '../store/action';
import PerfectScrollbar from 'react-perfect-scrollbar';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import BreadCrumbs from '@components/breadcrumbs';
import { getUserData } from '../../../auth/utils';

export const Start = ({ startTour, setTourStarted, tourStarted, index }) => {
  useEffect(() => {
    if (index !== 1) {
      setTourStarted(false);
    } else if (startTour && !tourStarted) {
      startTour.start();
      setTourStarted(true);
    }
  }, [startTour, tourStarted, index]);

  
  return null;
};

const SelectTemplate = () => {
  const store = useSelector((state) => state.websiteEditor);
  const dispatch = useDispatch();
  const { type, template,id } = useParams();
  const history = useHistory();

  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);

  //Tours
  const [tourStarted, setTourStarted] = useState(false);
  const tour = useRef(null);

  useEffect(() => {
    if (tourStarted && tour.current) {
      tour.current.start();
    }
  }, [tourStarted]);
  useEffect(()=>{
    dispatch(getWebBuilderTemplatesAction())
    
  },[])

  useEffect(() => {
    if (store?.templates) {
      if (type) {
        setCategoryData(store?.templates?.filter((x) => x.formType === type));
      } else {
        setCategoryData(store?.templates);
      }
    }
  }, [store?.templates, type]);


  const handleCategoryCollapse = () => setCollapse(!collapse);

  return (
    <div>
      <BreadCrumbs
        breadCrumbTitle="Business Tools"
        breadCrumbParent="Business Tools"
        breadCrumbActive="Create Design"
      />
      <Card>
        <div
          className="d-flex flex-row select-funnel"
          // style={{ height: '74vh', overflowY: 'hidden' }}
          style={{ height: '75vh' }}
        >
          <PerfectScrollbar className="flex-1" options={{ wheelPropagation: true }}>
            <Collapse
              isOpen={!collapse}
              horizontal={true}
              className=""
              //delay={{ show: 50, hide: 50 }}
            >
              <CategorySidebar
                collapse={collapse}
                handleCategoryCollapse={handleCategoryCollapse}
                checkedCategoryData={checkedCategoryData}
                setCheckedCategoryData={setCheckedCategoryData}
                store={store}
                dispatch={dispatch}
                selectedType={type}
              />
            </Collapse>
            <Row
              className={`flex-1 border-start ${collapse ? 'w-100' : ''}`}
              style={{ minHeight: '100%' }}
            >
              <Col md="12" className="mb-1 p-0">
                <div className="d-flex align-items-center ms-1 mt-50">
                  {collapse && (
                    <div className="btn-collapse-wrapper pe-1 mb-1">
                      <Button
                        className="btn-icon btn btn-flat-dark btn-sm btn-toggle-sidebar"
                        color="flat-dark"
                        onClick={handleCategoryCollapse}
                      >
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  )}
                  <Nav tabs>
                    <NavItem>
                      <NavLink onClick={() => setActive('1')} active={active === '1'}>
                        <span>All Templates</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => setActive('2')} active={active === '2'}>
                        <span>By {getUserData()?.organizations[0]?.name}</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={() => setActive('3')} active={active === '3'}>
                        <span>By Username</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <div className="w-100 d-flex justify-content-between border-top">
                  <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                    <div className="content-header p-1 mb-0">
                      <h5 className="mb-0">Select a template </h5>
                      <small>Select a template for your funnel or start from blank</small>
                    </div>
                    <Templates
                      store={store}
                      active={active}
                      checkedCategoryData={checkedCategoryData}
                      categoryData={categoryData}
                      setCategoryData={setCategoryData}
                      dispatch={dispatch}
                      template = {template}
                    />  
                  </div>
                </div>
              </Col>
            </Row>
          </PerfectScrollbar>
        </div>
      </Card>
    </div>
  );
};

export default SelectTemplate;
