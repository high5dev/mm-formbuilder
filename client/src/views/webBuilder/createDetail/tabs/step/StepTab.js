import React, { Fragment, useEffect, useState } from 'react';
import { Copy , ChevronDown, MoreVertical, Edit, Trash} from 'react-feather';
import DataTable from 'react-data-table-component';
import { BsFillEyeFill } from 'react-icons/bs';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row,  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { cloneFormAction, deleteFormAction, getWebsiteEntryAction, deleteWebsiteEntryAction, editWebsiteEntryAction } from '../../../store/action';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import EditEntryModal from './entry/EditEntryModal';
import { getUserData } from '../../../../../auth/utils';
// import { getShopByUserAction } from '../../../../shops/store/action';

export default function StepTab({ store, step, active, dispatch, isMobileView, isTabletView }) {
  const organization = JSON.parse(localStorage.getItem('organization'));
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [displayData, setDisplayData]=useState([]);
  const [columns, setColumns]=useState([]);
  const [selectedRow, setSelectedRow]=useState();
  const [openEditEntry, setOpenEditEntry]=useState(false);
  const [formEntries, setFormEntries]=useState([]);
  const [count, setCount] = useState(1);
  // ** STATES
  const [openEditor, setOpenEditor] = useState(false);
  const user = getUserData();
  // ** FUNCTIONS
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `https://${organization ? organization.path : 'me'}.mymanager.com/web-preview/${store.form._id
      }&path=${step.path}`
    );
    toast.success('URL copied!');
  };

  const history = useHistory();
  // ** Toggle
  const toggleEditor = () => {
    localStorage.removeItem('gjsProject');
    history.push(`/webpages/editor/${store?.form._id}`);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleClone = () => {
    const payload = {
      userId: getUserData().id,
      name: store.form.name,
      memberType: store.form.memberType,
      automateEntry: store.form.automateEntry,
      smartList: store.form.smartList,
      subCategory: store.form.subCategory,
      formType: store.form.formType,
      formData: [...store.form.formData],
      clonedFrom: store.form._id,
      isTemplate: store.form.isTemplate
    };
    dispatch(cloneFormAction(payload)).then((res) => {
      history.push(`/form-funnel/form-setting/${res}`);
    });
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteForm = async () => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'When a Funnel deleted, it gets unaccessible. Are you sure you want to delete the funnel? ',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      dispatch(deleteFormAction(store.form._id));
      history.push('/form-funnel');
    }
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const CustomPagination = () => {
    return (
      <>
        <div className="justify-content-end d-flex">
          <div className='my-auto'>
            <div className="d-flex  justify-content-end">
              {/* <label htmlFor="rows-per-page">Show</label> */}
              <Input
                className="mx-50"
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                style={{ width: '5rem' }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
              <label htmlFor="rows-per-page" className='my-auto'>Per Page</label>
            </div>
          </div>
          <div className='ms-1'>
          <ReactPaginate
              previousLabel={''}
              nextLabel={''}
              pageCount={count || 1}
              activeClassName="active"
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              onPageChange={(page) => handlePagination(page)}
              pageClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousClassName={'page-item prev'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />
          </div>
         
        </div>
       
      </>
    );
  };

  const handleEdit=(row)=>{
    setSelectedRow({...row});
    setOpenEditEntry(true);
  }

  const handleRemove=(row)=>{
    dispatch(deleteWebsiteEntryAction(row['id'])).then((res)=>{
      if(res){
        const formId=active;
        dispatch(getWebsiteEntryAction(formId)).then(res=>{
          if(res){
            const formData=res[0];
            let entries=formData.entries;
            let data=[];
            entries && entries.map((entry)=>{
              if(!entry.isDelete){
                const values=entry.values;
                let obj={};
                values && values.map((_objVal)=>{
                  const key=_objVal.name;
                  const value=_objVal.value;
                  obj[key]=value;
                });
                obj={...obj, id:entry._id};
                data.push(obj);
              }
            });
            setDisplayData([...data]);
          }
       })
      }
    })
  }

  const saveEntry=(data)=>{
    if(data){
      const formEntry=formEntries && formEntries.filter((_item)=>_item._id===data['id']);
      let values=formEntry[0].values;
      values && values.map((_value)=>{
        const fieldName=_value.name;
        _value.value=data[fieldName];
        return _value
      });
      const payload={values:values};
      dispatch(editWebsiteEntryAction(data['id'], payload)).then(res=>{
        if(res){
          const formId=active;
          dispatch(getWebsiteEntryAction(formId)).then(res=>{
            if(res){
              const formData=res[0];
              let entries=formData.entries;
              let data=[];
              entries && entries.map((entry)=>{
                if(!entry.isDelete){
                  const values=entry.values;
                  let obj={};
                  values && values.map((_objVal)=>{
                    const key=_objVal.name;
                    const value=_objVal.value;
                    obj[key]=value;
                  });
                  obj={...obj, id:entry._id};
                  data.push(obj);
                }
              });
              setDisplayData([...data]);
            }
         })
        }
      })
    }

  }

  const _toggle=(_open)=>{
    setOpenEditEntry(_open);
  }

  useEffect(() =>{
    if(active!=''){
      const formId=active;
      dispatch(getWebsiteEntryAction(formId)).then(res=>{
        if(res){
          const formData=res[0];
          const fields=formData.elements && formData.elements.map((_element)=>_element.name);
          let entries=formData.entries;
          setFormEntries([...entries]);
          let data=[];
          entries && entries.map((entry)=>{
            if(!entry.isDelete){
              const values=entry.values;
              let obj={};
              values && values.map((_objVal)=>{
                const key=_objVal.name;
                const value=_objVal.value;
                obj[key]=value;
              });
              obj={...obj, id:entry._id};
              data.push(obj);
            }
          });
          setDisplayData([...data]);
          let columns=[];
          fields && fields.map((_field)=>{
              const item={        
                name:  _field.charAt(0).toUpperCase() + _field.slice(1),
                sortable: 'true',
                selector: (row) => row[_field],
                cell: (row) => {
                return(<span>{row[_field]}</span>)
              }
              };
              columns.push(item);
          });
          const actionItem={
            name: 'Action',
            selector: (row) => row['id'],
            cell: (row) => (
              <>
                  <div className="column-action">
                    <UncontrolledDropdown >
                      <DropdownToggle tag="div" className="btn btn-sm">
                        <MoreVertical size={14} className="cursor-pointer" />
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem tag="span" className="w-100" onClick={() => handleEdit(row)}>
                            <Edit size={14} className="me-50" />
                            <span className="align-middle">Edit</span>
                          </DropdownItem>
                          <DropdownItem tag="span" className="w-100" onClick={() => handleRemove(row)}>
                            <Trash size={14} className="me-50" />
                            <span className="align-middle">Remove</span>
                          </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

              </>
            )
          };
          columns.push(actionItem);
          
          setColumns([...columns]);
        }
      })
    }
  }, [active, currentPage])

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  return (
    <Fragment>
      <div className="m-1">
        <div className='form-data-table' style={{minHeight:'500px'}}>
          <h4 className='mb-1'>Form Entry</h4>
          {
            displayData.length >0 ? <DataTable
            header
            sortServer
            pagination
            responsive
            paginationServer
            selectableRows
            paginationPerPage={10}
            className="react-dataTable"
            data={displayData}
            style={{ cursor: 'pointer' }}
            sortIcon={<ChevronDown size={14} />}
            columns={columns}
            // onRowClicked={handleDetails}
            pointerOnHover="cursor"
            paginationComponent={CustomPagination}
          />:<div className=''>No available entry items here.</div>
          }

        </div>
      </div>
      <EditEntryModal open={openEditEntry} dispatch={dispatch} entry={selectedRow} toggle={_toggle} saveEntry={saveEntry}/>
    </Fragment>
  );
}
