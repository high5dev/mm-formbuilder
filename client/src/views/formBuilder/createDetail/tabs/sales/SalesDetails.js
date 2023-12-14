import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { getFormDataAction, getFormEntryDetailsAction } from '../../../store/action';
import moment from 'moment';

export default function SalesDetails({ row, open, toggle }) {
  return (
    <Modal isOpen={open} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>Form Details</ModalHeader>
      <ModalBody>
        <Row>
          <Col md="6">
            <table className="w-100">
              <tr>
                <td>Name</td>
                <td>
                  <Input type="text" value={row?.fullName} disabled />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <Input type="text" value={row?.email} disabled />
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <Input type="text" value={row?.phone} disabled />
                </td>
              </tr>
              <tr>
                <td>Date Of Birth</td>
                <td>
                  <Input type="text" value={moment(row?.dob).format('MM/DD/yyyy')} disabled />
                </td>
              </tr>
            </table>
          </Col>
         
        </Row>
        <hr/>
        <div>
          <h6>Addresses</h6>
          
        </div>
        <hr/>
        <Row>
        <Col md="6" className="border-start border-end">
            {row?.survey && row?.survey.length > 0 && (
              <div className="d-flex justify-content-between">
                <span>Survey</span>
                <span>{row?.survey[0]?.value}</span>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            {/* show waiver */}

            {row?.sugnature && row?.sugnature?.length > 0 && (
              <div className="d-flex justify-content-between">
                <span>Signature</span>

                <img src={row?.signature[0]?.url} className="w-75" />
              </div>
            )}
          </Col>
        </Row>
        
        <Row>
          <Col md="6">
            <div className="d-flex justify-content-between">
              <span>Address</span>
              <span>
                {row?.address?.street},{row?.address?.city},{row?.address?.state},
                {row?.address?.country},{row?.address?.zipCode}
              </span>
            </div>
          </Col>
          <Col md="6" className="border-start border-end">
            <div className="d-flex justify-content-between">
              <span>Shipping Address</span>
              <span>
                {row?.shippingAddress?.street},{row?.shippingAddress?.city},
                {row?.shippingAddress?.state},{row?.shippingAddress?.country},
                {row?.shippingAddress?.zip}
              </span>
            </div>
          </Col>
        </Row>
       
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <Button color="primary">Download</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
