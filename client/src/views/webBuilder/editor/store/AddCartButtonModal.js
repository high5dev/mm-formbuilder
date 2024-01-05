import React, { useEffect, useState, useRef } from 'react';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';
import { ChevronLeft } from 'react-feather';

const AddCartButtonModal = ({ store, storeProducts, showAddCartButtonModal, setShowAddCartButtonModal, productId, handleChangeProductId }) => {
  const [showProducts, setShowProducts] = useState(false);
  const [product, setProduct] = useState({});
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    storeProducts?.values?.forEach((product) => {
      if (product.id == productId) {
        setProduct(product);
      }
    });
  }, [productId]);

  useEffect(() => {
    if (storeProducts?.values?.length > 0) {
      setProducts(storeProducts?.values?.filter(item => {
        return item.name && item.name.toLowerCase().includes(searchText.toLowerCase())
      }));
    }
  }, [storeProducts, searchText]);

  return (
    <>
      <Modal isOpen={showAddCartButtonModal} toggle={() => setShowAddCartButtonModal(!showAddCartButtonModal)} centered size='xs'>
        <ModalHeader toggle={() => setShowAddCartButtonModal(!showAddCartButtonModal)} className="font-medium-5 px-2 py-1 modal-title text-primary">
          <h4>Add To Cart Button</h4>
        </ModalHeader>
        <ModalBody className="d-flex justify-content-between p-0" style={{ minHeight: 400, maxHeight: 400 }}>
          {
            showProducts ? (
              <div className='d-flex flex-column flex-1 p-1'>
                <Badge className='mb-1 round px-2' style={{ width: 'fit-content', cursor: 'pointer' }} color='light-primary' onClick={() => setShowProducts(false)}>
                  <ChevronLeft size={14} className='me-1' />
                  Back
                </Badge>
                <Label className="mdl-input-category-label fs-6" for="mdl-input-category">
                  Search product name
                </Label>
                <Input type="text" placeholder='Type here' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <div className='h-100 overflow-scroll mt-1'>
                  {
                    products.map((item) => {
                      return (
                        <div className={'d-flex align-items-center p-1' + (item.id == productId ? ' productSelected' : '')} style={{ cursor: 'pointer' }} onClick={() => { setShowProducts(false); handleChangeProductId(item.id); }}>
                          <img src={item?.url} width="40" height="40" style={{ borderRadius: '50%' }} />
                          <Label className="mdl-input-category-label fs-6 ms-1" for="mdl-input-category" style={{ color: item.id == productId ? 'white' : 'black' }}>
                            {item?.name}
                          </Label>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            ) : (
              <div className='d-flex flex-column flex-1'>
                <div className='bg-light-secondary d-flex justify-content-center'>
                  <Label className="mdl-input-category-label fs-6 my-1" for="mdl-input-category">
                    Product
                  </Label>
                </div>
                <div className='d-flex p-2 flex-column position-relative productHover' style={{ cursor: 'pointer' }} onClick={() => setShowProducts(true)}>
                  <Label className="mdl-input-category-label fs-6 " for="mdl-input-category">
                    Connect this button to:
                  </Label>
                  <div className='d-flex align-items-center'>
                    <img src={product?.url} width="40" height="40" />
                    <Label className="mdl-input-category-label fs-6" for="mdl-input-category">
                      {product?.name}
                    </Label>
                  </div>
                  <div className='position-absolute' style={{ bottom: "21px", right: "43px", borderRadius: "50%", backgroundColor: "white" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" color=""><path d="M14 13v3l4-3.5L14 9v3H6v1h8Z"></path></svg>
                  </div>
                </div>
              </div>
            )
          }
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddCartButtonModal;
