import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  addFormEntryAction,
  addLeadAction,
  getFormDataAction,
  getFormEntryDetailsAction,
  sendEmailToUserAction,
  updateFormEntryAction
} from '../store/action';
//import { b64toBlob } from '../../documents/helpers/loadPdfHelper';
import { useUploadSignature } from '../../../requests/documents/recipient-doc';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { Briefcase, Check, Home, X } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { selectThemeColors } from '@utils';


import PaymentModal from './previewElements/stripePayment/PaymentModal';

import { SocketContext } from '../../../utility/context/Socket';
import { toast } from 'react-toastify';

export default function Preview() {
  const socket = useContext(SocketContext)
  // ** STATES
  const [surveys, setSurveys] = useState([]);
  const [products, setProducts] = useState([]);
  const [formEntry, setFormEntry] = useState();
  const [members, setMembers] = useState([]);
  const [total, setTotal] = useState(null);

  const [isBuyProduct, setIsBuyProduct] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const { id, path } = useParams();
  const store = useSelector((state) => state.formEditor);

  const dispatch = useDispatch();

  const toggleOpenPayment = () => setOpenPayment(!openPayment);

  const setPayload = () => {
    var payload = {};
    let tempMembers = [];

    const inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
      const index = input.name.includes('participant') && input.name.split('-')[1];

      let member = { index: index };
      if (tempMembers.filter((x) => x.index === index.toString()).length > 0) {
        member = tempMembers.find((x) => x.index === index.toString());
      }
      switch (input.getAttribute('selectedtype')) {
        case 'fullname':
          member = { ...member, fullName: input.value };
          break;
        case 'email':
          member = { ...member, email: input.value };
          break;
        case 'phone':
          member = { ...member, phone: input.value };
          break;
        case 'type':
          member = { ...member, type: input.value };
          break;
        case 'birthday':
          member = { ...member, dob: new Date(input.value) };
          break;
        case 'street':
          member = { ...member, address: { ...member.address, street: input.value } };
          break;
        case 'city':
          member = { ...member, address: { ...member.address, city: input.value } };
          break;
        case 'state':
          member = { ...member, address: { ...member.address, state: input.value } };
          break;
        case 'country':
          member = { ...member, address: { ...member.address, country: input.value } };
          break;
        case 'zip':
          member = { ...member, address: { ...member.address, zipCode: input.value } };
          break;
        case 'billing-fullname':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, fullName: input.value }
          };
          break;
        case 'billing-email':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, email: input.value }
          };
          break;
        case 'billing-birthday':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, dob: input.value }
          };
          break;
        case 'billing-phone':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, phone: input.value }
          };
          break;
        case 'billing-street':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, street: input.value }
          };
          break;
        case 'billing-city':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, city: input.value }
          };
          break;
        case 'billing-state':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, state: input.value }
          };
          break;
        case 'billing-country':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, country: input.value }
          };
          break;
        case 'billing-zip':
          payload = {
            ...payload,
            billingAddress: { ...payload.billingAddress, zipCode: input.value }
          };
          break;
        case 'text':
          payload = { ...payload, note: input.value };
          break;

        default:
          switch (input.type) {
            case 'checkbox':
              payload = {
                ...payload,
                inputData: { ...payload?.inputData, [input.name]: input.checked }
              };
              break;

            default:
              break;
          }
          break;
      }

      if (member) {
        if (tempMembers.filter((x) => x.index === index.toString()).length > 0) {
          let tmp = [];
          for (const m of tempMembers) {
            if (m.index === index.toString()) {
              tmp.push(member);
            } else {
              tmp.push(m);
            }
          }
          tempMembers = tmp;
          // temp = tmp
          //setMembers(temp);
        } else {
          //setMembers([...members, member]);
          tempMembers = [...tempMembers, member];
          // temp = [...temp, member];
        }
      }
    }
    setMembers(tempMembers.filter((x) => x.index !== false));
    payload = { ...payload, contacts: tempMembers.filter((x) => x.index !== false) };

    // get address section inputs
    const addressSection = document.getElementsByClassName('address-section');
    for (const address of addressSection) {
      let childrenInput = address.querySelectorAll('input');
      switch (address.getAttribute('addresstype')) {
        // case 'contact':
        //   //contactAddress
        //   for (const child of childrenInput) {
        //     payload = {
        //       ...payload,
        //       contactAddress: { ...payload.contactAddress, [child.name]: child.value }
        //     };
        //   }
        //   break;
        case 'shipping':
          //shippingAddress
          for (const child of childrenInput) {
            payload = {
              ...payload,
              shippingAddress: { ...payload.shippingAddress, [child.name]: child.value }
            };
          }
          break;
        case 'billing':
          //billingAddress
          for (const child of childrenInput) {
            payload = {
              ...payload,
              billingAddress: { ...payload.billingAddress, [child.name]: child.value }
            };
          }
          break;
        default:
          for (const child of childrenInput) {
            payload = {
              ...payload,
              contactAddress: { ...payload.contactAddress, [child.name]: child.value }
            };
          }
          break;
      }
    }

    ///get selects input
    const selects = document.getElementsByTagName('select');
    for (const select of selects) {
      payload = { ...payload, inputData: { ...payload?.inputData, [select.name]: select.value } };
    }
    const textAreas = document.getElementsByTagName('textarea');
    for (const textArea of textAreas) {
      payload = {
        ...payload,
        inputData: { ...payload?.inputData, [textArea.name]: textArea.value }
      };
    }

    if (document.getElementById('set-survey').value) {
      let s = JSON.parse(document.getElementById('set-survey').value);
      payload = { ...payload, survey: s };
    }

    return payload;
  };

  const saveData = (type, payload, e) => {
    switch (type) {
      case 'product-buy':
        setIsBuyProduct(true);
        /// ** SAVE FORM DATA
        if (store?.form.automateEntry === true) {
          if(store?.form?.contactType){
            dispatch(addLeadAction(id, {...payload,contactType:store?.form?.contactType}));
          }
          else{
            dispatch(addLeadAction(id, {...payload}));
          }
         
        }
        /// open payment modal
        const prods = JSON.parse(document.getElementById('products-value').value)
        const formTotal = document
          .getElementsByClassName('order-place-total')[0]
          .innerHTML.split(' ')[1];

        setFormEntry({ ...payload, order: { products: prods, total: formTotal } });
        toggleOpenPayment();

        break;
      case 'submit':
        /// ** SAVE FORM DATA
        if (store?.form.automateEntry === true) {
          if(store?.form?.contactType){
            dispatch(addLeadAction(id, {...payload,contactType:store?.form?.contactType}));
          }
          else{
            dispatch(addLeadAction(id, {...payload}));
          }
        }
        /// save form data

        dispatch(addFormEntryAction(id, payload)).then((data) => {
          //////----------------show success page-------------------------
          if (data?.success === true) {
            socket.emit("mybuilderLeads",{message:`You have a new lead from ${store?.form?.name}`,formId:store?.form?._id,title:"leads"})
            const createdFormEntry = data?.data;
            dispatch(sendEmailToUserAction({ id: createdFormEntry?._id, type: 'lead' }));

            // go to submitForm
            window.location.href = `/web-preview/submitted/${id}`;
          } else {
           toast.error('Something went wrong! Please try again!');
          }
        });
        break;
      case 'open-website':
        //redirect to url
        const url = e?.currentTarget?.getAttribute('url');
        const target = e?.currentTarget?.getAttribute('target');
        target === '_blank' ? window.open(url, target) : (window.location.href = url);
        break;
      case 'next-step':
        //go to next step on the funnel
        //get next path
        const p = store.form.formData.find((x) => x.path === path);
        const index = store.form.formData.indexOf(p);
        if (index === 0) {
          // add data
          /// ** SAVE FORM DATA
          if (store?.form.automateEntry === true) {
            if(store?.form?.contactType){
              dispatch(addLeadAction(id, {...payload,contactType:store?.form?.contactType}));
            }
            else{
              dispatch(addLeadAction(id, {...payload}));
            }
          }
          /// save form data
          dispatch(addFormEntryAction(id, payload)).then((data) => {
            if (data?.success === true) {
              socket.emit("mybuilderLeads",{message:`You have a new leads from ${store?.form?.name}`,formId:store?.form?._id,title:"leads"})
              const createdFormEntry = data?.data;
              dispatch(sendEmailToUserAction({ id: createdFormEntry?._id, type: 'lead' }));
              localStorage.setItem('formEntry', data.data._id);
              window.location.href = `/web-preview/${id}&path=${
                store.form.formData[index + 1].path
              }`;
            } else {
              toast.error('Something went wrong! Please try again!');
            }
          });
        } else if (index < store.form.formData.length) {
          const entryId = localStorage.getItem('formEntry');
          if (entryId && entryId !== '') {
            /// ** SAVE FORM DATA
            if (store?.form.automateEntry === true) {
              if(store?.form?.contactType){
                dispatch(addLeadAction(id, {...payload,contactType:store?.form?.contactType}));
              }
              else{
                dispatch(addLeadAction(id, {...payload}));
              }
            }
            // update data

            dispatch(updateFormEntryAction(entryId, payload)).then((data) => {
              if (data?.success === true) {
                window.location.href = `/web-preview/${id}&path=${
                  store.form.formData[index + 1].path
                }`;
              } else {
                toast.error('Something went wrong! Please try again!');
              }
            });
          } else {
            toast.error('Your data is not available please start over!');
          }
        } else {
          const entryId = localStorage.getItem('formEntry');
          if (entryId && entryId !== '') {
            /// ** SAVE FORM DATA
            if (store?.form.automateEntry === true) {
              if(store?.form?.contactType){
                dispatch(addLeadAction(id, {...payload,contactType:store?.form?.contactType}));
              }
              else{
                dispatch(addLeadAction(id, {...payload}));
              }
            }
            // update data

            dispatch(updateFormEntryAction(entryId, payload)).then((data) => {
              if (data?.success === true) {
                window.location.href = `/web-preview/submitted/${id}`;
              } else {
                toast.error('Something went wrong! Please try again!');
              }
            });
          } else {
            toast.error('Your data is not available please start over!');
          }
        }
        break;

      default:
        break;
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let requires = document.getElementsByClassName('short-text-input');
    let cnt = 0;
    for (const element of requires) {
      if (
        element.hasAttribute('required') &&
        element.attributes['required'].value === 'true' &&
        element.validity.valueMissing === true
      ) {
        element.classList.add('invalid');
        cnt++;
      } else {
        element.classList.remove('invalid');
      }
    }
    if (cnt === 0) {
      const type = e.currentTarget.getAttribute('selectedOption');
      var payload = setPayload();

    
      //get signs
      const signatures = document.getElementsByClassName('signature-text');
      console.log('signatures', signatures);
      if (signatures.length > 0) {
        // for (const canvas of signatures) {
        //   //upload signature
        //   const signaturePad = canvas;
        //   const base64 = signaturePad.toDataURL();
        //   const blob = b64toBlob(base64);
        //   let file = new File([blob], 'sign.png', {
        //     type: 'image/png'
        //   });
        //   const formData = new FormData();
        //   formData.append('file', file);
        //   useUploadSignature(formData).then((res) => {
        //     if (res.success) {
        //       let signs = [];
        //       if (payload.signature) {
        //         signs = payload.signature;
        //         signs = [...signs, { id: canvas.id, url: res.url }];
        //         payload = {
        //           ...payload,
        //           signature: signs
        //         };
        //       } else {
        //         signs = [{ id: canvas.id, url: res.url }];
        //         payload = {
        //           ...payload,
        //           signature: signs
        //         };
        //       }

        //       //save data
        //       // ** Switch on submit type
        //       saveData(type, payload, e);
        //     }
        //   });
        // }
      } else {
        // ** Switch on submit type
        saveData(type, payload, e);
      }
    } else {
      console.log('INVALID');
    }
  };
  const onChangeOrderTab = (e) => {
    if (e.target.id === 'order-btn-tab1') {
      document.getElementById('order-btn-tab1').classList.add('active-tab-order');
      document.getElementById('order-content-tab1').style.display = 'block';
      document.getElementById('order-content-tab2').style.display = 'none';
      document.getElementById('order-btn-tab2').classList.remove('active-tab-order');
    } else if (e.target.id === 'order-btn-tab2') {
      document.getElementById('order-btn-tab1').classList.remove('active-tab-order');
      document.getElementById('order-btn-tab2').classList.add('active-tab-order');
      document.getElementById('order-content-tab1').style.display = 'none';
      document.getElementById('order-content-tab2').style.display = 'block';
    }
  };
  const onRateClick = (e) => {
    const parent = e.target.parentNode;
    const surveyParent = parent.parentNode;

    let children = parent.childNodes;

    if (e.target.classList.contains('star-input-1')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 1 };
          }
          return x;
        });

        document.getElementById('set-survey').value = JSON.stringify(temp);
        setSurveys(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 1 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 1 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-2')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 2 };
          }
          return x;
        });
        document.getElementById('set-survey').value = JSON.stringify(temp);
        setSurveys(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 2 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 2 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-3')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = '#babfc7';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 3 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 3 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 3 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-4')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = '#babfc7';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 4 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 4 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 4 }
        ]);
      }
    } else if (e.target.classList.contains('star-input-5')) {
      for (const child of children) {
        if (child.classList.contains('star-input-1')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-2')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-3')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-4')) {
          child.style.color = 'orange';
        } else if (child.classList.contains('star-input-5')) {
          child.style.color = 'orange';
        }
      }
      if (surveys.length > 0) {
        let temp = surveys.map((x) => {
          if (x.id === surveyParent.id) {
            return { ...x, value: 5 };
          }
          return x;
        });
        setSurveys(temp);
        document.getElementById('set-survey').value = JSON.stringify(temp);
      } else {
        setSurveys([{ id: surveyParent.id, value: 4 }]);
        document.getElementById('set-survey').value = JSON.stringify([
          { id: surveyParent.id, value: 5 }
        ]);
      }
    }
  };

  const onChangeMembersCount = (e) => {
    const cnt = e.target.value;
    const parent = document.getElementsByClassName('order-place-info-container')[0];
    // for (let i = 0; i < parent.children.length; i++) {
    //   parent.children[i].remove();
    // }

    let prods = [];
    const participantStyle = document.querySelectorAll('.participant-style');

    parent.innerHTML = '';
    for (let index = 1; index < Number(cnt) + 1; index++) {
      participantStyle[0].firstElementChild.innerHTML = `Participant ${index}`;
      const participantsInputs = participantStyle[0].getElementsByTagName('input');
      for (const p of participantsInputs) {
        p.name = `participant-${index}`;
      }

      let html = '';
      for (const p of participantsInputs) {
        html = html + p.outerHTML;
      }
      parent.insertAdjacentHTML(
        'beforeend',
        `<div class="participant-style">
          ${participantStyle[0].firstElementChild.outerHTML}
          ${html}
        </div>`
      );
    }
    const productQty = document.getElementsByClassName('order-place-qty');
    for (const p of productQty) {
      p.innerHTML = `x ${cnt}`;
    }
    let total = 0;
    for (const p of store?.form?.products) {
      total = total + p.price * cnt;
      prods.push({ ...p, qty: cnt });
    }
    setProducts(prods);
    document.getElementById('products-value').value = JSON.stringify(prods);
    document.getElementsByClassName('order-place-total')[0].innerHTML = `$ ${total}`;
  };

  useEffect(() => {
    dispatch(getFormDataAction(id));
    dispatch(getFormEntryDetailsAction(id));
  }, []);

  useEffect(() => {
    if (store && store?.form?.formData.length > 0 && store?.form?.formData[0]?.html != '') {
      const formData = store.form.formData.find((x) => x.path === path);
      setProducts(
        store?.form?.products.map((x) => {
          return { ...x, qty: 1 };
        })
      );
      document.getElementById('products-value').value = JSON.stringify(
        store?.form?.products.map((x) => {
          return { ...x, qty: 1 };
        })
      );
      /// ** SIGNATURE DRAWING
      function resizeCanvas() {
        var ratio = 1;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
      }
      window.addEventListener('resize', resizeCanvas);
      const initLib = function () {
        let signatures = document.getElementsByClassName('signature-text');
        for (let index = 0; index < signatures.length; index++) {
          let canvas = signatures[index];
          const signaturePad = new window.SignaturePad(canvas);
          signaturePad.minWidth = 1;
          signaturePad.maxWidth = 1;
          signaturePad.penColor = 'rgb(0, 0, 0)';
          canvas.onresize = resizeCanvas;
        }
      };
      const script = document.createElement('script');
      script.onload = initLib;
      script.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js';
      document.body.appendChild(script);

      // ** END SIGNATURE DRAWING

      // ** COUNTDOWN

      // ** END COUNTDOWN
      let html = formData.html;
      let css = formData.css;
      html = html.replace('<body', '<div');
      html = html.replace('</body>', '</div>');
      html = html.replaceAll('add-new-column', 'add-new-column d-none');
      html = html.replaceAll('add-new-element', 'add-new-element d-none');
      html =
        `<style>${css}</style>` +
        `<style>
        .short-text-input.invalid{
          border-color: red!important;
        }
        .active-tab-order{background-color:${formData?.orderElements?.tabColor} !important}
        </style>` +
        `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap">
      
      
      <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css">
      <link rel="stylesheet" href="/assets/form-builder/grapes-form.css">
      <link rel="stylesheet" href="/assets/form-builder/themes.css">` +
        html;
      html =
        html +
        `<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>


      <script src="https://cdn.jsdelivr.net/npm/signature_pad@4.0.0/dist/signature_pad.umd.min.js"></script>
      <script type="text/javascript" src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
      
      <script type="text/javascript" src="https://cdn.ckeditor.com/4.19.0/standard/ckeditor.js"></script>
      <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
      <script>
      const canvas = document.getElementById("signature-pad");
        

        const signaturePad = new window.SignaturePad(canvas);
        signaturePad.minWidth = 1;
        signaturePad.maxWidth = 1;
        signaturePad.penColor = "rgb(0, 0, 0)";

        canvas.onresize = resizeCanvas;
        resizeCanvas()
            </script>
      `;

      document.getElementById('editor').innerHTML = html;

      let buttons = document.getElementsByClassName('btn-submit');
      for (let button of buttons) {
        button.addEventListener('click', onClick);
      }

      let requires = document.getElementsByClassName('short-text-input');
      for (const element of requires) {
        element.addEventListener('input', function () {
          if (
            element.hasAttribute('required') &&
            element.attributes['required'].value === 'true' &&
            element.validity.valueMissing === false
          ) {
            element.classList.remove('invalid');
          }
        });
      }

      let orderTabs = document.getElementsByClassName('order-tab-link');
      for (let button of orderTabs) {
        button.addEventListener('click', onChangeOrderTab);
      }
      // ** STAR RATING
      const allStars = document.getElementsByClassName('star-input');
      for (const star of allStars) {
        star.addEventListener('click', onRateClick);
      }

      // ** MEMBERS COUNT
      const qtyMembers = document.getElementsByClassName('order-place-qty-membership-options');
      for (const q of qtyMembers) {
        q.addEventListener('change', onChangeMembersCount);
      }

      //** PRODUCT COUNT
      const qtyProducts = document.getElementsByClassName('order-place-qty-option');
      for (const q of qtyProducts) {
        q.addEventListener('change', function (e) {
          const product = store?.form.products.find((x) => q.classList.contains(x.productId));
          setTotal({ ...total, [product.productId]: product.price * Number(e.target.value) });
        });
      }
    }
  }, [store.form]);

  useEffect(() => {
    if (total !== undefined && total !== null) {
      let temp = 0;
      for (var key in total) {
        temp = temp + total[key];
      }
      document.getElementsByClassName('order-place-total')[0].innerHTML = `$ ${temp}`;
    }
  }, [total]);

  return (
    <>
      {store && store?.form && store?.form?.seoDetails && (
        <>
          <Helmet>
            <title>{store?.form?.seoDetails?.title}</title>
            <meta name="description" content={`${store?.form?.seoDetails?.description}`} />
            <meta name="keywords" content={`${store?.form?.seoDetails?.keywords}`} />
            <link rel="icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <link rel="shortcut icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <link rel="apple-touch-icon" href={`${store?.form?.seoDetails?.socialImage}`} />
            <meta name="author" content={`${store?.form?.seoDetails?.author}`} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={`${store?.form?.seoDetails?.title}`} />
            <meta property="og:description" content={`${store?.form?.seoDetails?.description}`} />
            <meta property="og:image" content={`${store?.form?.seoDetails?.socialImage}`} />
            <meta
              property="og:url"
              content={`/web-preview/${id}&path=${store?.form?.formData[0]?.path}`}
            />
            <meta property="og:site_name" content={`${store?.form?.seoDetails?.title}`} />

            <meta name="twitter:title" content={`${store?.form?.seoDetails?.title}`} />
            <meta name="twitter:description" content={`${store?.form?.seoDetails?.description}`} />
            <meta name="twitter:image" content={`${store?.form?.seoDetails?.socialImage}`} />
            <meta
              name="twitter:site"
              content={`/web-preview/${id}&path=${store?.form?.formData[0]?.path}`}
            />
            <meta name="twitter:creator" content={`${store?.form?.seoDetails?.twitter}`} />
            {store?.form?.seoDetails?.headCode}
          </Helmet>
        </>
      )}
      <Input type="hidden" id="set-survey" />
      <Input type="hidden" id="products-value" />

      <div className="App" id="editor"></div>
      {store?.form?.seoDetails?.bodyCode}
      {isBuyProduct === true && (
        <PaymentModal
          form={store.form}
          formEntry={formEntry}
          toggle={toggleOpenPayment}
          open={openPayment}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
