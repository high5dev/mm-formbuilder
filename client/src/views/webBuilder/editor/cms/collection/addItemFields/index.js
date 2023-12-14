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
import Time from './Time';
import Address from './Address';
import ObjectField from './Object';
import ArrayField from './Array';

const AddItemField = ({field, type, onChange}) => {
  switch (type) {
    case 'Text':
      return <Text field={field} onChange={onChange}/>;
    case 'Rich text':
      return <RichText field={field} onChange={onChange} />;
    case 'Rich content':
      return <RichContent field={field} onChange={onChange} />;
    case 'URL':
      return <Url field={field} onChange={onChange} />;
    case 'Number':
      return <Number field={field} onChange={onChange} />;
    case 'Tags':
      return <Tag field={field} onChange={onChange} />;
    case 'Boolean':
      return <Boolean field={field} onChange={onChange} />;
    case 'Reference':
      return <Reference field={field} onChange={onChange} />;
    case 'Multi-reference':
      return <MultiReference field={field} onChange={onChange} />;
    case 'Image':
      return <Image field={field} onChange={onChange} />;
    case 'Video':
      return <Video field={field} onChange={onChange} />;
    case 'Audio':
      return <Audio field={field} onChange={onChange} />;
    case 'Document':
      return <Document field={field} onChange={onChange} />;
    case 'Multiple documents':
      return <MultiDocuments field={field} onChange={onChange} />;
    case 'Date':
      return <Date field={field} onChange={onChange} />;
    case 'Time':
      return <Time field={field} onChange={onChange} />;
    case 'Address':
      return <Address field={field} onChange={onChange} />;
    case 'Object':
      return <ObjectField field={field} onChange={onChange} />;
    case 'Array':
      return <ArrayField field={field} onChange={onChange} />;
    default:
      return <Text field={field} onChange={onChange}/>;
  }
}

export default AddItemField;