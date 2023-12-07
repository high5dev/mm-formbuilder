import React, { useEffect, useState, useRef } from 'react';
import TextSetting from './TextSetting';
import RichTextSetting from './RichTextSetting';
import RichContentSetting from './RichContentSetting';
import URLSetting from './URLSetting';
import TagSetting from './TagSetting';
import BooleanSetting from './BooleanSetting';
import ReferenceSetting from './ReferenceSetting';
import ImageSetting from './ImageSetting';
import MediaGallerySetting from './MediaGallerySetting';
import VideoSetting from './VideoSetting';
import AudioSetting from './AudioSetting';
import DocumentSetting from './DocumentSetting';
import DateSetting from './DateSetting';
import TimeSetting from './TimeSetting';
import AddressSetting from './AddressSetting';
import ObjectSetting from './ObjectSetting';

const FieldSetting = ({fieldType, onChange, fieldData}) => {
  switch (fieldType?.name) {
    case 'Text':
      return <TextSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Rich text':
      return <RichTextSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Rich content':
      return <RichContentSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'URL':
      return <URLSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Number':
      return <URLSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Tags':
      return <TagSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Boolean':
      return <BooleanSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Reference':
    case 'Multi-reference':
      return <ReferenceSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Image':
      return <ImageSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Media gallery':
      return <MediaGallerySetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Video':
      return <VideoSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Audio':
      return <AudioSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Document':
    case 'Multiple documents':
      return <DocumentSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Date':
      return <DateSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Time':
      return <TimeSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Address':
      return <AddressSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    case 'Object':
    case 'Array':
      return <ObjectSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
    default:
      return <TextSetting fieldType={fieldType} onChange={onChange} fieldData={fieldData} />;
  }
}

export default FieldSetting;