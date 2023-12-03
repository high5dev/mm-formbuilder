import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Text = ({field, value, onChange, isDefault}) => {
  return <Input type='text' value={value} onChange={e => {onChange(field, e.target.value)}} disabled={isDefault} />
}

export default Text;