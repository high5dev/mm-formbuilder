import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Check, Dribbble, Trash } from 'react-feather';
import { toast } from 'react-toastify';
import Select from 'react-select';
import {
  createFormCategoryAction,
  deleteFormCategoryAction,
  updateFormCategoryAction
} from '../store/action';

const colorData = [
  { color: 'light-primary' },
  { color: 'light-secondary' },
  { color: 'light-success' },
  { color: 'light-danger' },
  { color: 'light-warning' },
  { color: 'light-info' },
  { color: 'primary' },
  { color: 'secondary' },
  { color: 'success' },
  { color: 'danger' },
  { color: 'warning' },
  { color: 'info' }
];
const typeOptions = [
  { value: 'leads', label: 'Leads' },
  { value: 'sales', label: 'Sales' },
  { value: 'email', label: 'Emails' },
  { value: 'forms', label: 'Forms' },
  { value: 'website', label: 'Websites' }
];

export default function CreateFormCategoryModal({ open, toggle, store, dispatch }) {
  const [category, setCategory] = useState();
  const [titleValidation, setTitleValidation] = useState(true);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleDeleteCategory = (cat) => {
    dispatch(deleteFormCategoryAction(cat._id));
  };

  const handleSubmit = () => {
    if (category._id) {
      dispatch(updateFormCategoryAction(category));
    } else {
      dispatch(createFormCategoryAction(category));
    }
  };

  const handleResetFields = () => {};

  const handleCategoryClick = (t) => {
    setCategory(t);
  };

  const handlePickerColor = (item) => {
    console.log(item);
    setCategory({ ...category, labelColor: item.color });
  };

  const handleInputTitle = (e) => {
    setCategory({ ...category, name: e.target.value });
  };
  const handleTypeChange = (type) => {
    setCategory({ ...category, type: type });
  };

  useEffect(() => {
    setCategory(null);
  }, [open]);

  return (
    <Modal isOpen={open} toggle={toggle} centered>
      <ModalHeader toggle={toggle}> Form Category Management</ModalHeader>
      <ModalBody className="mb-1 lead-source-modal">
        <Row>
          <Col xs="5">
            <PerfectScrollbar
              style={{ height: '280px' }}
              options={{ wheelPropagation: false }}
              className="lead-source-scroll"
            >
              <ListGroup>
                {store && Array.isArray(store.formCategories) ? (
                  store.formCategories?.map((x, idx) => {
                    const shouldShowItem = showAllItems || idx < 10;
                    return (
                      <ListGroupItem
                        key={idx}
                        active={x?._id === category?._id ? true : false}
                        onClick={() => handleCategoryClick(x)}
                        className={`lead-source-list${shouldShowItem ? '' : ' d-none'}`}
                      >
                        {/* style={{ backgroundColor: 'blue !important' }} */}
                        {/* color={x?.labelColor} */}
                        <Badge color={x?.labelColor} pill className="cursor-pointer">
                          {x?.name}
                        </Badge>
                        <Trash
                          size={14}
                          style={{ float: 'right', cursor: 'pointer' }}
                          onClick={() => handleDeleteCategory(x)}
                          className="me-25 text-danger"
                        />
                      </ListGroupItem>
                    );
                  })
                ) : (
                  <ListGroupItem>No items</ListGroupItem>
                )}
              </ListGroup>
            </PerfectScrollbar>
            {store && store?.formCategories && store?.formCategories?.length > 10 && (
              <div
                onClick={() => setShowAllItems(!showAllItems)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '0px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '5px',
                  fontSize: '12px'
                }}
              >
                + {store?.formCategories?.length - 10} See {showAllItems ? 'Less' : 'More'}
              </div>
            )}
          </Col>
          <Col xs="7">
            {!category?.value && !category?._id ? 'Add New Category' : 'Update Category'}
            <PerfectScrollbar options={{ wheelPropagation: false }}>
              <div>
                <Label className="form-label" for="label-title">
                  Title <span className="text-danger">*</span>
                </Label>
                <Input
                  id="labelTitle"
                  name="labelTitle"
                  placeholder="Title"
                  className="new-todo-item-title"
                  value={category?.name ? category.name : ''}
                  onChange={handleInputTitle}
                  valid={titleValidation && category?.name}
                  invalid={!titleValidation || !category?.name}
                />
                <FormFeedback valid={titleValidation && category?.name}>
                  {!titleValidation
                    ? 'Oh no! That name is already taken.'
                    : !category?.name
                    ? 'Please, Enter the name.'
                    : 'Sweet! That name is available.'}
                </FormFeedback>
              </div>
              <div>
                <Label className="form-label" for="label-title">
                  Category Type <span className="text-danger">*</span>
                </Label>
                <Select
                  options={typeOptions}
                  value={typeOptions.find((x) => x?.value === category?.type)}
                  onChange={(data) => handleTypeChange(data.value)}
                />
              </div>
              <div>
                <Label className="form-label" for="label-color">
                  Label Color
                </Label>
                <Row style={{ width: '90%' }}>
                  {colorData.map((item, index) => {
                    return (
                      <Col xs="2" key={index}>
                        <h3>
                          <Badge
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePickerColor(item)}
                            color={item.color}
                            pill
                          >
                            {category?.labelColor === item.color ? (
                              <Check
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '2px 1px 0px 1px'
                                }}
                              />
                            ) : (
                              <Dribbble
                                size={14}
                                style={{
                                  point: 'handler',
                                  float: 'center',
                                  margin: '2px 1px 0px 1px'
                                }}
                              />
                            )}
                          </Badge>
                        </h3>
                      </Col>
                    );
                  })}
                </Row>
              </div>
              {category?._id === '' ? (
                <div>
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    size="sm"
                    type="submit"
                    className="me-75"
                    onClick={handleSubmit}
                  >
                    Ok
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    size="sm"
                    color="primary"
                    onClick={handleResetFields}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    style={{ float: 'left', width: '45%' }}
                    color="primary"
                    size="sm"
                    type="submit"
                    className="me-75"
                    onClick={handleSubmit}
                    disabled={!category?.name || !category?.labelColor || !category?.type}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ float: 'right', width: '45%' }}
                    outline
                    size="sm"
                    color="primary"
                    onClick={handleResetFields}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </PerfectScrollbar>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}
