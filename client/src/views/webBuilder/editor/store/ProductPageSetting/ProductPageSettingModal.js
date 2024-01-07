import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './ProductPageSettingModal.scss';
import { Settings } from './Settings';
import { Design } from './Design';

export const ProductPageSettingModal = ({
  store,
  storeProducts,
  showProductPageSettingModal,
  setShowProductPageSettingModal,
  selectedCmp
}) => {
  const typeList = ['Settings', 'Design'];
  const [settingType, setSettingType] = useState('Settings');

  return (
    <Modal
      className="product-page-setting"
      isOpen={showProductPageSettingModal}
      toggle={() => setShowProductPageSettingModal(!showProductPageSettingModal)}
      centered
      size="ms"
    >
      <ModalHeader
        toggle={() => setShowProductPageSettingModal(!showProductPageSettingModal)}
        className="font-medium-5 px-2 py-1 modal-title text-primary"
      >
        <h4>Product Page</h4>
      </ModalHeader>
      <ModalBody className="d-flex">
        <div className="type-list h-100">
          {typeList.map((type) => {
            return (
              <div
                className={'cursor-hand' + (type === settingType ? ' type-selected' : '')}
                onClick={() => {
                  setSettingType(type);
                }}
              >
                {type}
              </div>
            );
          })}
        </div>
        <div className="type-content p-1 w-100 h-100">
          {settingType === 'Settings' ? (
            <Settings store={store} storeProducts={storeProducts} selectedCmp={selectedCmp} />
          ) : (
            <Design store={store} storeProducts={storeProducts} selectedCmp={selectedCmp} />
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};
