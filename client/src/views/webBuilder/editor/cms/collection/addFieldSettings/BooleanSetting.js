import React, { useEffect, useState, useRef } from 'react';
import { Tab } from 'bootstrap';
import { Nav, NavItem, TabContent, TabPane, NavLink, Label, Input } from 'reactstrap';
import { SiTruenas } from 'react-icons/si';

const BooleanSetting = ({fieldType, onChange, fieldData}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [defVal, setDefVal] = useState(fieldData.defaultValue ? 'checked' : 'unchecked');

  useEffect(() => {
    onChange({ defaultValue: defVal === 'checked' });
  }, [defVal])

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
            Validations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
            Default value
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Label className="fs-6" for="create-field-type">
            Field type *
          </Label>
          <Input
            id='create-field-type'
            className='w-50'
            type='text'
            value={fieldType.name}
            disabled
          />
          <Label className="fs-6 mt-1" for="create-field-name">
            Field name *
          </Label>
          <Input
            id='create-field-name'
            className='w-50'
            placeholder="e.g., title"
            type='text'
            value={fieldData?.name || ''}
            onChange={(e) => {
              onChange({ name: e.target.value })
            }}
          />
          <hr/>
          <Label className="fs-6 mt-1" for="create-field-name">
            Help text (optional)
          </Label>
          <Input
            id='create-field-name'
            type='text'
            onChange={(e) => {onChange({ helpText: e.target.value })}}
          />
          <div className='mt-1 d-flex'>
            <Input type='switch' className='me-1' onChange={(e) => {onChange({ isEncrypt: e.target.checked })}} />
            Encrypt this field content as Personally Identifiable Information
          </div>
        </TabPane>
        <TabPane tabId="2">
          <div className='mt-1 d-flex'>
            <Input type='switch' className='me-1' onChange={(e) => {onChange({ isRequired: e.target.checked })}} />
            Make this a required field
          </div>
        </TabPane>
        <TabPane tabId="3">
          <Label className="fs-6" for="default-value">
            Default boolean selection
          </Label>
          <div className='d-flex align-items-center my-1'>
            <input type="radio" id="choice1" value="multiple" checked={defVal === 'unchecked'} onClick={() => {setDefVal('unchecked')}}/>
            <div className='ms-1'>
              <b><span className="mb-0" for="choice1">False - </span></b>
              <label for="choice1">checkbox is unchecked by default</label>
            </div>
          </div>
          <div className='d-flex align-items-center my-1'>
            <input type="radio" id="choice2" value="single" checked={defVal === 'checked'} onClick={() => {setDefVal('checked')}}/>
            <div className='ms-1'>
              <b><span className="mb-0" for="choice2">True - </span></b>
              <label for="choice2">checkbox is checked by default</label>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default BooleanSetting;