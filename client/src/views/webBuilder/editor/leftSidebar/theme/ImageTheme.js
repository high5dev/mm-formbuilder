import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';
import { selectThemeColors } from '@utils';
import {Edit2, Plus} from 'react-feather';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { updateWebBuilderThemeAction } from '../../../store/action';
export default function ImageTheme({store, selectedImage, setSelectedImage}) {
    const formTheme=store.formTheme;
    setSelectedImage(formTheme.image);
    const dispatch=useDispatch();
    const borderOptiions=[
        {label:'All', value:'All'},
        {label:'Top', value:'Top'},
        {label:'Right', value:'Right'},
        {label:'Bottom', value:'Bottom'},
        {label:'Left', value:'Left'}
    ];
    const cornerOptiions=[
        {label:'All', value:'All'},
        {label:'Top Left', value:'Top Left'},
        {label:'Top Right', value:'Top Right'},
        {label:'Bottom Left', value:'Bottom Left'},
        {label:'Bottom Right', value:'Bottom Right'}
    ];

    const [border, setBorder]=useState(borderOptiions[0]);
    const [borderColor, setBorderColor]=useState();
    const [borderWidth, setBorderWidth]=useState();
    const [corner, setCorner]=useState(cornerOptiions[0]);
    const [borderRadius, setBorderRadius]=useState();

    const handleBorderWidthChange=(_value)=>{
        setBorderWidth(_value);
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        tempImage.attributes.borderWidth=_value+'px';
        setSelectedImage(tempImage);
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const hanldeBorderRadiusChange = (_value) => {
        setBorderRadius(_value);
        const _corner=corner.value;
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        if(_corner==='All'){
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderRadius=_value+'%';
            setSelectedImage(tempImage);
        }
        else if(_corner==='Top Left'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderTopLeftRadius=_value+'%';
            setSelectedImage(tempImage);
        }
        else if(_corner ==='Top Right'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderTopRightRadius=_value+'%';
            setSelectedImage(tempImage);
        }
        else if(_corner ==='Bottom Left'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderBottomLeftRadius=_value+'%';
            setSelectedImage(tempImage);
        }
        else if(_corner==='Bottom Right'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            tempImage.attributes.borderBottomRightRadius=_value+'%';
            setSelectedImage(tempImage);
        }
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleBorderChange =(_border)=>{
        setBorder(_border);
        const _value=_border.value;
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        if(_value==='All'){
            delete tempImage.attributes['borderLeftStyle'];
            delete tempImage.attributes['borderRightStyle'];
            delete tempImage.attributes['borderTopStyle'];
            delete tempImage.attributes['borderBottomStyle'];
            tempImage.attributes.borderStyle='solid';
            setSelectedImage(tempImage);
        }
        else if(_value==='Top'){
            delete tempImage.attributes['borderLeftStyle'];
            delete tempImage.attributes['borderRightStyle'];
            delete tempImage.attributes['borderStyle'];
            delete tempImage.attributes['borderBottomStyle'];
            tempImage.attributes.borderTopStyle='solid';
            setSelectedImage(tempImage);
        }
        else if(_value==='Left'){
            delete tempImage.attributes['borderTopStyle'];
            delete tempImage.attributes['borderRightStyle'];
            delete tempImage.attributes['borderStyle'];
            delete tempImage.attributes['borderBottomStyle'];
            tempImage.attributes.borderLeftStyle='solid';
            setSelectedImage(tempImage);
        }
        else if(_value==='Right'){
            delete tempImage.attributes['borderTopStyle'];
            delete tempImage.attributes['borderLeftStyle'];
            delete tempImage.attributes['borderStyle'];
            delete tempImage.attributes['borderBottomStyle'];
            tempImage.attributes.borderRightStyle='solid';
            setSelectedImage(tempImage);
        }
        else if(_value==='Bottom'){
            delete tempImage.attributes['borderTopStyle'];
            delete tempImage.attributes['borderLeftStyle'];
            delete tempImage.attributes['borderStyle'];
            delete tempImage.attributes['borderRightStyle'];
            tempImage.attributes.borderBottomStyle='solid';
            setSelectedImage(tempImage);
        }
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleBorderColorChange = (_value) =>{
        setBorderColor(_value);
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        tempImage.attributes.borderColor=_value;
        delete tempImage.attributes['themeColor'];
        setSelectedImage(tempImage);
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleCornerChange =(_corner)=>{
        setCorner(_corner);
        const _value=_corner.value;
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        if(_value==='All'){
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderRadius=borderRadius+'%';
            setSelectedImage(tempImage);
        }
        else if(_value==='Top Left'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderTopLeftRadius=borderRadius+'%';
            setSelectedImage(tempImage);
        }
        else if(_value ==='Top Right'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderTopRightRadius=borderRadius+'%';
            setSelectedImage(tempImage);
        }
        else if(_value ==='Bottom Left'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomRightRadius'];
            tempImage.attributes.borderBottomLeftRadius=borderRadius+'%';
            setSelectedImage(tempImage);
        }
        else if(_value==='Bottom Right'){
            delete tempImage.attributes['borderRadius'];
            delete tempImage.attributes['borderTopLeftRadius'];
            delete tempImage.attributes['borderTopRightRadius'];
            delete tempImage.attributes['borderBottomLeftRadius'];
            tempImage.attributes.borderBottomRightRadius=borderRadius+'%';
            setSelectedImage(tempImage);
        }
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const selectThemeBorderColor =(_color)=>{
        setBorderColor(_color.value);
        let tempImage=JSON.parse(JSON.stringify(selectedImage));
        tempImage.attributes.borderColor=_color.value;
        tempImage.attributes['themeColor']=_color.name;
        setSelectedImage(tempImage);
        const payload={
            image:tempImage
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    useEffect(()=>{
       if(selectedImage){
        let borderRadius;
        if(selectedImage.attributes.borderRadius){
            borderRadius=selectedImage.attributes.borderRadius;
        }
        else if(selectedImage.attributes.borderTopLeftRadius){
            borderRadius=selectedImage.attributes.borderTopLeftRadius;
        }
        else if(selectedImage.attributes.borderTopRightRadius){
            borderRadius=selectedImage.attributes.borderTopRightRadius;
        }
        else if(selectedImage.attributes.borderBottomRightRadius){
            borderRadius=selectedImage.attributes.borderBottomRightRadius;
        }
        else if(selectedImage.attributes.borderBottomLeftRadius){
            borderRadius=selectedImage.attributes.borderBottomLeftRadius;
        }
        let borderWidth=selectedImage.attributes.borderWidth;
        let borderRadius_matches = borderRadius.match(/(\d+)/);
        let borderWidth_matches = borderWidth.match(/(\d+)/);
        let borderColor=selectedImage.borderColor;
        if (borderWidth_matches) {
            setBorderWidth(borderWidth_matches[0]);
        }
        if (borderRadius_matches) {
            setBorderRadius(borderRadius_matches[0]);
        }
        setBorderColor(borderColor);
       } 
    }, [selectedImage])
    return(
        <div className='p-1'>
            <div className='d-flex justify-content-around mt-2 mb-2'>
                <img src="../../assets/images/back.jpg" width="120px" height="120px" style={{...selectedImage?.attributes}}/>
            </div>
            <div className='mt-2'>
                <div>
                    <div className='fw-bold'>Border</div>
                    <div className='border-row mt-1 d-flex align-items-center justify-content-around'>
                        <div style={{width:'50%'}}>
                            <Select
                                className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                classNamePrefix="select"
                                theme={selectThemeColors}
                                options={borderOptiions}
                                onChange={(data) => handleBorderChange(data)}
                                value={border}
                            />
                        </div>
                        <div className='d-flex align-items-center' style={{width:'25%'}}>
                            <Input type='text' value={borderWidth} onChange={(e)=>handleBorderWidthChange(e.target.value)} style={{padding:'7px', marginRight:'5px'}}/>
                            px
                        </div> 
                        {/* <div className="color-selection" style={{width:'50px'}}>
                            <Input type='color' value={borderColor} onChange={(e)=>handleBorderColorChange(e.target.value)}/>
                        </div>  */}
                    </div>
                    <div className='ms-1'>
                            <div>
                                <Label>Border Color</Label>
                                <div className='d-flex flex-wrap align-items-center mt-1' style={{width:'200px'}}>
                                {
                                formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                                    return(
                                    <div style={{width:'30px', height:'30px',margin:'3px', backgroundColor:_color.value}} onClick={(e)=>{
                                        selectThemeBorderColor(_color);
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
                                <Input type="color" value={borderColor} onChange={(e)=>handleBorderColorChange(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='mt-2'>
                    <div className='fw-bold'>Corner</div>
                    <div className='corner-row mt-1 d-flex align-items-center justify-content-around'>
                            <div style={{width:'70%'}}>
                                <Select
                                    className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                    classNamePrefix="select"
                                    theme={selectThemeColors}
                                    options={cornerOptiions}
                                    onChange={(data) => handleCornerChange(data)}
                                    value={corner}
                                />
                            </div>
                            <div className='d-flex align-items-center' style={{width:'25%'}}>
                                <Input type='text' value={borderRadius} onChange={(e)=>hanldeBorderRadiusChange(e.target.value)} style={{padding:'7px', marginRight:'5px'}}/>
                                %
                            </div> 
                    </div>
                </div>
            </div>
        </div>
    )

}
