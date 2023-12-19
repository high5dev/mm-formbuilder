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

export default function StylePropertyField({ prop }) {
  const [opacity, setOpacity] = useState(0);
  const [color, setColor] = useState('');
  const label = prop.getLabel();
  const type = prop.getType();
  const defValue = prop.getDefaultValue();
  const canClear = prop.canClear();
  const hasValue = prop.hasValue();
  const value = prop.getValue();
  const [num, setNum]=useState(defValue);
  const valueString = hasValue ? value : '';
  const handleChange = (value) => {
    prop.upValue(value);
  };
  const onChange = (e) => {
    handleChange(e.target.value);
  };

  const handleText=(value)=>{
    prop.upValue(value);
    setNum(value);
  }

  const onSelect=(e)=>{
   handleChange(e.value);
  }

  let inputToRender = <Input placeholder={num} value={num} onChange={(e)=>handleText(e.target.value)} />;
  switch (type) {
    case 'radio':
      {
        const options = prop.getOptions().map((option) => {
          return { label: prop.getOptionLabel(option), value: prop.getOptionLabel(option) };
        });
        inputToRender = (
          <Row className="pt-50">
            <Col sm={6}>
            <Select
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                onChange={onSelect}
                options={options}
                theme={selectThemeColors}
                defaultValue={options[0]}
              />
            </Col>

          </Row>
        );
        break;
      }
    case 'select': 
    {
      const options = prop.getOptions().map((option) => {
        return { label: prop.getOptionId(option), value: prop.getOptionId(option) };
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
              value={color}
              onChange={onChange}
            />
          </Row>
        );
      }
      break;
    case 'slider':
      {
        inputToRender = (
          <Slider min={0} step={0.01} max={1} defaultValue={parseFloat(num)} onChange={(e)=>handleText(e)} />
        );
      }

      break;
    case 'composite':
        inputToRender = (
          <div
            className='d-flex flex-wrap'
          >
            {prop.getProperties().map((prop) => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </div>
        );
        break;
  }

  return (
    <div className={`px-2 pb-1${prop.isFull() ? ' w-100' : ' w-50'}`}>
      <div className="mb-1">{prop.getLabel()}</div>
      <div>{inputToRender}</div>
    </div>
  );
}
