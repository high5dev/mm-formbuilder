import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Number = ({field, value, onChange, isDefault, rowId}) => {
  return <Input type='number' value={value || ''} onChange={e => {onChange(field, e.target.value, rowId)}} disabled={isDefault} />
}

export default Number;