import React from 'react';

export default function AdvanceTab({ editor }) {
  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  // const getSelectedHtml = () => {
  //   return editor.getSelected();
  // };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  return (
    <div></div>
  );
}
