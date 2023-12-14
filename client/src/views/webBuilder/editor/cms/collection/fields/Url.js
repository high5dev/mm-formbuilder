import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Url = ({field, value, onChange, isDefault, rowId}) => {
  return <Input type='url' value={value || ''} onChange={e => {onChange(field, e.target.value, rowId)}} disabled={isDefault} />
}

export default Url;