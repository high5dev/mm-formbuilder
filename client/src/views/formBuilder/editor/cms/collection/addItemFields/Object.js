import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const ObjectField = ({field, onChange, isDefault}) => {
  const [value, setValue] = useState(field.defaultValue || '');

  useEffect(() => {
    if (field.defaultValue)
      onChange({[field.name]: field.defaultValue});
  }, [field.defaultValue]);

  return <Input
      type='textarea'
      value={value}
      onChange={e => {onChange({[field.name]: e.target.value}); setValue(e.target.value);}}
    />;
}

export default ObjectField;