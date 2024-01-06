import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {Edit2, Plus} from 'react-feather';
import ColorModal from './modal/ColorModal';
import {updateWebBuilderThemeAction} from '../../../store/action'
export default function ColorTheme({store, selectedColor}) {
  const formTheme=store.formTheme;
  const dispatch=useDispatch();
  const [color, setColor]=useState();
  const [colorMdl, setColorMDL]=useState(false);
  const toggleMdl=(_open)=>{
    setColorMDL(_open);
  }

  const handleThemeColor=(value, item)=>{
    let colors=formTheme.colors;
    let newColors=colors && colors.map((_color)=>{
      if(_color._id===item._id){
        let tempColor=JSON.parse(JSON.stringify(_color));
        tempColor.value=value;
        return tempColor
      }
      else{
        return _color;
      }
    });
    const payload={
      colors:newColors
    }
    const themeId=formTheme._id;
    dispatch(updateWebBuilderThemeAction(themeId, payload));
  }


  return (
    <div class="theme-colors-container">
        {
            formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                return(
                    <div className='theme-color-item d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center text-black' onClick={(e)=>{
                            setColor(_color);
                            setColorMDL(true);
                             }
                            }>
                            <div style={{marginRight:'5px'}}>{_color.name}</div>
                            <Edit2 size={14} className='cursor-pointer'/>
                        </div>
                        <div>
                            {
                                <div className='theme-color-panel d-flex justify-content-around align-items-center' style={{border:selectedColor?.name===_color?.name?'1px solid red':'none'}}>
                                     <Input type='color' value={_color?.value} className='color-picker-element' onChange={(e)=>{
                                        handleThemeColor(e.target.value, _color)
                                     }}/>                                 
                                </div>
                            }
                        </div>
                    </div>
                )

            })
        }
        <ColorModal store={store} color={color} isOpen={colorMdl} toggle={toggleMdl}/>
    </div>
  );
}
