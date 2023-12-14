import React, { useState } from 'react';
import FontFamily from '../configuration/fontfamily';

export default function SettingsTab({ editor, dispatch, store, step,open }) {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getSelectedHtml = () => {
    return editor.getSelected();
  };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  return (
   <div></div>
  );
}
