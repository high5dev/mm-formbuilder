import React, { useEffect, useState, useRef } from 'react';
import Text from './Text';

const AddItemField = ({field, type, onChange}) => {
  switch (type) {
    case 'text':
      return <Text field={field} onChange={onChange}/>;
    default:
      return <Text field={field} onChange={onChange}/>;
  }
}

export default AddItemField;