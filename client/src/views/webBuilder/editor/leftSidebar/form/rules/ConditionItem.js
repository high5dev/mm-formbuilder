import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import { selectThemeColors } from '@utils';
import '@src/assets/styles/web-builder.scss';
import { MultiSelect } from "react-multi-select-component";
import {
    Collapse,
    Button,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col
  } from 'reactstrap';


export default function ConditionItem({formEditor, ruleCondition, index, components, changeCondition, removeCondition}) {
  let conditions=[
    {
      label:'is equal to',
      value:'is equal to'
    },
    {
      label:'is not equal to',
      value:'is not equal to'
    },
    {
      label:'is empty',
      value:'is empty'
    },
    {
      label:'is filled',
      value:'is filled'
    },
    {
      label:'Contains',
      value:'Contains'
    },
    {
      label:'Does not contain',
      value:'Does not contain'
    }

  ];
  let options;
  if(ruleCondition.field.label==='Birthday'){
      conditions=[
        {
          label:'is equal to',
          value:'is equal to'
        },
        {
          label:'is not equal to',
          value:'is not equal to'
        },
        {
          label:'is empty',
          value:'is empty'
        },
        {
          label:'is filled',
          value:'is filled'
        },
        {
          label:'is after',
          value:'is after'
        },
        {
          label:'is after or equal to',
          value:'is after or equal to'
        }
      ]
  }

  if(ruleCondition.field.label==='Checkbox' || ruleCondition.field.label==='Subscribe'){
    conditions=[
      {
        label:'is checked',
        value:'is checked'
      },
      {
        label:'is not checked',
        value:'is not checked'
      }
    ]
  }
  if(formEditor){
    if(ruleCondition.field.label==='Single choice' || ruleCondition.field.label==='Multi choice' || ruleCondition.field.label ==='Dropdown'){
      const type=ruleCondition.field.value;
      const components=formEditor.getWrapper().components().models;
      for(let i=0; i<components.length; i++){
        if(components[i].get('type') === type){
            const component=components[i];
            const elProps=component.get('elProps');
            options=elProps && elProps.map((elProp)=>{
              return{
                label:elProp.label,
                value:elProp.label
              }
            });
            break;
        }
      }
    }
  }


  const [selectedCondition, setSelectedCondition]=useState();
  const [value, setValue]=useState();

  const onChangeComponent=(e) =>{
    const _components=formEditor.getWrapper().components().models;
    const selectedCmp=_components.filter((_component)=>_component.get('type')===e.value)[0];
    const selectedEl=selectedCmp.getEl();
    const selectNodes=selectedEl.getElementsByTagName('select');
    let id='';
    if(selectedCmp.get('type')==='birthday'){
      id=selectedEl.id
    }
    else{
      if(selectNodes.length>0){
        id=selectNodes[0].id;
      }
      else{
        const nodes=selectedEl.getElementsByTagName('input');
        id=nodes[0].id;
      }
    }
    let obj={id:id};
    console.log('obj', obj)
    let newRuleCondition=JSON.parse(JSON.stringify(ruleCondition));
    newRuleCondition.field={...e};
    newRuleCondition.value={...newRuleCondition.value, ...obj};
    changeCondition(index, newRuleCondition);
  }

  const onChangeCondition=(e) =>{
    let newRuleCondition=JSON.parse(JSON.stringify(ruleCondition));
    const obj={condition:{...e}};
    newRuleCondition={...newRuleCondition, ...obj};
    changeCondition(index, newRuleCondition);
  }

  const onChangeValue =(value) =>{
    let newRuleCondition=JSON.parse(JSON.stringify(ruleCondition));
    const obj={inputValue:value};
    newRuleCondition.value={...newRuleCondition.value, ...obj};
    changeCondition(index, newRuleCondition);
  }

  return (
    <div className="d-flex justify-content-around mb-2">
        <div className="condition p-1 bg-light-secondary">
            <div className='d-flex justify-content-between cursor-pointer'>
              <Label>This field</Label>
              <div className='text-primary fs-6' onClick={(e)=>removeCondition(index)}>Remove</div>
            </div>
            <div className="mb-1" style={{ width: '200px', minWidth:'200px' }}>
            <Select
                value={ruleCondition.field}
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
                value={ruleCondition.condition}
                className=""
                classNamePrefix="select"
                theme={selectThemeColors}
                options={conditions}
                style={{marginLeft:'0px'}}
                onChange={(e)=>onChangeCondition(e)}
                />
          </div>
          <div className='d-flex justify-content-around'>
            {
              ruleCondition.condition.label!='is empty' && ruleCondition.condition.label!='is filled' && ruleCondition.condition.label!='is checked' && ruleCondition.condition.label!='is not checked' &&          
              <div className='input-value-element'>
                {console.log('values========', ruleCondition.value)}
                {
                  ruleCondition.field.label==='Birthday' && <Input type='date' className='my-1' value={ruleCondition.value.inputValue} onChange={(e)=>onChangeValue(e.target.value)} placeholder='Enter a value.' style={{width:'200px'}}/>
                }
                {
                   (ruleCondition.field.label==='Single choice' || ruleCondition.field.label==='Dropdown') && 
                   <div className='mt-2' style={{ width: '200px', minWidth:'200px' }}>
                    <Select
                      value={ruleCondition.value.inputValue}
                      className=""
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      options={options}
                      style={{marginLeft:'0px'}}
                      onChange={(e)=>onChangeValue(e)}
                    />
                   </div>
                }
              {
                   ruleCondition.field.label==='Multi choice' &&
                   <div className='mt-2' style={{ width: '200px', minWidth:'200px' }}>
                    <MultiSelect
                      value={!ruleCondition.value.length?[{label:'', value:''}]:ruleCondition.value}
                      className=""
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      options={options}
                      style={{marginLeft:'0px'}}
                      onChange={(_values)=>{
                        const newValues=_values && _values.filter((_value)=>_value.label!=''
                        );
                        onChangeValue(newValues);
                      }}
                    />
                   </div>
                }
                {
                  ruleCondition.field.label!='Birthday' && ruleCondition.field.label!='Single choice' && ruleCondition.field.label!='Multi choice' && ruleCondition.field.label!='Dropdown' && <Input type='text' className='my-1' value={ruleCondition.value.inputValue} onChange={(e)=>onChangeValue(e.target.value)} placeholder='Enter a value.'/>
                }
            </div>
            }
          </div>
        </div>

    </div>
  );
}
