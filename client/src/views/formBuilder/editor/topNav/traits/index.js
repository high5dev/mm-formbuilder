import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus } from 'react-feather';

import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
import TraitPropertyField from './TraitPropertyField';
import {
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

export default function Index({ editor, selectedCmp, setEditor, setTraitTab, changedTraits }) {
  const [traits, setTraits] = useState([]);
  useEffect(() => {
    if (selectedCmp)
      setTraits(selectedCmp.getTraits());
  }, [selectedCmp]);

  return (
    <div className="d-flex">
       <PerfectScrollbar
              className="scrollable-content"
              options={{ suppressScrollX: true }}
              style={{ height: `calc(100vh - 120px)` }}
            > 
      <div className="trait-sidebar">
        <div className='sidebar-header'>
            <span className='px-1 fs-5 fw-bolder text-black'>Traits</span>
            <span><X size={20} onClick={(e)=>{setTraitTab(false)}}/></span>
          </div>
          <div className='bg-white'>

              <div className='bg-white px-1 py-2'>
                {
                  !traits && <div className='text-center fs-5'>No properties available</div>
                }
                {traits &&  traits.map((trait, index) => (
                  <TraitPropertyField key={trait.getId()} index={index} trait={trait} editor={editor} setEditor={setEditor}/>
                ))}
              </div>

          </div>
      </div>
      </PerfectScrollbar>
    </div>
  );
}
