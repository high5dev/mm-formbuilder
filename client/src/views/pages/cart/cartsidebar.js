import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import { updateCartProductsAction } from '../../webBuilder/store/action';
import { useDispatch } from 'react-redux';

function Cartsidebar({ store, showCartSidebar, setShowCartSidebar, cartLink }) {
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();

    const toggleSidebar = () => {
        setShowCartSidebar(!showCartSidebar);
    };

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
        <>
            <div className={`position-fixed top-0`} style={{ width: '350px', height: '100vh', backgroundColor: '#fff', zIndex: 1050, transition: "right 0.5s", right: showCartSidebar ? "0px" : '-350px' }}>
                {/* Sidebar content goes here */}
                <div className='p-3 d-flex' style={{ backgroundColor: '#000' }}>
                    <ChevronRight size={35} color="white" onClick={toggleSidebar} />
                    <Label className="mdl-input-category-label fs-2 ps-3" for="mdl-input-category" style={{ color: 'white' }}>
                        Cart
                    </Label>

                </div>
                <div className='p-3 d-flex flex-column' style={{ height: "calc(100% - 261px)" }}>
                    <div className='flex-1'>
                        {
                            store?.cartProducts?.map((item, index) => {
                                return (
                                    <div className='d-flex position-relative cartItem mb-2'>
                                        <img src={item.product.url} width="80" />
                                        <div className='d-flex flex-column ms-1'>
                                            <Label className="mdl-input-category-label fs-5" for="mdl-input-category">
                                                {item.product.name}
                                            </Label>
                                            <Label className="mdl-input-category-label fs-4" for="mdl-input-category" style={{ fontWeight: 'bold' }}>
                                                {item.product.currency}{item.product.price}
                                            </Label>
                                            <div className="d-flex align-items-center position-relative" style={{ width: "64px" }}>
                                                <Label className="fs-3 position-absolute m-0" for="mdl-input-category" style={{ left: "3px", cursor: "pointer" }} onClick={() => updateCart(index, item.count - 1)}>
                                                    -
                                                </Label>
                                                <Input type="text" className="form-control" id="inputNumber" value={item.count} style={{ width: "64px", height: "30px", padding: "10px", borderRadius: "0px" }} onChange={(e) => { if (e.target.value > 0) { updateCart(index, e.target.value) } }} />
                                                <Label className="fs-3 position-absolute m-0" style={{ right: "5px", cursor: "pointer" }} onClick={() => updateCart(index, item.count + 1)}>
                                                    +
                                                </Label>
                                            </div>

                                        </div>
                                        <div className='position-absolute end-0 align-items-center justify-content-center p-0 close' style={{ borderRadius: "50%", border: "1px solid #E3E3E3", width: "15px", height: "15px", cursor: "pointer", display: "none" }} onClick={() => updateCart(index, 0, true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="10px" height="10px" baseProfile="basic"><path d="M49.414,14.586c0.781,0.781,0.781,2.047,0,2.828l-32,32C17.023,49.805,16.512,50,16,50s-1.023-0.195-1.414-0.586	c-0.781-0.781-0.781-2.047,0-2.828l32-32C47.367,13.805,48.633,13.805,49.414,14.586z" /><path d="M49.414,49.414c-0.781,0.781-2.047,0.781-2.828,0l-32-32c-0.781-0.781-0.781-2.047,0-2.828C14.977,14.195,15.488,14,16,14	s1.023,0.195,1.414,0.586l32,32C50.195,47.367,50.195,48.633,49.414,49.414z" /></svg>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className=''>
                        <Label className="mdl-input-category-label fs-2" for="mdl-input-category" style={{ color: 'black' }}>
                            Subtotal<br />USD {totalPrice}
                        </Label>
                    </div>
                </div>
                <div className='p-3' style={{ borderTop: "1px solid #E3E3E3" }}>
                    <Link to={cartLink} className='w-100 d-block p-1 fs-3' style={{ backgroundColor: "#384AD3", color: "white", textAlign: 'center' }}>View Cart</Link>
                </div>
            </div>
        </>
    );
}

export default Cartsidebar;
