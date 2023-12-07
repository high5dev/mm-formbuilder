import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Url = ({field, onChange}) => {
  const [value, setValue] = useState(field.defaultValue || '');

  useEffect(() => {
    if (field.defaultValue)
      onChange({[field.name]: field.defaultValue});
  }, [field.defaultValue]);

  return <Input
    type='url'
    value={value}
    onChange={e => {onChange({[field.name]: e.target.value}); setValue(e.target.value);}}
  />;
}

export default Url;