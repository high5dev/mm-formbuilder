import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Reference = ({field, value, onChange, isDefault, rowId}) => {
  const [collections, setCollections] = useState([]);
  return <Select
    id="mdl-select-main-menu"
    className="react-select"
    classNamePrefix="select"
    isClearable={true}
    options={options}
    theme={selectThemeColors}
    onChange={(data) => {
    }}
  />;
}

export default Reference;