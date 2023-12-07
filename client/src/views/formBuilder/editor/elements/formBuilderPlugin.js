import shortanswer from '../elements/form/shortanswer'
import longanswer from '../elements/form/longanswer';
import number from '../elements/form/number';
import link from '../elements/form/link';
import checkbox from '../elements/form/checkbox';
import singleChoice from '../elements/form/singlechoice';
import multichoice from '../elements/form/multichoice';
import dropdown from '../elements/form/dropdown';
import submit from '../elements/form/submit';
import birthday from '../elements/form/birthday';
import subscribe from '../elements/form/subscribe';
import { formblocks } from "./FormBlocks";

export const formBuilderPlugin = (editor) => {
  editor.DomComponents.addType('short-answer',shortanswer);
  editor.DomComponents.addType('long-answer', longanswer);
  editor.DomComponents.addType('number', number);
  editor.DomComponents.addType('form-link', link);
  editor.DomComponents.addType('checkbox', checkbox);
  editor.DomComponents.addType('single-choice', singleChoice);
  editor.DomComponents.addType('multi-choice', multichoice);
  editor.DomComponents.addType('dropdown', dropdown);
  editor.DomComponents.addType('submit', submit);
  formblocks.forEach(block => {
    editor.Blocks.add(block.id, block);
  })
}