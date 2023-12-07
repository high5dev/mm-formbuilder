import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { selectThemeColors } from '@utils'

const animatedComponents = makeAnimated();

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MultiReference = ({field, onChange, isDefault}) => {
  const [collections, setCollections] = useState([]);
  return <Select
    className="react-select"
    classNamePrefix="select"
    components={animatedComponents}
    closeMenuOnSelect={false}
    defaultValue={[]}
    isClearable={true}
    isMulti
    options={options}
    theme={selectThemeColors}
    onChange={(data) => {
      onChange({[field.name]: data});
    }}
  />;
}
export default MultiReference;