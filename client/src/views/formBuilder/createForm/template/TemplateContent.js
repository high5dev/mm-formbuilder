import { Button } from 'reactstrap';
import React, { useState } from 'react';
import { Card, Modal, CardBody, ModalHeader, ModalBody } from 'reactstrap';
import { FaHeart } from 'react-icons/fa';
import { Heart } from 'react-feather';
const bootstrapClass =
  '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
const TemplateContent = ({
  item,
  itemAddToFavorite,
  handleSelectTemplate,
  selectedTemplate,
  togglePreview,
  dispatch
}) => {
  return (
    <>
      {item !== undefined && item.formData !== undefined && (
        <Card
          className={`${
            selectedTemplate?._id === item?._id ? 'border border-primary' : 'border'
          } template-item-card`}
        >
          <div className="p-0">
            <div className="p-50">
              <div className="d-flex justify-content-between">
                <p style={{ fontSize: '16px' }} className="m-0 p-0">
                  <b>{item?.name}</b>
                </p>
                {item?.favorite && <FaHeart size={20} className="text-danger" />}
              </div>
            </div>

            {/* <iframe
                scrolling="no"
                className="shadow-sm"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  border: 'none',
                  height: '280px',
                 // borderRadius: 10
                }}
                //key={item &&item?.formData!==undefined && item?.formData?.length>0 && item?.formData[0]?.html?.length}
                src={
                  item &&
                  item?.formData !== undefined &&
                  Array.isArray(item?.formData) &&
                  item?.formData?.length > 0 &&
                  item?.formData[0]?.html !== ''
                    ? `/web-preview/${item._id}&path=${item?.formData[0]?.path}`
                    : `/logo.html`
                }
              /> */}
            <iframe
              scrolling="no"
              className="shadow-sm"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                border: 'none',
                height: '280px'
                // borderRadius: 10
              }}
              //key={item &&item?.formData!==undefined && item?.formData?.length>0 && item?.formData[0]?.html?.length}
              srcDoc={
                bootstrapClass +
                item?.formData[0]?.html +
                '<style>' +
                item?.formData[0]?.css +
                '</style>'
              }
              title="Customized Form"
            />
            <div className="template-btn-group p-1 d-flex justify-content-center">
              <div className="shadow-lg rounded p-1 d-flex justify-content-between flex-column gap-2">
                <Button
                  color="success"
                  className="text-capitalize py-2"
                  onClick={() => handleSelectTemplate(item)}
                >
                  Use as Template
                </Button>
                <Button
                  color="primary"
                  className="text-capitalize py-2"
                  onClick={() => {
                    handleSelectTemplate(item);
                    togglePreview();
                  }}
                >
                  View
                </Button>
                <Button
                  color="light"
                  className="text-capitalize py-2"
                  onClick={() => itemAddToFavorite(item)}
                >
                  <FaHeart size={18} />
                  &nbsp;&nbsp;Add to favorites
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default TemplateContent;
