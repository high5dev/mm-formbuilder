import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus } from 'react-feather';
import { selectThemeColors } from '@utils';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { toast } from 'react-toastify';
import { GithubPicker } from 'react-color';
import '@src/assets/styles/web-builder.scss';
``;
import Select from 'react-select';
import {
  Row,
  Col,
  Input,
  Label,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  FormGroup
} from 'reactstrap';

export default function StylePropertyField({ index, trait, editor, setEditor }) {
  let type = trait.getType();
  let defValue = trait.attributes.placeholder;
  let value = trait.getValue();
  const [property, setProperty]=useState('');
  const handleChange = (value) => {
    trait.setValue(value);
    setProperty(value);
  };

  const handleCheck =(val) =>{
    setProperty(val);
    if(val){
      trait.setValue('on');
    }
    else{
      trait.setValue('off');
    }
    setEditor(editor);
  }


  const onChange = (ev) => {
    handleChange(ev.target.value);
  };

  const handleButtonClick = () => {
    const command = trait.get('command');
    if (command) {
      typeof command === 'string'
        ? editor.runCommand(command)
        : command(editor, trait);
    }
  };

  const onSelect=(e)=>{
    handleChange(e.value);
   }

  let inputToRender = <Input placeholder={defValue} value={value} onChange={onChange} />;
  switch (type) {
    case 'select': 
    {
      const options = trait.attributes.options.map((option) => {
        return { label: option.name, value: option.value};
      });
      inputToRender = (
        <Row className="pt-50">
            <Select
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              onChange={onSelect}
              options={options}
              theme={selectThemeColors}
              defaultValue={options[0]}
            />
        </Row>
      );
      break;
    }
    case 'color':
      {
        inputToRender = (
          <Row>
            <Input
              type="color"
              name="fontColor"
              value={value}
              onChange={onChange}
            />
          </Row>
        );
        break;
      }
      case 'checkbox':
        {
          inputToRender = (
            <div className='form-check'>
              <Input
                type='checkbox'
                checked={value==='on'?'checked':''}
                onChange={(ev) => handleCheck(ev.target.checked)}
              />
            </div>
          );
        }
        break;
      case 'button':
        {
          inputToRender = (
            <Button fullWidth onClick={handleButtonClick}>
              {trait.getLabel()}
            </Button>
          );
        }
        break;
  }

  return (
    <div className="px-2 pb-1 w-100">
      <div className="fs-5 fw-bolder pb-1">{trait.getLabel()}</div>
      <div>{inputToRender}</div>
    </div>
  );
}
