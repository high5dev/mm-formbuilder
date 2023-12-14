import React from 'react';


function ThemeTab({ editor }) {
  //  console.log(editor?.getSelected()?.attributes?.name
  //  )

  const getSelectedHtmlElement = () => {
    return editor.getSelected().getChildAt(0);
  };
  const getWrapperHtmlElement = () => {
    return editor.DomComponents.getWrapper();
  };
  // const getSelectedHtml = () => {
  //   return editor.getSelected();
  // };
  return (
    <div>
     
    </div>
  );
}

export default ThemeTab;
