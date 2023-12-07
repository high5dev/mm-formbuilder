import React, { useEffect, useState, useRef } from 'react';
import { Tab } from 'bootstrap';
import { Nav, NavItem, TabContent, TabPane, NavLink, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils'
import { useSelector } from 'react-redux';

const ReferenceSetting = ({fieldType, onChange, fieldData}) => {
  const [activeTab, setActiveTab] = useState('1');
  const store = useSelector(store => store.formEditor);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (store.webCollections.length > 0) {
      const tempCols = [];
      store.webCollections.map(c => {
        tempCols.push({value: c._id, label: c.name});
      });
      setCollections(tempCols);
    }
  }, [store.webCollections]);

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
          <Label className="fs-6 mt-1" for="create-field-name">
            Referenced Collection *
          </Label>
          <Select
            id="mdl-select-main-menu"
            className="react-select mb-1 w-50"
            classNamePrefix="select"
            isClearable={false}
            options={collections}
            theme={selectThemeColors}
            onChange={(data) => {
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
        </TabPane>
        <TabPane tabId="2">
          <div className='mt-1 d-flex'>
            <Input type='switch' className='me-1' onChange={(e) => {onChange({ isRequired: e.target.checked })}} />
            Make this a required field
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ReferenceSetting;