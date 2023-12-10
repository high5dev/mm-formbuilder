import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input } from 'reactstrap';
import { updateCartProductsAction } from '../../formBuilder/store/action';
import logo from '@src/assets/images/logo/logo.png'
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const store = useSelector((state) => state.formEditor);

    useEffect(() => {
        if (store?.cartProducts) {
            let sum = 0;
            store?.cartProducts?.forEach((item) => {
                sum += item?.count * item?.product?.price;
            });
            setTotalPrice(sum);
        }
    }, [store?.cartProducts]);

    const updateCart = (index, value, remove = false) => {
        let cartProducts = [];
        if (remove) {
            cartProducts = [...store?.cartProducts?.slice(0, index), ...store?.cartProducts?.slice(index + 1)];
            dispatch(updateCartProductsAction(cartProducts));
        } else {
            if (value > 0) {
                cartProducts = store?.cartProducts.map((item, idx) => idx === index ? { ...item, count: value } : item);
                dispatch(updateCartProductsAction(cartProducts));
            }
        }
    };

    return (
        <div className='p-3'>
            <Link to="/">
                <img className='fallback-logo' src={logo} alt='logo' />
            </Link>
            <div className='d-flex mx-auto mt-5' style={{ maxWidth: "1400px", minWidth: "280px", width: "100%" }}>
                <div className='' style={{ width: "100%" }}>
                    <Label className="mdl-input-category-label fs-2" for="mdl-input-category" style={{ color: 'black' }}>
                        My cart
                    </Label>
                    <div className='' style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)", borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                        {
                            store?.cartProducts?.map((item, index) => {
                                return (
                                    <div className='d-flex mt-2 mb-2'>
                                        <div className='d-flex align-items-start' style={{ flex: 3 }}>
                                            <img src={item.product.url} width="100" height="100" />
                                            <div className='d-flex flex-column ms-3' style={{ width: '80%' }}>
                                                <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'black' }}>
                                                    {item.product.name}
                                                </Label>
                                                <Label className="mdl-input-category-label fs-4" for="mdl-input-category" style={{ color: 'black' }}>
                                                    {item.product.currency}{item.product.price}
                                                </Label>
                                            </div>
                                            <div className="d-flex align-items-center position-relative" style={{ width: "80px" }}>
                                                <Label className="fs-3 position-absolute m-0" for="mdl-input-category" style={{ left: "3px", cursor: "pointer" }} onClick={() => updateCart(index, item.count - 1)}>
                                                    -
                                                </Label>
                                                <Input type="text" className="form-control" id="inputNumber" value={item.count} style={{ width: "80px", height: "30px", padding: "10px", borderColor: 'black', borderRadius: "0px", textAlign: 'center' }} onChange={(e) => { if (e.target.value > 0) { updateCart(index, e.target.value) } }} />
                                                <Label className="fs-3 position-absolute m-0" style={{ right: "5px", cursor: "pointer" }} onClick={() => updateCart(index, item.count + 1)}>
                                                    +
                                                </Label>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-start' style={{ flex: 1 }}>
                                            <div></div>
                                            <Label className="mdl-input-category-label fs-4" for="mdl-input-category">
                                                {item.product.currency}{item.product.price * item.count}
                                            </Label>
                                            <div className='d-flex align-items-center justify-content-center p-0' style={{ cursor: "pointer", marginTop: "3px" }} onClick={() => updateCart(index, 0, true)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="18px" height="18px" baseProfile="basic"><path d="M49.414,14.586c0.781,0.781,0.781,2.047,0,2.828l-32,32C17.023,49.805,16.512,50,16,50s-1.023-0.195-1.414-0.586	c-0.781-0.781-0.781-2.047,0-2.828l32-32C47.367,13.805,48.633,13.805,49.414,14.586z" /><path d="M49.414,49.414c-0.781,0.781-2.047,0.781-2.828,0l-32-32c-0.781-0.781-0.781-2.047,0-2.828C14.977,14.195,15.488,14,16,14	s1.023,0.195,1.414,0.586l32,32C50.195,47.367,50.195,48.633,49.414,49.414z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='ms-3' style={{ flex: "0 0 280px" }}>
                    <Label className="mdl-input-category-label fs-2" for="mdl-input-category" style={{ color: 'black' }}>
                        Order summary
                    </Label>
                    <div className=' pt-2 pb-2' style={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)", borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                        <div className='d-flex justify-content-between'>
                            <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'black' }}>
                                Subtotal
                            </Label>
                            <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'black' }}>
                                USD {totalPrice}
                            </Label>
                        </div>
                        <div className='d-flex justify-content-between mt-1'>
                            <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'black' }}>
                                Delivery
                            </Label>
                            <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'black' }}>
                                FREE
                            </Label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-1'>
                        <Label className="mdl-input-category-label fs-3" for="mdl-input-category" style={{ color: 'black' }}>
                            Total
                        </Label>
                        <Label className="mdl-input-category-label fs-3" for="mdl-input-category" style={{ color: 'black' }}>
                            USD {totalPrice}
                        </Label>
                    </div>
                    <div className='w-100 mt-2 p-1' style={{ backgroundColor: "rgb(56, 74, 211)", textAlign: 'center', cursor: 'pointer' }}>
                        <Label className="mdl-input-category-label fs-5" for="mdl-input-category" style={{ color: 'white' }}>
                            Checkout
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;