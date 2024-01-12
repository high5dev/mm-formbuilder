import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { selectThemeColors } from '@utils';
import { Edit2, Plus } from 'react-feather';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from 'react-select';
import { useEdges } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { updateWebBuilderThemeAction } from '../../../store/action';
export default function ButtonTheme({ store, selectedButton, selectedColor, setSelectedButton}) {
  console.log('selectedColor', selectedColor, selectedButton)
  const formTheme = store.formTheme;
  const [themeColor, setThemeColor]=useState();
  const [themeBackgroundColor, setThemeBackgroundColor]=useState();
  const dispatch=useDispatch();
  const fontOptiions = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Verdana', value: 'Verdana' },
    { label: 'Optima', value: 'Optima' },
    { label: 'Didot', value: 'Didot' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'FreeMono', value: 'FreeMono' },
    { label: 'Blippo', value: 'Blippo' }
  ];
  const [font, setFont] = useState(fontOptiions[0]);
  const fontSizeOptions = [
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
    { label: 11, value: 11 },
    { label: 12, value: 12 },
    { label: 14, value: 14 },
    { label: 16, value: 16 },
    { label: 18, value: 18 },
    { label: 24, value: 24 },
    { label: 30, value: 30 },
    { label: 32, value: 32 },
    { label: 36, value: 36 },
    { label: 48, value: 48 },
    { label: 60, value: 60 },
    { label: 72, value: 72 },
    { label: 96, value: 96 }
  ];
  const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
  const [color, setColor]=useState();
  const fontFormats = [
    {
      label: 'Normal',
      value: 'Normal'
    },
    {
      label: 'Bold',
      value: 'Bold'
    },
    {
      label: 'UnderLine',
      value: 'UnderLine'
    },
    {
      label: 'Italic',
      value: 'Italic'
    }
  ];
  const [fontFormat, setFontFormat] = useState(fontFormats[0]);
  const alignmentOptions = [
    {
      label: 'Left',
      value: 'Left'
    },
    {
      label: 'Center',
      value: 'Center'
    },
    {
      label: 'Right',
      value: 'Right'
    }
  ];
  const [alignment, setAlignment] = useState(alignmentOptions[0]);
  const [backgroundColor, setBackgroundColor]=useState();
  const borderOptiions = [
    { label: 'Full', value: 'Full' },
    { label: 'Top', value: 'Top' },
    { label: 'Right', value: 'Right' },
    { label: 'Bottom', value: 'Bottom' },
    { label: 'Left', value: 'Left' }
  ];
  const [borderOption, setBorderOption] = useState(borderOptiions[0]);
  const [borderValue, setBorderValue] = useState();
  const [hoverfontformat, setHoverFontFormat] = useState(fontFormats[0]);
  const cornerOptiions = [
    { label: 'All Corners', value: 'All Corners' },
    { label: 'Top Left', value: 'Top Left' },
    { label: 'Top Right', value: 'Top Right' },
    { label: 'Bottom Left', value: 'Bottom Left' },
    { label: 'Bottom Right', value: 'Bottom Right' }
  ];
  const [corner, setCorner] = useState(cornerOptiions[0]);
  const [cornerValue, setCornerValue]=useState();
  const handleChangeFont=(_font)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.fontFamily=_font.value;
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const handleChangeFontSize=(_fontsize)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.fontSize=_fontsize.value+'px';
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const handleChangeFontColor = (_color)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.color=_color;
            delete tempButton.attributes['themeColor'];
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const handleChangeAlignment =(_alignment) =>{
    const value=_alignment.value;
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            if(value==='Left'){
                delete tempButton.attributes['paddingRight'];
                tempButton.attributes={...tempButton.attributes, paddingLeft:'0px'};
            }
            else if(value==='Right'){
                delete tempButton.attributes['paddingLeft'];
                tempButton.attributes={...tempButton.attributes, paddingRight:'0px'};
            }
            else{
                delete tempButton.attributes['paddingLeft'];
                delete tempButton.attributes['paddingRight'];
            }
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  } 

  const handleChangeBackgroundColor=(_bgColor)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.backgroundColor=_bgColor;
            delete tempButton.attributes['themeBackgroundColor'];
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const selectThemeFontColor =(_color)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.color=_color.value;
            tempButton.attributes['themeColor']=_color.name;
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const selectThemeBackgroundColor =(_color)=>{
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            tempButton.attributes.backgroundColor=_color.value;
            tempButton.attributes['themeBackgroundColor']=_color.name;
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }

  const handleCornerValueChange =(_value)=>{
    const buttons=formTheme.buttons;
    const corner_type=corner.value;
    setCornerValue(_value);
    if(_value){
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            if(corner_type==='All Corners'){
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderRadius:_value+'px'};
            }
            else if(corner_type==='Top Left'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderTopLeftRadius:_value+'px'};
            }
            else if(corner_type==='Top Right'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderTopRightRadius:_value+'px'};
            }
            else if(corner_type==='Bottom Left'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderBottomLeftRadius:_value+'px'};
            }
            else if(corner_type==='Bottom Right'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                tempButton.attributes={...tempButton.attributes, borderBottomRightRadius:_value+'px' };
            };
            setSelectedButton({...tempButton});
            setSelectedButton({...tempButton});
            console.log('tempButton========', tempButton)
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
    }
  }

  const handleCornerChange =(_corner)=>{
    const corner_type=_corner.value;
    const buttons=formTheme.buttons;
    let newButtons=buttons && buttons.map((_button)=>{
        if(_button.type===selectedButton.type){
            let tempButton=JSON.parse(JSON.stringify(_button));
            if(corner_type==='All Corners'){
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderRadius:cornerValue+'px'};
            }
            else if(corner_type==='Top Left'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderTopLeftRadius:cornerValue+'px'};
            }
            else if(corner_type==='Top Right'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderTopRightRadius:cornerValue+'px'};
            }
            else if(corner_type==='Bottom Left'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomRightRadius'];
                tempButton.attributes={...tempButton.attributes, borderBottomLeftRadius:cornerValue+'px'};
            }
            else if(corner_type==='Bottom Right'){
                delete tempButton.attributes['borderRadius'];
                delete tempButton.attributes['borderTopLeftRadius'];
                delete tempButton.attributes['borderTopRightRadius'];
                delete tempButton.attributes['borderBottomLeftRadius'];
                tempButton.attributes={...tempButton.attributes, borderBottomRightRadius:cornerValue+'px' };
            };
            setSelectedButton({...tempButton});
            return tempButton
        }
        else{
            return _button
        }
    });
    const payload={
        buttons:newButtons
      }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
  }


  useEffect(()=>{
    if(selectedButton){
        const attributes=selectedButton.attributes;
        const themeColor=selectedButton.attributes.themeColor; 
        setThemeColor(themeColor);  
        const fontFamily=attributes.fontFamily;
        const fontSize=attributes.fontSize;
        const fontColor=attributes.color;
        const fontWeight=attributes.fontWeight;
        const backgroundColor=attributes.backgroundColor;
        const themeBackgroundColor=selectedButton.attributes.selectThemeBackgroundColor;
        setThemeBackgroundColor(themeBackgroundColor);
        // const borderTopLeftRadius=attributes.borderTopLeftRadius;
        // const borderTopRightRadius=attributes.borderTopRightRadius;
        // const borderBottomLeftRadius=attributes.borderBottomLeftRadius;
        // const borderBottomRightRadius=attributes.borderBottomRightRadius;
        let matches = fontSize.match(/(\d+)/);
        if (matches) {
            setFontSize({label:matches[0], value:matches[0]});
        }
        if(fontWeight==='normal'){
            setFontFormat({label:'Normal', value:'Normal'});
        }
        if(!attributes.paddingLeft && !attributes.paddingRight){
            setAlignment({label:'Center', value:'Center'});
        }
        if(attributes.paddingLeft){
            setAlignment({label:'Left', value:'Left'});
        }
        if(attributes.paddingRight){
            setAlignment({label:'Right', value:'Right'});
        }
        if(attributes.borderRadius){
            const radius=attributes.borderRadius.match(/(\d+)/);
            if(radius){
                setCornerValue(radius[0]);
            }
            else{
                setCornerValue();
            }
            setCorner({ label: 'All Corners', value: 'All Corners' });   
        }
        if(attributes.borderTopRightRadius){
            const radius=attributes.borderTopRightRadius.match(/(\d+)/);
            if(radius){
                setCornerValue(radius[0]);
            }
            else{
                setCornerValue();
            }
            setCorner({ label: 'Top Right', value: 'Top Right' });
        }
        if(attributes.borderBottomLeftRadius){
            const radius=attributes.borderBottomLeftRadius.match(/(\d+)/);
            if(radius){
                setCornerValue(radius[0]);
            }
            else{
                setCornerValue();
            }
            setCorner({ label: 'Bottom Left', value: 'Bottom Left' });
        }
        if(attributes.borderBottomRightRadius){
            const radius=attributes.borderBottomLeftRadius.match(/(\d+)/);
            if(radius){
                setCornerValue(radius[0]);
            }
            else{
                setCornerValue();
            }
            setCorner({ label: 'Bottom Right', value: 'Bottom Right' });
        }

        setFont({label:fontFamily, value:fontFamily});
        if(!themeColor){
          setColor(fontColor);
        }
        if(!themeBackgroundColor){
          setBackgroundColor(backgroundColor);
        }
    }
  }, [selectedButton])

  return (
    <div className="p-1">
      {formTheme &&
        formTheme.buttons &&
        formTheme.buttons.map((_button) => {
          if (_button.type === selectedButton.type) {
            return (
              <>
                <div className="mt-2">
                  <div className="d-flex justify-content-around">
                    <button style={{ ...selectedButton.attributes }}>{selectedButton?.type}</button>
                  </div>
                  <div className="font-row d-flex align-items-center mt-1">
                    <Label>Font</Label>
                    <div style={{ width: '200px' }}>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={fontOptiions}
                        onChange={(data) => handleChangeFont(data)}
                        value={font}
                      />
                    </div>
                  </div>
                  <div className="size-row d-flex align-items-center mt-1">
                    <Label>Size</Label>
                    <div style={{ width: '200px' }}>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={fontSizeOptions}
                        onChange={(data) => handleChangeFontSize(data)}
                        value={fontSize}
                      />
                    </div>
                  </div>
                  <div className="color-row mt-1">
                    <Label>Color</Label>
                    <div className='ms-1'>
                      <div>
                        <Label>Theme Color</Label>
                        <div className='d-flex flex-wrap align-items-center mt-1' style={{width:'200px'}}>
                        {
                          formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                            return(
                              <div style={{width:'30px', height:'30px',margin:'3px', backgroundColor:_color.value}} onClick={(e)=>{
                                selectThemeFontColor(_color);
                              }}>
                              </div>
                            )
                          })
                        }
                        </div>
                      </div>
                      <div className='mt-1'>
                        <Label>Custom Color</Label>
                        <div className="mt-1" style={{ width: '100px' }}>
                          <Input type="color" value={color} onChange={(e)=>handleChangeFontColor(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-format-row d-flex align-items-center justify-content-between mt-1">
                    <Label>Format</Label>
                    <div style={{ width: '150px' }}>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={fontFormats}
                        onChange={(data) => setFontFormat(data)}
                        value={fontFormat}
                      />
                    </div>
                  </div>
                  <div className="font-format-row d-flex align-items-center justify-content-between mt-1">
                    <Label>Align</Label>
                    <div style={{ width: '150px' }}>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={alignmentOptions}
                        onChange={(data) => handleChangeAlignment(data)}
                        value={alignment}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="fw-bolder">Background</div>
                  <div className="font-row mt-1">
                    <Label>Background Color</Label>
                    <div className='ms-1'>
                      <div>
                        <Label>Theme Color</Label>
                        <div className='d-flex flex-wrap align-items-center mt-1' style={{width:'200px'}}>
                        {
                          formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                            return(
                              <div style={{width:'30px', height:'30px',margin:'3px',backgroundColor:_color.value}} onClick={(e)=>{
                                selectThemeBackgroundColor(_color);
                              }}>
                              </div>
                            )
                          })
                        }
                        </div>
                      </div>
                      <div className='mt-1'>
                        <Label>Custom Color</Label>
                        <div className="mt-1" style={{ width: '100px' }}>
                          <Input type="color" value={color} onChange={(e)=>handleChangeBackgroundColor(e.target.value)}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-2">
                  <div className="fw-bolder">Border</div>
                  <div className="font-row d-flex align-items-center justify-content-between mt-1">
                    <div>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={borderOptiions}
                        onChange={(data) => setBorderOption(data)}
                        value={borderOption}
                      />
                    </div>
                    <div style={{ width: '70px' }} className="d-flex align-items-center ms-1">
                      <Input type="text" />
                      <div style={{ marginLeft: '5px' }}>px</div>
                    </div>
                    <div style={{ width: '70px' }} className="d-flex align-items-center ms-1">
                      <Input type="color" />
                    </div>
                  </div>
                </div> */}
                {/* <div className='mt-2'>
                <div className='fw-bolder'>Hover State</div>
                <div className='hover-container mt-1'>
                    <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                        <div>Hover Background Color</div>
                        <Input type='color' style={{width:'70px'}}/>
                    </div>
                    <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                        <div>Hover Border Color</div>
                        <Input type='color' style={{width:'70px'}}/>
                    </div>
                    <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                        <div>Hover font color</div>
                        <Input type='color' style={{width:'70px'}}/>
                    </div>
                    <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                        <div>Hover font format</div>
                        <div>
                            <Select
                                    className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                    classNamePrefix="select"
                                    theme={selectThemeColors}
                                    options={fontFormats}
                                    onChange={(data) => setHoverFontFormat(data)}
                                    value={hoverfontformat}
                                />

                        </div>
                    </div>
                </div>
            </div> */}
                <div className="mt-2" style={{ marginBottom: '200px' }}>
                  <div className="fw-bolder">Corners</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Select
                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        options={cornerOptiions}
                        onChange={(data) => handleCornerChange(data)}
                        value={corner}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <Input type="text" style={{ marginRight: '10px', width: '50px' }} value={cornerValue} onChange={(e)=>handleCornerValueChange(e.target.value)}/>
                      <div>px</div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
    </div>
  );
}
