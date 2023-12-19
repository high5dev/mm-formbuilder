import React, { Fragment, useEffect, useState } from 'react';
import { Edit, Plus } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { getUserData } from '../../../../auth/utils';

import TemplateContent from './TemplateContent';
import '../../../../../src/assets/styles/marketing.scss';
import { setTemplateData } from '../../../../utility/Utils';
import { setFormReducer } from '../../store/reducer';
import TemplatePreviewModal from './TemplatePreviewModal';
import { createFormAction, updateFormAction } from '../../store/action';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Pagination = ({ count, currentPage, handlePagination }) => {
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={count || 1}
      activeClassName="active"
      forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      onPageChange={(page) => handlePagination(page)}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
    />
  );
};
export default function Templates({
  store,
  dispatch,
  active,
  checkedCategoryData,
  categoryData,
  setCategoryData,
  template
}) {
  const [tableData, setTableData] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [displayData, setDisplayData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  const toggleOpenPreview = () => setOpenPreview(!openPreview);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  useEffect(() => {
    if (store?.templates && store?.templates.length > 0) {
      switch (active) {
        case '1':
          const newTableData0 =
            checkedCategoryData.length > 0
              ? store?.templates?.filter((x) => checkedCategoryData.includes(x.subCategory))
              : store?.templates;
          setTableData(newTableData0);

          const newCategoryData = Array.from(categoryData);
          if (newCategoryData.length) {
            newCategoryData.map((item) => {
              let temp = item;
              const count = store?.templates.filter((elem) => elem.subCategory === item._id).length;
              temp = { ...temp, count: count };
              return temp;
            });
          }
          setCategoryData(newCategoryData);

          break;
        case '2':
          const newTableData =
            checkedCategoryData.length > 0
              ? store?.templates?.filter(
                  (x) =>
                    x?.organizationId !== null &&
                    x?.organizationId !== undefined &&
                    checkedCategoryData.includes(x.subCategory)
                )
              : store?.templates?.filter(
                  (x) => x?.organizationId !== null && x?.organizationId !== undefined
                );
          setTableData(Array.from(newTableData));

          const newCategoryData1 = Array.from(categoryData);
          if (newCategoryData1.length) {
            newCategoryData1.map((item) => {
              let temp = item;
              const count = store?.templates
                ?.filter((x) => x?.organizationId !== null && x?.organizationId !== undefined)
                .filter((elem) => elem.subCategory === item._id).length;
              temp = { ...temp, count: count };
              return temp;
            });
          }
          setCategoryData(newCategoryData1);
          break;
        case '3':
          const newTableData1 =
            checkedCategoryData.length > 0
              ? store?.templates?.filter(
                  (x) =>
                    x?.userId === getUserData().id && checkedCategoryData.includes(x.subCategory)
                )
              : store?.templates?.filter((x) => x?.userId === getUserData().id);
          setTableData(Array.from(newTableData1));

          const newCategoryData2 = Array.from(categoryData);
          if (newCategoryData2.length) {
            newCategoryData2.map((item) => {
              let temp = item;
              const count = store?.templates
                ?.filter((x) => x?.userId === getUserData().id)
                .filter((elem) => elem.subCategory === item._id).length;
              temp = { ...temp, count: count };
              return temp;
            });
          }
          setCategoryData(newCategoryData2);
          break;
        default:
          const newTableData2 = Array.from(
            checkedCategoryData.length
              ? store?.templates?.filter((x) => checkedCategoryData.includes(x.subCategory))
              : store?.templates
          );
          setTableData(newTableData2);

          const newCategoryData3 = Array.from(categoryData);
          if (newCategoryData3.length) {
            newCategoryData3.map((item) => {
              let temp = item;
              const count = store?.templates.filter((elem) => elem.subCategory === item._id).length;
              temp = { ...temp, count: count };
              return temp;
            });
          }
          setCategoryData(newCategoryData3);

          break;
      }
    }
  }, [store?.templates, active, checkedCategoryData]);

  const handleSelectTemplate = (t) => {
    setSelectedTemplate(t);
    let payload = {
      ...t,
      clonedFrom: t._id,
      formData: t.formData,
      isTemplate: template ==='template'?true:false,
      name: store?.form?.name !== '' ? store?.form?.name : t.name,
      memberType: store?.form?.memberType !== '' ? store?.form?.memberType : t.memberType,
      formType: store?.form?.formType !== '' ? store?.form?.formType : t.formType,
    };

    delete payload._id;
    delete payload.userId;
    delete payload.organizationId;

    dispatch(updateFormAction(store?.form?._id, payload)).then(res=>{
      history.push(`/form-funnel/form-setting/${store?.form._id}`);
    })
    // dispatch(createFormAction(payload)).then((res) => {
    //   if (res._id) {
    //     history.push(`/form-funnel/form-setting/${res._id}`);
    //   }
    // });
  };

  const handleClickBlankTemplate = () => {
    setSelectedTemplate({ _id: 'blank' });
    dispatch(
      setFormReducer({
        ...store.form,
        clonedFrom: 'blank',
      })
    );
    let payload = { ...store?.form, clonedFrom: 'blank', isTemplate: template ==='template'?true:false, };
    delete payload._id;
    delete payload.userId;
    delete payload.organizationId;
    dispatch(updateFormAction(store?.form?._id, payload)).then(res=>{
      history.push(`/form-funnel/form-setting/${store?.form._id}`);
    })
    // dispatch(createFormAction({ ...store.form, clonedFrom: null, subCategory: null })).then(
    //   (res) => {
    //     if (res._id) {
    //       history.push(`/form-funnel/form-setting/${res._id}`);
    //     }
    //   }
    // );
  };

  const itemAddToFavorite = (templateItem) => {
    const newForms = Array.from(tableData);
    const newEmailTemplates = newForms.map((item) => {
      if (item._id === templateItem._id) {
        const newItem = { ...item };
        newItem.favorite = !newItem.favorite;
        return newItem;
      } else return item;
    });
    setTableData(newEmailTemplates);
  };

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      const temp = tableData.slice((currentPage - 1) * 8, currentPage * 8);
      setDisplayData(temp);
    }
  }, [tableData, currentPage]);

  return (
    <Fragment>
      <div className="">
        <Row spacing={2} className="p-0 m-0 mt-1">
          <Col xl={3} lg={4} md={4} sm={6} className="">
            <Card
              className={`${
                selectedTemplate?._id === 'blank' ? 'border border-primary' : 'border'
              } text-center`}
            >
              <CardBody>
                <img
                  className="img-fluid"
                  style={{ width: '120px', height: '180px' }}
                  src="/assets/images/blank-template.svg"
                  alt="Not authorized page"
                />
                <p className="text-capitalize" style={{ fontSize: '20px', marginBottom: '3px' }}>
                  <b>Blank Template</b>
                </p>
                <p style={{ fontSize: '16px' }}>Start from scratch</p>
                <div className="mt-1">
                  <Button
                    onClick={handleClickBlankTemplate}
                    className="d-flex m-auto align-items-center"
                    color="primary"
                  >
                    <Edit size={15} />
                    &nbsp;&nbsp;USE AS TEMPLATE
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          {displayData &&
            displayData.length > 0 &&
            displayData.map((item) => {
              return (
                <Col key={item._id} xl={3} lg={4} md={4} sm={6}>
                  <TemplateContent
                    item={item}
                    itemAddToFavorite={itemAddToFavorite}
                    handleSelectTemplate={handleSelectTemplate}
                    selectedTemplate={selectedTemplate}
                    togglePreview={toggleOpenPreview}
                    dispatch={dispatch}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
      {console.log(displayData)}
      <Pagination
        count={Math.ceil(tableData?.length / 8) || 1}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
      {selectedTemplate !== null && (
        <TemplatePreviewModal
          toggle={toggleOpenPreview}
          open={openPreview}
          template={selectedTemplate}
        />
      )}
    </Fragment>
  );
}
