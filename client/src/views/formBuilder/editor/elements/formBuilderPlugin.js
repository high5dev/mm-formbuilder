import firstname from '../elements/form/firstname';
import lastname from '../elements/form/lastname';
import email from '../elements/form/email';
import phone from '../elements/form/phone';
import address from '../elements/form/address';
import position from '../elements/form/position';
import companyName from '../elements/form/companyName';
import vatId from '../elements/form/vatId';
import birthday from '../elements/form/birthday';
import subscribe from '../elements/form/subscribe';
import { formblocks } from "./FormBlocks";

export const formBuilderPlugin = (editor) => {
  editor.DomComponents.addType('first-name', firstname);
  editor.DomComponents.addType('last-name', lastname);
  editor.DomComponents.addType('email', email);
  editor.DomComponents.addType('phone', phone);
  editor.DomComponents.addType('birthday', birthday);
  editor.DomComponents.addType('address', address); 
  editor.DomComponents.addType('position', position);
  editor.DomComponents.addType('subscribe', subscribe);
  editor.DomComponents.addType('company-name',companyName);
  editor.DomComponents.addType('vat-id', vatId);  
  formblocks.forEach(block => {
    editor.Blocks.add(block.id, block);
  })
}