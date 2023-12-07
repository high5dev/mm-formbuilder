import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'reactstrap';
import RichTextEditModal from './RichTextEditModal';

const RichText = ({field, value, onChange, isDefault, rowId}) => {
  const [openRTEModal, setOpenRTEModal] = useState(false);

  const toggle = () => {
    setOpenRTEModal(!openRTEModal);
  };

  const onChangeValue = (v) => {
    onChange(field, v, rowId);
  };

  return <>
    <Input
      type='text'
      value={value}
      disabled={isDefault}
      onClick={() => {
        setOpenRTEModal(true);
      }}
    />
    <RichTextEditModal open={openRTEModal} toggle={toggle} value={value} onChange={onChangeValue} />
  </>;
}

export default RichText;