import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FaBox, FaPaintBrush } from 'react-icons/fa';
import {AiFillEye} from 'react-icons/ai';
import {AiOutlineEyeInvisible, AiFillCaretRight, AiFillCaretDown} from 'react-icons/ai';
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
import { cx } from '../../util/index';

export default function LayerItem({ editor, component, level, draggingCmp, dragParent }) {
  let Layers;
  if (editor) {
    Layers = editor.Layers;
  };
  const itemStyle = { maxWidth: `100%` };
  const layerRef = useRef(null);
  const [layerData, setLayerData] = useState(Layers.getLayerData(component));
  const { open, selected, hovered, components, visible, name } = layerData;
  const componentsIds = components.map((cmp) => cmp.getId());
  const isDragging = draggingCmp === component;
  const cmpHash = componentsIds.join('-');
  const _level=level+1;
  const isHovered = hovered || dragParent === component;
  useEffect(() => {
    level === 0 && setLayerData(Layers.getLayerData(component));
    if (layerRef.current) {
        (layerRef.current).__cmp = component;
    }
  }, [component]);
  useEffect(() => {
    const up = (cmp) => {
      cmp === component && setLayerData(Layers.getLayerData(cmp));
    };
    const ev = Layers.events.component;
    editor.on(ev, up);

    return () => {
      editor.off(ev, up);
    };
  }, [editor, Layers, component]);

  const cmpToRender = useMemo(() => {
    return components.map((cmp) => (
      <LayerItem
        editor={editor}
        component={cmp}
        level={_level}
        draggingCmp={draggingCmp}
        dragParent={dragParent}
      />
    ));
  }, [cmpHash, draggingCmp, dragParent]);

  const toggleOpen = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { open: !open });
  };

  const toggleVisibility = (ev) => {
    ev.stopPropagation();
    Layers.setLayerData(component, { visible: !visible });
  };

  const renderOpenIcon=() =>{
    if(open){
        return (<AiFillCaretDown size={20}/>)
    }
    else{
       return(<AiFillCaretRight size={20}/>)
    }
  }

  const renderVisibleIcon=()=>{
    if(visible){
        return (<AiFillEye size={20} color={'black'}/>)
    }
    else{
        return(<AiOutlineEyeInvisible size={20} color={'black'}/>)
    }
  }

  const select = (event) => {
    event.stopPropagation();
    Layers.setLayerData(component, { selected: true }, { event });
  };

  const hover = (hovered) => {
    if (!hovered || !draggingCmp) {
      Layers.setLayerData(component, { hovered });
    }
  };

  const wrapperCls = cx(
    'layer-item flex flex-col',
    selected && 'bg-sky-900',
    (!visible || isDragging) && 'opacity-50'
  );
  return (
  <div>
    <div className={wrapperCls}>
      <div
        onClick={select}
        onMouseEnter={() => hover(true)}
        onMouseLeave={() => hover(false)}
        data-layer-item
        ref={layerRef}
      >
        <div className='layer-item d-flex justify-content-between border-bottom'>
           <div className='d-flex'>
            <div
                style={{ marginLeft: `${_level * 10}px` }}
                className={`${!components.length && "opacity-0"}`}
                onClick={toggleOpen}
            >
                {renderOpenIcon()}
            </div>
            <div className='text-black fw-bold fs-5'>
                {name}
            </div>
          </div>
          <div
            className=""
            onClick={toggleVisibility}
          >
            {renderVisibleIcon()}
          </div>
        </div>
      </div>
      {!!(open && components.length) && (
        <div className={cx('max-w-full', !open && 'hidden')}>{cmpToRender}</div>
      )}
    </div>
  </div>);
}
