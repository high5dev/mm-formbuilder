import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Text = ({field, onChange}) => {
  const [value, setValue] = useState(field.defaultValue || '');

  useEffect(() => {
    if (field.defaultValue)
      onChange({[field.name]: field.defaultValue});
  }, [field.defaultValue]);

  return <Input
      type='text'
      minLength={field.isLimitCount && field.minCount ? parseInt(field.minCount, 10) : undefined}
      maxLength={field.isLimitCount && field.maxCount ? parseInt(field.maxCount, 10) : undefined}
      value={value}
      onChange={e => {onChange({[field.name]: e.target.value}); setValue(e.target.value);}}
    />;
}

export default Text;