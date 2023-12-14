import React, { useEffect, useState } from 'react';
import { Eye, Save, X, ChevronDown, MoreHorizontal, Plus } from 'react-feather';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';
import '@src/assets/styles/web-builder.scss';
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
import LayerItem from './LayerItem';

export default function Index({editor, setEditor, setLayerTab}) {
  let root;
  if(editor){
    root=editor.LayerManager.getRoot();
  }
  const [pointerDown, setPointerDown] = useState(false);
  const [dragging, setDragging] = useState();
  const [dragParent, setDragParent] = useState();
  const wrapGridStyle = {
    touchAction: 'none',
  };

  return (
    <div className="d-flex"
    style={wrapGridStyle}
    >
              <PerfectScrollbar
          className="scrollable-content"
          options={{ suppressScrollX: true }}
          style={{ height: `calc(100vh - 120px)`}}
        >
      <div className="layer-sidebar">
        <div className='sidebar-header'>
            <span className='px-1 fs-5 fw-bolder text-black'>Layers</span>
            <span><X size={20} onClick={(e)=>{setLayerTab(false)}}/></span>
        </div>
        <div className='bg-white px-1 py-1'>

            {!!root && (
            <LayerItem
              editor={editor}
              component={root}
              level={-1}
              draggingCmp={dragging}
              dragParent={dragParent}
            />
          )}
    
        </div>
      </div>
      </PerfectScrollbar>
    </div>
  );
}
