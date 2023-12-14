import React, { useContext, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button, Form } from 'reactstrap';
import { addFormEntryAction, sendEmailToUserAction, sendInvoiceAction } from '../../../store/action';
import { toast } from 'react-toastify';
import { SocketContext } from '../../../../../utility/context/Socket';

export default function Checkout({ form, formEntry, dispatch, toggle , payment}) {
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsPrcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsPrcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirm/invoice`
      },
      redirect: 'if_required'
    });
    if (error) {
      setMessage(error.message);
      dispatch(addFormEntryAction(form._id,formEntry)).then(res=>{
        socket.emit("mybuilderLeads",{message:`You have new sales from ${form?.name}`,formId:form?._id, title:"sales"})
        dispatch(sendEmailToUserAction({id:res.data._id,type:'lead'}))
      })
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage(`Payment ${paymentIntent.status} 🎉`);
      let payload = {
        ...formEntry,
        payment: {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          status: 'paid',
          currency: paymentIntent.currency,
          paymentMethod: paymentIntent.payment_method,
          date: new Date(),
          customerId: payment.customerId,
          accountId:payment.accountId,
        }
      };
      dispatch(addFormEntryAction(form._id,payload)).then(res=>{
        if (res?.success === true) {
            // go to submitForm
            socket.emit("mybuilderLeads",{message:`You have new sales from ${form?.name}`,formId:form?._id, title:"sales"})
            dispatch(sendInvoiceAction({payment:res.data.payment,formId:res.data._id}))
            dispatch(sendEmailToUserAction({id:res.data._id,type:'sales'}))
            toggle()
            window.location.href = `/web-preview/submitted/${form._id}`;
          } else {
            toast.error('Something went wrong! Please try again!');
          }
      })
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} id="payment-form">
        <PaymentElement />
        <Button color="primary" className="mt-1 w-100">
          <span>{isProcessing ? 'Processing...' : 'Place Order'}</span>
        </Button>
        <p> {message}</p>
      </Form>
    </>
  );
}
