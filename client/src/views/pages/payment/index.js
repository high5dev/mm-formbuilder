import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, CardBody, Row } from 'reactstrap';

export default function PaymentResult() {


  const {status} = useParams()

  return (
    <div>
      {status === 'success' ? (
        <>
          <div className="text-center">
            <h6 className="text-center"> Thank You 😇</h6>
            <p className="text-center">
              Your Order has been placed!
            </p>
            <p className="text-center">
              We sent an email to you with your order
              confirmation and receipt.
            </p>
            <p className="text-center">
              If the email hasn't arrived within two minutes, please check your spam folder to see
              if the email was routed there.
            </p>
            <p className="text-center">⏰ Time placed : {moment().format('MM/DD/YYYY HH:mm A')}</p>
          </div>
          {/* <Row>
            <Col md="4">
              <Card>
                <CardBody>
                  <h6>Billed To</h6>
                  <p>{buyer?.fullName}</p>
                  <p>{email}</p>
                  <p>{buyer?.phone}</p>
                  <p>
                    {buyer?.address?.street} {buyer?.address?.city} {buyer?.address?.state}{' '}
                    {buyer?.address?.country} {buyer?.address?.zipCode}
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardBody>
                  <h6>Products</h6>
                  {products?.map((x, idx) => {
                    return (
                      <div key={idx}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <img src={x?.img} className="rounded" style={{ width: '200px' }} />
                          </div>
                          <div>
                            <p>{x?.name}</p>
                            <p>Brand: {x?.brand}</p>
                          </div>
                          <div>
                            <p>
                              {x?.qty} x {x?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <h6>Price Details</h6>
              <div className="d-flex justify-content-between">
                <p>Order Total</p>
                <p>{orderDetails?.total}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>{orderDetails?.paid}</p>
              </div>
            </Col>
          </Row> */}
        </>
      ) : (
        <>
         <div className='text-center'>
           <h6 className="text-center"> Oh no! 🥹</h6>
          <p>An error occured during processing your order</p>
          <p>
            We sent an email to you for your order.
            Please review and pay on your invoice.
          </p>
         </div>
        </>
      )}
    </div>
  );
}
