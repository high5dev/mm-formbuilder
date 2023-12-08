import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import {
  Label,
  Button,
  ButtonGroup,
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Spinner,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';


export default function RuleItem({formEditor, index, ruleResult, components, changeRuleResult, removeRule}) {
  const rules=[
    {
      label:'Hidden',
      value:'none'
    },
    {
      label:'Shown',
      value:'block'
    }
  ];

  const onChangeComponent=(_values) =>{
    const _components=formEditor.getWrapper().components().models;
    let newValues=_values && _values.filter((e)=>e.label!='');
    if(newValues.length>0){
      let outputIds=[];
      for(let i=0; i<newValues.length;i++){
        const e=newValues[i];
        const selectedCmp=_components.filter((_component)=>_component.get('type')===e.value)[0];
        const selectedEl=selectedCmp.getEl();
        outputIds.push(selectedEl.id);
      };
      let newRuleResult=JSON.parse(JSON.stringify(ruleResult));
      newRuleResult.outputIds=outputIds;
      newRuleResult.field=[...newValues];
      changeRuleResult(index, newRuleResult);
    }
  }

  const onChangeValue=(e)=>{
    let newRuleResult=JSON.parse(JSON.stringify(ruleResult));
    const obj={value:{...e}};
    newRuleResult={...newRuleResult, ...obj};
    changeRuleResult(index, newRuleResult);
  }

  return (
    <div className="d-flex justify-content-around mb-2 p-1">
        <div className="rule">
            <div className='d-flex justify-content-between'>
              <Label>This fields</Label>
              <div className='text-primary fs-6' onClick={(e)=>removeRule(index)}>Remove</div>
            </div>
            <div className="mb-1" style={{ width: '200px', minWidth:'200px' }}>
              <MultiSelect
                  value={ruleResult.field}
                  className=""
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  options={components}
                  style={{marginLeft:'0px'}}
                  onChange={(e)=>onChangeComponent(e)}
                  />
            </div>
            <div style={{ width: '200px', minWidth:'200px' }}>
             <Select
                value={ruleResult.value}
                className=""
                classNamePrefix="select"
                theme={selectThemeColors}
                options={rules}
                onChange={(e)=>onChangeValue(e)}
                />
          </div>
        </div>
    </div>
  );
}
