import { toast } from 'react-toastify';
import * as api from './api';
import { setInvoiceListReducer } from './reducer';
// import { updateMembershipBuy } from '../../../shops/store/api';

/// ** PAYMENT ACTIONS
export const getStripeConfigAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getStripeConfig(payload);

    return data;
  } catch (error) { }
};

export const getStripeCustomerAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getStripeCustomer(payload);
    
    return data;
  } catch (error) { }
};
export const getStripeCustomerDetailsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.getStripeCustomerById(payload);
    
    return data;
  } catch (error) { }
};

export const createStripeSubscriptionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createStripeSubscription(payload);

    return data;
  } catch (error) { }
};
export const updateStripeDefaultPaymentMethodAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateStripeDefaultPaymentMethod(payload);

    return data;
  } catch (error) { }
};
export const detatchContactStripeCardAction = (paymentMethodId) => async (dispatch) => {
  try {
    const { data } = await api.detatchContactStripeCard(paymentMethodId);

    return data;
  } catch (error) { }
};

export const createNMITransactionAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createNMITransaction(payload);

    return data;
  } catch (error) { }
};

export const getStripeCustomerCardsAction = (customerId) => async (dispatch) => {
  try {
    const { data } = await api.getStripeCustomerCards(customerId);
    return data;
  } catch (error) { }
};

export const createStripePaymentIntentAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createIntent(payload);
    return data;
  } catch (error) { }
};


export const addPaymentToInvoiceAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateInvoicePayment(id, payload);
    if (data) {
      toast.success('payment done successfully!');
    }
  } catch (error) { }
};
// *** INVOICE ACTIONS
export const getInvoicesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getInvoices();
    if (data) {

      dispatch(setInvoiceListReducer(data))
    }
  } catch (error) { }
};
export const getInvoiceByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInvoiceById(id);

    if (data) {
      return data
    }
  } catch (error) { }
};
export const editInvoiceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editInvoice(payload);
    if (data) {
      toast.success('Invoice update  Successfully');
      dispatch(getInvoicesAction())
    }
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const deleteInvoiceAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteInvoiceById(id);
    if (data) {
      toast.success('Invoice deleted  Successfully');
      dispatch(getInvoicesAction())
    }
  } catch (error) {
    toast.error('Unable to delete invoice');
  }
};

export const addInvoiceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addInvoice(payload);
    if (payload.isMembership && payload.isMembership === true) {
      //save invoiceId
      // await updateMembershipBuy(payload.items[0].itemId, { invoiceId: data?.data?._id })
    }
    if (payload.sendInvoice === true) {
      let p = { title: '', message: '', invoiceId: data?.data?._id, recipient: payload.recipient }
      dispatch(sendInvoiceEmailAction(p))
    }
    if (data) {
      toast.success('New invoice Created Successfully');
      dispatch(getInvoicesAction())
    }
    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
  }
};
export const sendInvoiceEmailAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.sendInvoiceEmail(payload);
    if (data) {
      toast.success('Email send successfully');
      dispatch(getInvoicesAction())
    }
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};
export const forfeitInvoicePaymentAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.forfeitInvoicePayment(id,payload);
    if (data) {
      toast.success('Invoice update  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const refundCashInvoicePaymentAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.refundCashInvoicePayment(id,payload);
    if (data) {
      toast.success('Invoice update  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const refundCardInvoicePaymentAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.refundCardInvoicePayment(id,payload);
    if (data) {
      toast.success('Invoice update  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const updateCashPaymentAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.updateCashPayment(id,payload);
    if (data) {
      toast.success('Payment processed  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const updateCardPaymentAction = (id,payload,isPublic) => async (dispatch) => {
  try {
    const { data } = await api.updateCardPayment(id,payload,isPublic);
    if (data) {
      toast.success('Payment processed  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};
export const updateAllPaymentsAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.updateAllPayments(id,payload);
    if (data) {
      toast.success('Payments updated  Successfully');
      dispatch(getInvoicesAction())
    }
    return data
  } catch (error) {
    toast.error('Unable to update invoice');
  }
};




