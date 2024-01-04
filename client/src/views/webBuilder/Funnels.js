import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Collapse } from 'reactstrap';

// ** CUSTOME COMPONENTS
import FunnelTable from './list/FunnelTable';
import Sidebar from './list/Sidebar';

import CategorySidebar from './CategorySidebar';

import 'shepherd.js/dist/css/shepherd.css';
import '@styles/react/libs/shepherd-tour/shepherd-tour.scss';
import { getFormCategoriesAction, getFormsAction, getWebsitesCountAction, getWebBuildersAction } from './store/action';
import { setAllFormsReducer } from './store/reducer';

export const Start = ({ startTour, setTourStarted, tourStarted, orderContactType, index }) => {
  useEffect(() => {
    if (orderContactType == 2 && index == '3') {
      setTourStarted(false);
    } else if (
      startTour &&
      !tourStarted &&
      (orderContactType != 2 || index == '2' || index == null)
    ) {
      startTour.start();
      setTourStarted(true);
    }
  }, [startTour, tourStarted, orderContactType, index]);

  return null;
};

export default function Funnels({
  active,
  setActive,
  dispatch,
  isMobileView,
  isTabletView,
  isDesktopView
}) {
  const store = useSelector((state) => state.websiteEditor);
  const formsCount=store.formsCount;
  const [collapse, setCollapse] = useState(false);
  const [categoryUpdate, setCategoryUpdate] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleCategoryCollapse = () => setCollapse(!collapse);

  // ** Tour
  // const tour = useContext(ShepherdTourContext);

  //Tours
  const [tourStarted, setTourStarted] = useState(false);
  const tour = useRef(null);

  useEffect(() => {
    if (tourStarted && tour.current) {
      tour.current.start();
    }
  }, [tourStarted]);

  useEffect(() => {
    dispatch(getFormCategoriesAction()).then((res) => {
      setCategoryData(res);
    });
    dispatch(getWebsitesCountAction());
  }, []);

  useEffect(() => {
    if (checkedCategoryData.length > 0) {
      setTableData(store?.funnels?.filter((x) => checkedCategoryData.includes(x.subCategory)));
    } else {
      setTableData(store?.funnels);
    }
  }, [checkedCategoryData]);

  useEffect(() => {
    switch (active) {
      case '1':
        setTableData([]);
        dispatch(setAllFormsReducer([]));
        break;
      case '2':
        setTableData([]);
        dispatch(setAllFormsReducer([]));
        dispatch(getFormsAction({ template: true, isDelete: false })).then((res) => {
          setTableData(res);
        });

        break;

      default:
        setTableData([]);
        dispatch(setAllFormsReducer([]));
        dispatch(getFormsAction({ template: false, isDelete: false })).then((res) => {
          setTableData(res);
        });
        break;
    }
  }, [active]);

  return (
    <div
      className={`${isMobileView ? '' : 'tasks-border'}`}
      style={{ minHeight: '75vh', background: '#fff' }}
    >
      <div style={{ width: isMobileView ? '' : isTabletView ? '40%' : '' }}>
        <Sidebar
          active={active}
          setActive={setActive}
          dispatch={dispatch}
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          isDesktopView={isDesktopView}
          store = {store}
          formsCount ={formsCount}
        />
      </div>
      <div
        className="d-flex flex-row flex-1 "
        style={{
          width: isMobileView ? '' : isTabletView ? '60%' : '80%'
        }}
      >
        {active === '2' && (
          <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 200, hide: 500 }}>
            <CategorySidebar
              collapse={collapse}
              handleCategoryCollapse={handleCategoryCollapse}
              checkedCategoryData={checkedCategoryData}
              setCheckedCategoryData={setCheckedCategoryData}
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
              store={store}
              dispatch={dispatch}
            />
          </Collapse>
        )}
        <FunnelTable
          categoryData={categoryData}
          checkedCategoryData={checkedCategoryData}
          tableData={tableData}
          active={active}
          dispatch={dispatch}
          handleCategoryCollapse={handleCategoryCollapse}
          collapse={collapse}
          isMobileView={isMobileView}
          isTabletView={isTabletView}
          isDesktopView={isDesktopView}
        />
      </div>
    </div>
  );
}
