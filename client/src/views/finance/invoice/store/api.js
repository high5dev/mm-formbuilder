import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

//--------- all payment apis for the whole app
export const getStripeConfig = (payload) => {
  return API.get('/payment/stripe/config', { params: payload });
};
export const createIntent = (payload) => {
  return API.post('/payment/stripe/payment-intent', payload);
};

export const getStripeCustomer = (payload) => {
  return API.post('/payment/stripe/customer', payload);
};
export const getStripeCustomerById = (payload) => {
  return API.get(`/payment/stripe/customer-details`,{params:payload});
};
export const updateStripeDefaultPaymentMethod = (payload) => {
  return API.put('/payment/stripe/default-payment', payload);
};
export const detatchContactStripeCard = (paymentMethodId) => {
  return API.delete(`/payment/card/${paymentMethodId}`);
};

export const getStripeCustomerCards = (customerId) => {
  //customerId is stripe customerId
  return API.get(`/payment/stripe/cards/${customerId}`);
};

//only for organization
export const createStripeSubscription = (payload) => {
  return API.post('/payment/stripe/subscription', payload);
};

export const createNMITransaction = (payload) => {
  return API.post('/payment/nmi/transaction', payload);
}

//------- invoice apis
export const getInvoices = () => {
  return API.get('/invoice');
};
export const getInvoiceById = (id) => {
  return API.get(`/invoice/${id}`);
};
export const addInvoice = (payload) => {
  return API.post('/invoice', payload);
};
export const editInvoice = (payload) => {
  return API.patch(`/invoice/${payload._id}`, payload);
};

export const updateInvoicePayment = (id, payload) => {
  return API.put(`/invoice/${id}`, payload);
};
export const deleteInvoiceById = (id) => {
  return API.delete(`/invoice/${id}`);
};
export const sendInvoiceEmail = (payload) => {
  return API.post(`/invoice/send-email`, payload);
};
export const forfeitInvoicePayment = (id, payload) => {
  return API.put(`/invoice/forfeit-payment/${id}`, payload);
};
export const refundCashInvoicePayment = (id, payload) => {
  return API.put(`/invoice/refund-cash-payment/${id}`, payload);
};
export const refundCardInvoicePayment = (id, payload) => {
  return API.put(`/invoice/refund-card-payment/${id}`, payload);
};
export const updateCashPayment = (id, payload) => {
  return API.put(`/invoice/update-cash-payment/${id}`, payload);
};
export const updateCardPayment = (id, payload,isPublic) => {
  return isPublic===true? API.put(`/invoice/update-public-card-payment/${id}`, payload): API.put(`/invoice/update-card-payment/${id}`, payload);
};
export const updateAllPayments = (id, payload) => {
  return API.put(`/invoice/update-all-payments/${id}`, payload);
};

