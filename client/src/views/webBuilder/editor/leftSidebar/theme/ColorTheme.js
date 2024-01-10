import React, { useContext, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {Edit2, Plus} from 'react-feather';
import ColorModal from './modal/ColorModal';
import {updateWebBuilderThemeAction} from '../../../store/action'
export default function ColorTheme({store, selectedColor, setSelectedColor}) {
  const formTheme=store.formTheme; 
  const dispatch=useDispatch();
  const [color, setColor]=useState();
  const [colorMdl, setColorMDL]=useState(false);
  const toggleMdl=(_open)=>{
    setColorMDL(_open);
  }

  const handleThemeColor=(value, item)=>{
    let colors=formTheme.colors;
    const buttons=formTheme.buttons;
    const fonts=formTheme.fonts;
    const image=formTheme.image;
    let newButtons;
    let newFonts;
    let newImage;
    let newColors=colors && colors.map((_color)=>{
      if(_color._id===item._id){
        let tempColor=JSON.parse(JSON.stringify(_color));
        tempColor.value=value;
        newButtons=buttons && buttons.map((_button)=>{
          let tempButton=JSON.parse(JSON.stringify(_button));
          if(_button.attributes.themeColor && _button.attributes.themeColor===selectedColor.name){
              tempButton.attributes.color=value;
          }
          if(_button.attributes.themeBackgroundColor && _button.attributes.themeBackgroundColor===selectedColor.name){
            tempButton.attributes.backgroundColor=value;
          }
          return tempButton
        });
        newFonts=fonts && fonts.map((_font)=>{
          let tempFont=JSON.parse(JSON.stringify(_font));
          if(_font.attributes.themeColor && _font.attributes.themeColor===selectedColor.name){
            tempFont.attributes.color=value;
          }
          return tempFont
        });
        newImage=JSON.parse(JSON.stringify(image));
        if(newImage.attributes.themeColor && newImage.attributes.themeColor===selectedColor.name){
          newImage.attributes.borderColor=value;
        }        
        return tempColor
      }
      else{
        return _color;
      }
    });
    const payload={
      colors:newColors,
      buttons:newButtons,
      fonts:newFonts,
      image:newImage
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
