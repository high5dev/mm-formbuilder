import { React, useState, Fragment, useEffect, useRef } from 'react';
import { Button, Row, Col, Collapse, NavLink, Nav, NavItem } from 'reactstrap';
import Templates from '../template/Templates';
import { createFormAction } from '../../store/action';
import CategorySidebar from '../../CategorySidebar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PerfectScrollbar from "react-perfect-scrollbar"

export default function TemplateStep({ stepper, form, setForm, store, dispatch }) {
  const history = useHistory();
  const [active, setActive] = useState('1');
  const [collapse, setCollapse] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedCategoryData, setCheckedCategoryData] = useState([]);

  const handleCategoryCollapse = () => setCollapse(!collapse);

  const handleCreateForm = () => {
    dispatch(createFormAction(form)).then((res) => {
      history.push(`/form-funnel/form-setting/${store?.form?._id}`);
    });
  };
  return (
    <Fragment>
      <div
        className="d-flex flex-row select-funnel"
        // style={{ height: '74vh', overflowY: 'hidden' }}
        style={{ height: '70vh' }}
      >
        <PerfectScrollbar className="flex-1" options={{ wheelPropagation: true }}>
          <Collapse isOpen={!collapse} horizontal={true} delay={{ show: 50, hide: 50 }}>
            <CategorySidebar
              collapse={collapse}
              handleCategoryCollapse={handleCategoryCollapse}
              checkedCategoryData={checkedCategoryData}
              setCheckedCategoryData={setCheckedCategoryData}
              store={store}
              dispatch={dispatch}
              selectedType={form?.formType}
            />
          </Collapse>
          <Row
            className={`flex-1 border-start ${collapse ? 'w-100' : ''}`}
            style={{ minHeight: '100%' }}
          >
            <Col md="12" className="mb-1 p-0">
              <div className="d-flex align-items-end ms-1">
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
                      <span>My Organization</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={() => setActive('3')} active={active === '3'}>
                      <span>My Templates</span>
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
                    form={form}
                    setForm={setForm}
                    store={store}
                    active={active}
                    checkedCategoryData={checkedCategoryData}
                    categoryData={categoryData}
                    setCategoryData={setCategoryData}
                  />
                  <Row className="m-1 ">
                    <Col className="d-flex justify-content-between">
                      <div className="template-select p-1">
                        <Button color="primary" outline onClick={() => stepper.previous()}>
                          BACK
                        </Button>
                        <Button
                          color="primary"
                          onClick={handleCreateForm}
                          disabled={form.clonedFrom && form.name && form.subCategory ? false : true}
                        >
                          NEXT
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
}
