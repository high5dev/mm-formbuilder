import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Number = ({field, onChange}) => {
  const [value, setValue] = useState(field.defaultValue || '');

  useEffect(() => {
    if (field.defaultValue)
      onChange({[field.name]: field.defaultValue});
  }, [field.defaultValue]);

  return <Input type='number' value={value} onChange={e => {onChange({[field.name]: e.target.value}); setValue(e.target.value);}} />
}

export default Number;