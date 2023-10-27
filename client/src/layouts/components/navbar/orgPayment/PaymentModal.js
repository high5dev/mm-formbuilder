import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Checkout from './Checkout';
import PriceCard from './PriceCard';
// import {
//   createStripeSubscriptionAction,
//   getStripeConfigAction,
//   getStripeCustomerAction
// } from '../../../../views/finance/invoice/store/action';
import { getUserData } from '../../../../auth/utils';

export default function PaymentModal({ toggle, open, org, dispatch, plan, planDetails }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [customerId, setCustomerId] = useState();
  const [isYearly, setIsYearly] = useState(false);
  const user = getUserData();

  const handleCreateSubscription = async (isYearly) => {

    // let priceId = '';
    // if (isYearly === true) {
    //   setIsYearly(true);
    //   priceId = org?.planDetails[org?.planDetails.length - 1]?.stripe?.pricePerYear;
    // } else {
    //   setIsYearly(false);
    //   priceId = org?.planDetails[org?.planDetails.length - 1]?.stripe?.pricePerMonth;
    // }
    // const p = {
    //   customerId:customerId,
    //   priceId:priceId,
    //   userId:user.id,
    //   organizationId:org._id,
    //   subscriptionId:org.plan[org?.plan?.length - 1]._id
    // }

    // dispatch(createStripeSubscriptionAction(p)).then(res=>{
    //   setClientSecret(res.data.clientSecret);
    // setSubscriptionId(res.data.subscriptionId);
    // })
   
  };
  useEffect(() => {
    // dispatch(getStripeConfigAction()).then((res) => {
    //   setStripePromise(loadStripe(res.pk));
    //   if (plan.stripeSubscription) {
    //     setCustomerId(plan.stripeSubscription.customerId);
    //   } else {
    //     dispatch(getStripeCustomerAction({isUser:true,email:user.email,name:user.fullName})).then((data) => {
    //       setCustomerId(data.data.customerId);
    //     });
    //   }
    // });
  }, []);
  return (
    <Modal toggle={toggle} isOpen={open}>
      <ModalHeader toggle={toggle}>Your subscription has been over!</ModalHeader>
      <ModalBody>
        {subscriptionId === null && (
          <Row>
            <PriceCard
              item={planDetails}
              isYearly={false}
              CreateSubscription={handleCreateSubscription}
            />
            <PriceCard
              item={planDetails}
              isYearly={true}
              CreateSubscription={handleCreateSubscription}
            />
          </Row>
        )}
        {stripePromise && clientSecret && subscriptionId && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout
              customerId={customerId}
              subscriptionId={subscriptionId}
              subId={plan._id}
              toggle={toggle}
              dispatch={dispatch}
              isYearly={isYearly}
            />
          </Elements>
        )}
      </ModalBody>
    </Modal>
  );
}
