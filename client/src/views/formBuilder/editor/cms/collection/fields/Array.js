import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const ArrayField = ({field, value, onChange, rowId}) => {
  return <Input type='text' value={value || ''} onChange={e => {onChange(field, e.target.value, rowId)}}/>
}

export default ArrayField;