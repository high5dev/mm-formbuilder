import { GiConsoleController } from "react-icons/gi";
import repeater from "./repeater/repeater"
import repeaterItem from "./repeater/repeaterItem";

export const webBuilderPlugin = (editor) => {
  editor.DomComponents.addType('repeater-item', repeaterItem);
  editor.DomComponents.addType('repeater', repeater);

  editor.Blocks.add('repeater', {
    label: 'Repeater',
    attributes: { class: 'fa fa-text' },
    content: { type: 'repeater' },
  });

  // Add new sector
  editor.StyleManager.addSector('custom-sector', {
    name: 'Custom sector',
    open: true,
    properties: [],
  });

  // Add new property to the sector
  editor.StyleManager.addProperty("custom-sector", {
    type: 'number',
    label: 'Column gap',
    property: 'column-gap',
    units: ['px', 'em', 'rem'],
    default: '10px',
    min: 0,
  }, { at: 0 });

  editor.StyleManager.addProperty("custom-sector", {
    type: 'number',
    label: 'Row gap',
    property: 'row-gap',
    units: ['px', 'em', 'rem'],
    default: '10px',
    min: 0,
  });

  editor.on(`block:drag:stop`, (component, block) => {
    if (component && component.isChildOf('repeater-item')) {
      const index = component.index();
      const parentElements = component.parents();
      const parentIndexes = [];
      let parentRepeater = null;
      for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].get('type') === 'repeater') {
          parentRepeater = parentElements[i];
          break;
        }

        const tempIndex = parentElements[i].index();
        parentIndexes.splice(0, 0, tempIndex);
      }
      for (let i = 0; i < parentRepeater.components().length; i++) {
        if (i === parentIndexes[0]) continue;
        let tempCpt = parentRepeater.getChildAt(i);
        for (let j = 1; j < parentIndexes.length; j++) {
          tempCpt = tempCpt.getChildAt(parentIndexes[j]);
        }
        tempCpt.append(component.clone(), {at: index})
      }
    }
  });

  editor.on(`component:update:numOfItems`, (model) => {
    console.log('efef=========');
    if (model.get('type') === 'repeater') {
      const itemCmp = editor.getSelected().getLastChild();
      // const html = itemCmp.toHTML();
      // const css = editor.CodeManager.getCode(itemCmp, 'css', { cssc: editor.CssComposer });
      editor.getSelected().append(itemCmp.clone());
    }
  });

  editor.on(`style:property:update`, ({property, from, to}) => {
    const component = editor.getSelected();
    if (component?.isChildOf('repeater-item')) {
      const index = component.index();
      const changedStyle = {...component.getStyle(), ...property.getStyle()};
      const parentElements = component.parents();
      const parentIndexes = [];
      let parentRepeater = null;
      for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].get('type') === 'repeater') {
          parentRepeater = parentElements[i];
          break;
        }

        const tempIndex = parentElements[i].index();
        parentIndexes.splice(0, 0, tempIndex);
      }

      for (let i = 0; i < parentRepeater.components().length; i++) {
        if (i === parentIndexes[0]) continue;
        let tempCpt = parentRepeater.getChildAt(i);
        for (let j = 1; j < parentIndexes.length; j++) {
          tempCpt = tempCpt.getChildAt(parentIndexes[j]);
        }
        tempCpt?.getChildAt(index)?.setStyle(changedStyle);
      }
    }

    if (component?.get('type') === 'repeater-item') {
      const changedStyle = {...component.getStyle(), ...property.getStyle()};
      const parentRepeater = component.parent();

      for (let i = 0; i < parentRepeater.components().length; i++) {
        parentRepeater.getChildAt(i).setStyle(changedStyle);
      }
    }
  });

  editor.on('run:core:component-delete:before', () => {
    const component = editor.getSelected();
    if (component && component.isChildOf('repeater-item')) {
      const index = component.index();
      const parentElements = component.parents();
      const parentIndexes = [];
      let parentRepeater = null;

      for (let i = 0; i < parentElements.length; i++) {
        if (parentElements[i].get('type') === 'repeater') {
          parentRepeater = parentElements[i];
          break;
        }

        const tempIndex = parentElements[i].index();
        parentIndexes.splice(0, 0, tempIndex);
      }

      for (let i = 0; i < parentRepeater.components().length; i++) {
        if (i === parentIndexes[0]) continue;
        let tempCpt = parentRepeater.getChildAt(i);
        for (let j = 1; j < parentIndexes.length; j++) {
          tempCpt = tempCpt.getChildAt(parentIndexes[j]);
        }
        if (tempCpt?.getChildAt(index)) {
          editor.selectAdd(tempCpt.getChildAt(index)); 
        }
      }
    }
  });
}