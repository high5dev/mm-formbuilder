import React, { Fragment, useEffect, useState } from 'react';
import { Copy } from 'react-feather';
import { BsFillEyeFill } from 'react-icons/bs';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { cloneFormAction, createFormAction, deleteFormAction, getChildFormsAction } from '../../../store/action';

import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import EditModal from '../../../edit/EditModal';
import { getUserData } from '../../../../../auth/utils';
// import { getShopByUserAction } from '../../../../shops/store/action';

export default function StepTab({ store, step, dispatch, isMobileView, isTabletView }) {
  const organization = JSON.parse(localStorage.getItem('organization'));
  // ** STATES
  const [openEditor, setOpenEditor] = useState(false);
  const user = getUserData();
  // ** FUNCTIONS
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${store.form._id
      }&path=${step.path}`
    );
    toast.success('URL copied!');
  };

  const history = useHistory();
  // ** Toggle
  const toggleEditor = () => {
    localStorage.removeItem('gjsProject');
    history.push(`/webpages/editor/${store?.form._id}`);
  };

  const handleClone = () => {
    const payload = {
      userId: getUserData().id,
      name: store.form.name,
      memberType: store.form.memberType,
      automateEntry: store.form.automateEntry,
      smartList: store.form.smartList,
      subCategory: store.form.subCategory,
      formType: store.form.formType,
      formData: [...store.form.formData],
      clonedFrom: store.form._id,
      isTemplate: store.form.isTemplate
    };
    dispatch(cloneFormAction(payload)).then((res) => {
      history.push(`/form-funnel/form-setting/${res}`);
    });
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteForm = async () => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'When a Funnel deleted, it gets unaccessible. Are you sure you want to delete the funnel? ',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      dispatch(deleteFormAction(store.form._id));
      history.push('/form-funnel');
    }
  };

  useEffect(() => {
    dispatch(getChildFormsAction(store?.form?._id));
  }, []);
  return (
    <Fragment>
      <div className="m-1">
        <div className='form-data-table' style={{minHeight:'500px'}}>
        </div>
        <Row>
          <Col className="d-flex flex-row-reverse">
            {user.id === store?.form?.userId ? (
              <Button
                color="danger"
                onClick={handleDeleteForm}
                disabled={isMobileView || isTabletView}
              >
                REMOVE
              </Button>
            ) : null}

            <Button
              color="outline-primary"
              className="me-2"
              onClick={handleClone}
              disabled={isMobileView || isTabletView}
            >
              CLONE
            </Button>
            {user.id === store?.form?.userId ? (
              <Button
                color="primary"
                className="me-2"
                onClick={toggleEditor}
                disabled={isMobileView || isTabletView}
              >
                EDIT PAGE
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
      {store && step && openEditor && (
        <EditModal
          toggle={toggleEditor}
          open={openEditor}
          store={store}
          dispatch={dispatch}
          step={step}
        />
      )}
    </Fragment>
  );
}
