import sectionColumn1 from './column/column-1';
import sectionColumn2 from './column/column-2';
import sectionColumn3 from './column/column-3';
import sectionColumn4 from './column/column-4';
import sectionColumn5 from './column/column-5';
import sectionColumn6 from './column/column-6';
import sectionColumnLeft from './column/column-left';
import sectionColumnRight from './column/column-right';
import headingType from './heading/heading';
import Imageupload from './Image/Imageupload';
import paragraphType from './paragraph/paragraph';
import sectionFullWidth from './section-collapse/section-full-width';
import sectionMedium from './section-collapse/section-medium';
import sectionSmall from './section-collapse/section-small';
import sectionWide from './section-collapse/section-wide';

//** FORM TYPES */
export const formBuilderPlugin = (editor) => {
  //Sections
  editor.DomComponents.addType('section-wide', sectionWide);
  editor.DomComponents.addType('section-full-width', sectionFullWidth);
  editor.DomComponents.addType('section-medium', sectionMedium);
  editor.DomComponents.addType('section-small', sectionSmall);
  editor.DomComponents.addType('short-image', Imageupload);
  //Columns
  editor.DomComponents.addType('column-1', sectionColumn1);
  editor.DomComponents.addType('column-2', sectionColumn2);
  editor.DomComponents.addType('column-3', sectionColumn3);
  editor.DomComponents.addType('column-4', sectionColumn4);
  editor.DomComponents.addType('column-5', sectionColumn5);
  editor.DomComponents.addType('column-6', sectionColumn6);
  editor.DomComponents.addType('column-left', sectionColumnLeft);
  editor.DomComponents.addType('column-right', sectionColumnRight);
  editor.DomComponents.addType('heading', headingType);
  editor.DomComponents.addType('paragraph', paragraphType);

};
