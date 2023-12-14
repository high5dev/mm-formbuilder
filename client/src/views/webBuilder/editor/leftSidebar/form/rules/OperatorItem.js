import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
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


export default function RuleItem({index, operatorItem, onChangeOperator}) {
  const opeartors=[
    {
      label:'And',
      value:'and'
    },
    {
      label:'Or',
      value:'or'
    }
  ];

  const onChangeValue=(e)=>{
    onChangeOperator(index, e);
  }

  return (
    <div className="d-flex justify-content-around mb-2">
        <div className="operator">
            <div className="mb-1" style={{ width: '200px', minWidth:'200px' }}>
              <Select
                  value={operatorItem}
                  className=""
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  options={opeartors}
                  style={{marginLeft:'0px'}}
                  onChange={(e)=>onChangeValue(e)}
                  />
            </div>
        </div>
    </div>
  );
}
