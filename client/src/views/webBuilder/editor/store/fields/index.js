import React, { useEffect, useState, useRef } from 'react';
import Text from './Text';

const CollectionField = ({ field, type, value, onChange, onBlur, isDefault, index }) => {
  switch (type) {
    case 'text':
      return <Text field={field} value={value} onChange={onChange} onBlur={onBlur} isDefault={isDefault} index={index} />;
    default:
      return <Text field={field} value={value} onChange={onChange} onBlur={onBlur} isDefault={isDefault} index={index} />;
  }
}

export default CollectionField;