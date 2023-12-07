import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Boolean = ({field, onChange}) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    onChange({[field.name]: field.defaultValue})
    setValue(field.defaultValue);
  }, [field.defaultValue]);
  return <Input type='checkbox' checked={value} onChange={e => {onChange({[field.name]: e.target.checked}); setValue(e.target.checked)}} />
}

export default Boolean;