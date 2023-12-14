import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  createStripePaymentIntentAction,
  getStripeConfigAction,
  getStripeCustomerAction
} from '../../../finance/invoice/store/action';
import Checkout from './Checkout';
//import PaymentTextImage from '../../../../finance/components/PaymentTextImage';

export default function PaymentModal({ open, toggle, form, formEntry, dispatch }) {
  const [accountId, setAccountId] = useState(false);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [payment, setPayment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (formEntry) {
      dispatch(getStripeConfigAction({ type: 'form', id: form._id })).then((res) => {
        if (res.accountId) {
          setAccountId(true);
          
          setStripePromise(loadStripe(res.pk, { stripeAccount: res.accountId }));
          dispatch(
            getStripeCustomerAction({
              name: formEntry?.fullName,
              email: formEntry?.email,
              stripeAccountId: res.accountId,
              addToContact: false
            })
          ).then((stripeCustomer) => {
            console.log("customer",stripeCustomer)
            if (stripeCustomer.data) {
              const payload = {
                amount: formEntry?.order?.total,
                currency: 'usd',
                customer: stripeCustomer.data.customerId,
                accountId: res.accountId
              };
              setPayment({
                amount: formEntry.order.total,
                currency: 'usd',
                customerId: stripeCustomer.data.customerId,
                accountId: res.accountId
              });
              dispatch(createStripePaymentIntentAction(payload)).then((result) => {
                setClientSecret(result);
                setIsLoading(false);
              });
              
             
            }
            else{
              const payload = {
                amount: formEntry?.order?.total,
                currency: 'usd',
                accountId: res.accountId
              };
              setPayment({
                amount: formEntry.order.total,
                currency: 'usd',
                accountId: res.accountId
              });
              dispatch(createStripePaymentIntentAction(payload)).then((result) => {
                setClientSecret(result);
                setIsLoading(false);
              });
            }
          });
        } else {
          setAccountId(false);
          setIsLoading(false);
        }
      });
    }
  }, [formEntry]);
  return (
    <Modal isOpen={open} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Make Payment</ModalHeader>
      <ModalBody>
        <div>
          {isLoading === true ? (
            <div className="text-center d-flex justify-content-middle">
              <Spinner color="primary" /> Loading
            </div>
          ) : (
            <>
              {stripePromise && clientSecret && accountId === true ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <Checkout
                    form={form}
                    formEntry={formEntry}
                    payment={payment}
                    dispatch={dispatch}
                    toggle={toggle}
                  />
                </Elements>
              ) : (
                // <PaymentTextImage />
                <></>
              )}
            </>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}
