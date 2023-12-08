import React, { useEffect, useState, useRef } from 'react';
import Text from './Text';

const CollectionField = ({field, type, value, onChange, isDefault}) => {
  switch (type) {
    case 'text':
      return <Text field={field} value={value} onChange={onChange} isDefault={isDefault}/>;
    default:
      return <Text field={field} value={value} onChange={onChange} isDefault={isDefault}/>;
  }
}

export default CollectionField;