import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';

const Text = ({field, value, onChange, rowId}) => {
  return <Input
    type='text'
    minLength={field.isLimitCount && field.minCount ? parseInt(field.minCount, 10) : undefined}
    maxLength={field.isLimitCount && field.maxCount ? parseInt(field.maxCount, 10) : undefined}
    value={value || ''}
    onChange={e => {onChange(field, e.target.value, rowId)}}
  />
}

export default Text;