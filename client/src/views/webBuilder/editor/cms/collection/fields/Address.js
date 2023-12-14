import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Address = ({field, value, onChange, isDefault, rowId}) => {
  return <Input type='text' value={value} onChange={e => {onChange(field, e.target.value, rowId)}} disabled={isDefault} />
}

export default Address;