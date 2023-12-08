import React, { useEffect, useState, useRef } from 'react';
import TextSetting from './TextSetting';

const FieldSetting = ({fieldType, onChange, fieldData}) => {
  switch (fieldType?.name) {
    case 'text':
      return <TextSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    default:
      return <TextSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
  }
}

export default FieldSetting;