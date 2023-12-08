import React, { useEffect, useState, useRef } from 'react';
import { Tab } from 'bootstrap';
import { Nav, NavItem, TabContent, TabPane, NavLink, Label, Input } from 'reactstrap';
import { SiTruenas } from 'react-icons/si';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const DateSetting = ({fieldType, onChange, fieldData}) => {
  const [activeTab, setActiveTab] = useState('1');
  const [defaultVal, setDefaultVal] = useState('none');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (defaultVal === 'dateToAddItem') {
      onChange({ defaultValue: 'dateToAddItem'});
    }
    if (defaultVal === 'specificDate') {
      onChange({ defaultValue: 'specificDate', defaultDate: date});
    }
    if (defaultVal === 'none') {
      onChange({ defaultValue: 'none'});
    }
  }, [defaultVal]);

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
          <div className='mt-1 d-flex'>
            <Input type='checkbox' className='me-1' onChange={(e) => {onChange({ includeTime: e.target.checked})}} />
            Include time field
          </div>
          <hr/>
          <Label className="fs-6 mt-1" for="create-field-name">
            Help text (optional)
          </Label>
          <Input
            id='create-field-name'
            type='text'
            onChange={(e) => {onChange({ helpText: e.target.value })}}
          />
        </TabPane>
        <TabPane tabId="2">
          <div className='mt-1 d-flex'>
            <Input type='switch' className='me-1' onChange={(e) => {onChange({ isRequired: e.target.checked})}} />
            Make this a required field
          </div>
        </TabPane>
        <TabPane tabId="3">
          <Label className="fs-6" for="default-value">
            Default date
          </Label>
          <div className='d-flex align-items-center my-1'>
            <input type="radio" id="choice1" value="multiple" checked={defaultVal === 'none'} onClick={e => {setDefaultVal('none')}}/>
            <div className='ms-1'>
              <label for="choice1">No default date (empty)</label>
            </div>
          </div>
          <div className='d-flex align-items-center my-1'>
            <input type="radio" id="choice2" value="single" checked={defaultVal === 'dateToAddItem'} onClick={e => {setDefaultVal('dateToAddItem')}}/>
            <div className='ms-1'>
              <label for="choice2">The date the item is added</label>
            </div>
          </div>
          <div className='d-flex align-items-center my-1'>
            <input type="radio" id="choice2" value="single" checked={defaultVal === 'specificDate'} onClick={e => {setDefaultVal('specificDate')}}/>
            <div className='ms-1'>
              <label for="choice2">Specific date</label>
            </div>
          </div>
          {
            defaultVal === 'specificDate' && (
              <Flatpickr
                required
                className='form-control w-50'
                value={date}
                onChange={(date) => {
                  setDate(date[0]);
                }}
                options={{
                  enableTime: false,
                  dateFormat: 'Y-m-d H:i'
                }}  
              />
            )
          }
        </TabPane>
      </TabContent>
    </div>
  );
};

export default DateSetting;