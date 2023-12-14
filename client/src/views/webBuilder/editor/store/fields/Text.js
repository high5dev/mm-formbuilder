import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Text = ({ field, value, onChange, onBlur, isDefault, index }) => {
  const [fieldValue, setFieldValue] = useState(value);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChangeFieldValue = (field, updatedValue, index) => {
    setFieldValue(updatedValue);
    // onChange(field, updatedValue, index);
  }
  return <Input type='text' value={fieldValue} onChange={e => { handleChangeFieldValue(field, e.target.value, index) }} onBlur={e => { onBlur(field, e.target.value, index) }} disabled={isDefault} />
}

export default Text;