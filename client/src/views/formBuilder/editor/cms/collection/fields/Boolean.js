import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Boolean = ({field, value, onChange, rowId}) => {
  return <Input type='checkbox' className='ms-1' checked={value} onChange={e => {onChange(field, e.target.checked, rowId)}} />
}

export default Boolean;