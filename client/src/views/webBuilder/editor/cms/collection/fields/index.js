import React, { useEffect, useState, useRef } from 'react';
import Text from './Text';
import RichText from './RichText';
import RichContent from './RichContent';
import Url from './Url';
import Number from './Number';
import Tag from './Tag';
import Boolean from './Boolean';
import Reference from './Reference';
import MultiReference from './MultiReference';
import Image from './Image';
import Video from './Video';
import Audio from './Audio';
import Document from './Document';
import MultiDocuments from './MultiDocuments';
import Date from './Date';
import Address from './Address';
import Time from './Time';
import ObjectField from './Object';
import ArrayField from './Array';

const CollectionField = ({field, type, value, onChange, isDefault, rowId}) => {
  switch (type) {
    case 'Text':
      return <Text field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Rich text':
      return <RichText field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Rich content':
      return <RichContent field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'URL':
      return <Url field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Number':
      return <Number field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Tags':
      return <Tag field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Boolean':
      return <Boolean field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Reference':
      return <Reference field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Multi-reference':
      return <MultiReference field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Image':
      return <Image field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Video':
      return <Video field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Audio':
      return <Audio field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Document':
      return <Document field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Multiple documents':
      return <MultiDocuments field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Date':
      return <Date field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Time':
      return <Time field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Address':
      return <Address field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
    case 'Object':
      return <ObjectField field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;  
    case 'Array':
      return <ArrayField field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;  
    default:
      return <Text field={field} value={value} onChange={onChange} isDefault={isDefault} rowId={rowId} />;
  }
}

export default CollectionField;