import { useEffect, useState } from 'react';
import { Plus, ChevronLeft, Trash, MoreVertical, Edit, Home, Lock } from 'react-feather';
import {
  Badge,
  Button,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import '../../../src/assets/styles/jaornal.scss';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import CreateFormCategoryModal from './createForm/CreateFormCategoryModal';
import { deleteFormCategoryAction } from './store/action';
import { getUserData } from '../../auth/utils';

const CategorySidebar = ({
  collapse,
  handleCategoryCollapse,
  checkedCategoryData,
  setCheckedCategoryData,
  noAction,
  selectedType,
  store,
  dispatch
}) => {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const user = getUserData();
  const [categories, setCategories] = useState({});

  const toggleAddCategory = () => setOpenAddCategory(!openAddCategory);

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    //  console.log(value)
    if (isChecked) {
      setCheckedCategoryData([...checkedCategoryData, value]);
    } else {
      const filteredList = checkedCategoryData.filter((item) => item !== value);
      setCheckedCategoryData(filteredList);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this journal category?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFormCategoryAction(id));
      }
    });
  };
  useEffect(() => {
    if (selectedType && selectedType !== null && selectedType !== '') {
      setCategories(store?.formCategories.filter((x) => x.type === selectedType));
    } else {
      const newCategoryList = {
        Sales: store?.formCategories.filter((item) => item.type === 'sales'),
        Email: store?.formCategories.filter((item) => item.type === 'email'),
        Leads: store?.formCategories.filter((item) => item.type === 'leads'),
        Forms: store?.formCategories.filter((item) => item.type === 'forms'),
        Website: store?.formCategories.filter((item) => item.type === 'websites')
      };
      setCategories(newCategoryList);
    }
  }, [selectedType]);

  return (
    <div className="project-sidebar joru-side-height h-100 content-left" style={{ width: '260px' }}>
      <div className="sidebar-content task-sidebar h-100">
        <div className="task-app-menu h-100 d-flex flex-column">
          <ListGroup
            className={`sidebar-menu-list ${collapse ? 'd-none' : 'd-block'}`}
            options={{ wheelPropagation: false }}
          >
            <div className="d-flex justify-content-between align-items-center px-1 pb-2 pt-1">
              <Home size={20} />
              <div style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>CATEGORIES</div>
              <Button
                className="btn-icon btn-toggle-sidebar"
                color="flat-dark"
                onClick={handleCategoryCollapse}
              >
                {collapse ? null : <ChevronLeft size={18} />}
              </Button>
            </div>
            {selectedType ? (
              Array.isArray(categories) &&
              categories.map((value, i) => (
                <ListGroupItem key={i} className={`ws-name list-item ps-lft`}>
                  <div className="d-flex align-items-center">
                    <div className="action-left form-check flex-1">
                      <Input
                        type="checkbox"
                        id={value?._id}
                        value={value?._id}
                        onChange={handleSelect}
                      />
                      <Label className="form-check-label fw-bolder ps-25 mb-0" htmlFor={value?._id}>
                        {value?.name}
                      </Label>
                    </div>
                    <Badge
                      className="jrnl-badge me-1 d-flex align-items-center"
                      color="light-primary"
                      style={{ float: 'right', position: 'relative', left: '20px' }}
                      pill
                    >
                      {value.count ? value.count : 0}
                    </Badge>
                    <span className={`${noAction ? 'hidden' : ''}`} style={{ width: '15%' }}>
                      {user.id===value.userId ?<UncontrolledDropdown>
                        <DropdownToggle
                          className="btn btn-sm py-0"
                          tag="div"
                          href="/"
                          style={{ width: '20px', position: 'relative', left: '10px' }}
                        >
                          <MoreVertical className="text-body" size={16} />
                        </DropdownToggle>
                        <DropdownMenu end>
                        
                          <DropdownItem
                            onClick={() => handleDelete(value?._id)}
                            tag={'span'}
                            className="w-100"
                          >
                            <Trash size={'14px'} style={{ marginRight: '10px' }} />
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>:<Lock size={15} className='text-muted'/> }
                      
                    </span>
                  </div>
                </ListGroupItem>
              ))
            ) : (
              <>
                <div className="jrnl_wrapper_sidebar">
                  {categories &&
                    Object.entries(categories).map(([key, categoryList]) => (
                      <>
                        {!!categoryList.length && (
                          <>
                            <h5 className="m-0 ps-1" key={key}>
                              <strong>{key}</strong>
                            </h5>
                            {Array.isArray(categoryList) &&
                              categoryList.map((value, i) => (
                                <ListGroupItem
                                  key={'email-category-' + value?._id}
                                  className={`ws-name list-item ps-lft`}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="action-left form-check flex-1">
                                      <Input
                                        type="checkbox"
                                        id={value?._id}
                                        value={value?._id}
                                        onChange={handleSelect}
                                      />
                                      <Label
                                        className="form-check-label fw-bolder ps-25 mb-0"
                                        htmlFor={value?._id}
                                      >
                                        {value?.name}
                                      </Label>
                                    </div>
                                    <Badge
                                      className="jrnl-badge me-1 d-flex align-items-center"
                                      color="light-primary"
                                      style={{ float: 'right', position: 'relative', left: '20px' }}
                                      pill
                                    >
                                      {value.count ? value.count : 0}
                                    </Badge>
                                    <span
                                      className={`${noAction ? 'hidden' : ''}`}
                                      style={{ width: '15%' }}
                                    >
                                      
                                      {user?.id === value?.userId ? (
                                        <UncontrolledDropdown>
                                          <DropdownToggle
                                            className="btn btn-sm py-0"
                                            tag="div"
                                            href="/"
                                            style={{
                                              width: '20px',
                                              position: 'relative',
                                              left: '10px'
                                            }}
                                          >
                                            <MoreVertical className="text-body" size={16} />
                                          </DropdownToggle>
                                          <DropdownMenu end>
                                            <DropdownItem
                                              onClick={() => handleDelete(value?._id)}
                                              tag={'span'}
                                              className="w-100"
                                            >
                                              <Trash
                                                size={'14px'}
                                                style={{ marginRight: '10px' }}
                                              />
                                              Delete
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledDropdown>
                                      ) : (
                                        <Lock size={15} className="text-muted" />
                                      )}
                                    </span>
                                  </div>
                                </ListGroupItem>
                              ))}
                          </>
                        )}
                      </>
                    ))}
                </div>
              </>
            )}
          </ListGroup>
          <div
            className={`${
              noAction ? 'hidden' : ''
            } project-create-workspace-btn my-1 btn text-center`}
            style={{ width: '100%' }}
          >
            <Button color="primary" className="m-auto" outline onClick={toggleAddCategory}>
              <Plus size={14} className="me-25" />
              &nbsp;&nbsp;New Category
            </Button>
          </div>
        </div>
      </div>
      <CreateFormCategoryModal
        toggle={toggleAddCategory}
        open={openAddCategory}
        store={store}
        dispatch={dispatch}
      />
    </div>
  );
};

export default CategorySidebar;
