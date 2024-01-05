import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ChevronDown, ChevronLeft, Plus } from 'react-feather';
import { updateProductCategoryAction } from '../../../store/action';
import './ProductsSettingModal.scss';
import { Settings } from './Settings';
import { Layout } from './Layout';
import { Design } from './Design';

const ProductsSettingModal = ({
  store,
  storeProducts,
  showProductsSettingModal,
  setShowProductsSettingModal,
  selectedProductCategory,
  handleChangeSelectedProductCategory,
  selectedCmp
}) => {
  const dispatch = useDispatch();
  const typeList = [
    'Category',
    'Settings',
    'Layout',
    // 'Text',
    'Design'
    // 'Filters',
    // 'Sorting',
    // 'Quick View',
    // 'Manage'
  ];
  const [settingType, setSettingType] = useState('Category');
  const [categoryType, setCategoryType] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [checkedProductState, setCheckedProductState] = useState();

  const handleCreateCategory = () => {
    setSelectedCategory({});
    setIsEdit(false);
    setCategoryType(2);
    setCategoryName('');
    setCheckedProductState({});
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setCategoryType(2);
    setCategoryName(category?.name);
    setCheckedProductState(
      storeProducts?.values?.reduce((state, product) => {
        state[product.id] = category?.products?.includes(product.id) || category?.isAll;
        return state;
      }, {})
    );
  };

  const handleChangeSelectedProducts = (id) => (event) => {
    setCheckedProductState({
      ...checkedProductState,
      [id]: event.target.checked
    });
  };

  const handleSaveCategory = async () => {
    const ids = Object.entries(checkedProductState)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => id);
    await dispatch(
      updateProductCategoryAction(selectedCategory?._id, {
        name: categoryName,
        products: ids.join(),
        websiteId: store.form?._id,
        isEdit: isEdit
      })
    );
    setCategoryType(0);
  };
  return (
    <Modal
      className="products-setting"
      isOpen={showProductsSettingModal}
      toggle={() => setShowProductsSettingModal(!showProductsSettingModal)}
      centered
      size="ms"
    >
      <ModalHeader
        toggle={() => setShowProductsSettingModal(!showProductsSettingModal)}
        className="font-medium-5 px-2 py-1 modal-title text-primary"
      >
        <h4>Gallery Setting</h4>
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
          {settingType === 'Category' ? (
            categoryType === 0 ? (
              <div className="category-content d-flex flex-column h-100">
                <div>This gallery is displaying the category:</div>
                <div className="mt-1" style={{ fontWeight: 'bold' }}>
                  {selectedProductCategory?.name}
                </div>
                <div className="p-1 mt-1 product-list w-100">
                  <div>Choose Category</div>
                  <div className="d-grid mt-1 w-100 " style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {store.categories?.map((category) => {
                      return (
                        <div
                          className={
                            'category-item cursor-hand mb-2' +
                            (category?.name === selectedProductCategory?.name
                              ? ' category-selected'
                              : '')
                          }
                          onClick={() => handleChangeSelectedProductCategory(category)}
                        >
                          {category?.name}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="category-item category-add cursor-hand"
                    onClick={handleCreateCategory}
                  >
                    +
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center pt-2">
                  <div
                    className="category-manage cursor-hand d-flex justify-content-center align-items-center"
                    onClick={() => setCategoryType(1)}
                  >
                    Manage Categories
                  </div>
                </div>
              </div>
            ) : categoryType === 1 ? (
              <div>
                <Badge
                  className="mb-1 round px-1 cursor-hand"
                  style={{ width: 'fit-content' }}
                  color="light-primary"
                  onClick={() => setCategoryType(0)}
                >
                  <ChevronLeft size={14} className="me-1" />
                  Back
                </Badge>
                <div className="p-1">
                  <div>Choose Category</div>
                  <div className="d-grid mt-1 w-100" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {store.categories.map((category) => {
                      return (
                        <div
                          className="category-item cursor-hand mb-2"
                          onClick={() => handleEditCategory(category)}
                        >
                          {category?.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column h-100">
                <Badge
                  className="mb-1 round px-1 cursor-hand"
                  style={{ width: 'fit-content' }}
                  color="light-primary"
                  onClick={() => setCategoryType(0)}
                >
                  <ChevronLeft size={14} className="me-1" />
                  Back
                </Badge>
                <div className="mt-1">Category Name</div>
                <Input
                  type="text"
                  className="mt-1"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <div className="mt-1">Products List</div>
                <div className="product-list">
                  {storeProducts?.values?.map((product, index) => {
                    return (
                      <div className="d-flex mt-1">
                        <Input
                          type="checkbox"
                          id={'product' + index}
                          checked={checkedProductState[product.id]}
                          className="me-1"
                          onChange={handleChangeSelectedProducts(product.id)}
                        />
                        <label for={'product' + index}>{product.name}</label>
                      </div>
                    );
                  })}
                </div>
                <div className="w-100 mt-1 d-flex justify-content-end">
                  <Button className="btn-success" color="success" onClick={handleSaveCategory}>
                    Save
                  </Button>
                </div>
              </div>
            )
          ) : settingType === 'Settings' ? (
            <Settings store={store} storeProducts={storeProducts} selectedCmp={selectedCmp} />
          ) : settingType === 'Layout' ? (
            <Layout store={store} storeProducts={storeProducts} selectedCmp={selectedCmp} />
          ) : (
            <Design store={store} storeProducts={storeProducts} selectedCmp={selectedCmp} />
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ProductsSettingModal;
