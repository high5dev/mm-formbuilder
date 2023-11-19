import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import { setFormReducer } from '../../store/reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Settings } from 'react-feather';
import CreateFormCategoryModal from '../CreateFormCategoryModal';
import { createFormAction, createWebBuilderAction } from '../../store/action';
const typeOptions = [
  { value: 'leads', label: 'Leads' },
  { value: 'sales', label: 'Sales' },
  { value: 'email', label: 'Emails' },
  { value: 'forms', label: 'Forms' },
  { value: 'website', label: 'Websites' }
];
export default function FormInfoStep({ form, setForm, store, dispatch, stepper }) {
  const [categories, setCategories] = useState([]);
  const [openCreateCategory,setOpenCreateCategory] = useState(false)

  const history = useHistory()
  
  const toggleOpenCreateCategory = () => setOpenCreateCategory(!openCreateCategory)
  const handleSelectFormType = (type) => {
    setForm({ ...form, formType: type });
    const cats = store?.formCategories
      .filter((x) => x.type === type)
      .map((y) => {
        return { ...y, label: y.name, value: y._id };
      });
    setCategories(cats);
  };
  const handleCreateForm = () => {
    dispatch(setFormReducer(form));
    dispatch(createWebBuilderAction({...form, clonedFrom: 'blank'})).then(res=>{
      localStorage.setItem('pageNum', 1);
      history.push(`/form-funnel/create/${form?.formType}/${form.isTemplate===true?"template":"form"}/${res._id}`);
    })
   
    //toggle();
  };

  return (
    <div>
      <div>
        <Label>Name</Label>
        <Input type="text" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      </div>
      <div>
        <Label>Goal</Label>
        <Select options={typeOptions} onChange={(data) => handleSelectFormType(data.value)} />
      </div>
      {form?.isTemplate === true && (
        <div>
          <div className='d-flex justify-content-between'>
          <Label>Category</Label>
          <Settings size={15} className='cursor-pointer' onClick={toggleOpenCreateCategory}/>
          </div>
          <Select options={categories} onChange={(data)=>setForm({...form,subCategory:data.value})} />
        </div>
      )}

      <div className="d-flex justify-content-end mt-1">
        <Button color="primary" onClick={handleCreateForm}>
          Next
        </Button>
      </div>
      <CreateFormCategoryModal toggle={toggleOpenCreateCategory} open={openCreateCategory}/>
    </div>
  );
}
