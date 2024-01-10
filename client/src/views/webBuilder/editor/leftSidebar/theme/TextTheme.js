import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Nav, NavItem, NavLink, Input, Label } from 'reactstrap';
import {Edit2, Plus} from 'react-feather';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { MultiSelect } from "react-multi-select-component";
import { updateWebBuilderThemeAction } from '../../../store/action';
export default function TextTheme({store, selectedFont, setSelectedFont}) {
    const formTheme=store.formTheme;
    const dispatch=useDispatch();
    const [isMobileView, setIsMobileView] = useState(false);
    const [isTabletView, setIsTabletView] = useState(false);
    const [isDesktopView, setIsDesktopView] = useState(false);
    const fontOptiions=[
        {label:'Arial', value:'Arial'},
        {label:'Helvetica', value:'Helvetica'},
        {label:'Verdana', value:'Verdana'},
        {label:'Optima', value:'Optima'},
        {label:'Didot', value:'Didot'},
        {label:'Georgia', value:'Georgia'},
        {label:'FreeMono', value:'FreeMono'},
        {label:'Blippo', value:'Blippo'}
    ];
    const [font, setFont]=useState(fontOptiions[0]);
    const fontSizeOptions=[
        {label:8, value:8},
        {label:9, value:9},
        {label:10, value:10},
        {label:11, value:11},
        {label:12, value:12},
        {label:14, value:14},
        {label:16, value:16},
        {label:18, value:18},
        {label:24, value:24},
        {label:30, value:30},
        {label:32, value:32},
        {label:36, value:36},
        {label:48, value:48},
        {label:60, value:60},
        {label:72, value:72},
        {label:96, value:96}
    ];
    const [fontSize, setFontSize]=useState(fontSizeOptions[0]);
    const fontFormatOptions=[
        {
            label:'Bold',  value:'Bold'
        },
        {
            label:'UnderLine',  value:'UnderLine'
        },
        {
            label:'Italic',  value:'Italic'
        }
    ];
    const [fontFormats, setFontFormats]=useState([fontFormatOptions[0]]);
    const [fontColor, setFontColor]=useState();

    const handleFontColorChange=(_color)=>{
        const fonts=formTheme.fonts;
        let newFonts=fonts && fonts.map((_font)=>{
            if(_font.type===selectedFont.type){
                let tempFont=JSON.parse(JSON.stringify(_font));
                tempFont.attributes.color=_color;
                delete tempFont.attributes['themeColor'];
                setSelectedFont({...tempFont});
                return tempFont
            }
            else{
                return _font;
            }
        });
        const payload={
            fonts:newFonts
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const selectThemeFontColor=(_color)=>{
        const fonts=formTheme.fonts;
        let newFonts=fonts && fonts.map((_font)=>{
            if(_font.type===selectedFont.type){
                let tempFont=JSON.parse(JSON.stringify(_font));
                tempFont.attributes.color=_color.value;
                tempFont.attributes['themeColor']=_color.name;
                setSelectedFont({...tempFont});
                return tempFont
            }
            else{
                return _font;
            }
        });
        const payload={
            fonts:newFonts
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleChangeFontSize=(_fontsize)=>{
        const fonts=formTheme.fonts;
        let newFonts=fonts && fonts.map((_font)=>{
            if(_font.type===selectedFont.type){
                let tempFont=JSON.parse(JSON.stringify(_font));
                tempFont.attributes.fontSize=_fontsize.value+'px';
                setSelectedFont({...tempFont});
                return tempFont
            }
            else{
                return _font
            }
        });
        const payload={
            fonts:newFonts
        }
      const themeId=formTheme._id;
      dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleChangeFont=(fnt)=>{
        const fonts=formTheme.fonts;
        let newFonts=fonts && fonts.map((_font)=>{
            if(_font.type===selectedFont.type){
                let tempFont=JSON.parse(JSON.stringify(_font));
                tempFont.attributes.fontFamily=fnt.value;
                setSelectedFont({...tempFont});
                return tempFont
            }
            else{
                return _font
            }
        });
        const payload={
            fonts:newFonts
          }
          const themeId=formTheme._id;
          dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handleFontFormatChange = (_formats)=>{
        setFontFormats([..._formats]);
        const fonts=formTheme.fonts;
        let newFonts=fonts && fonts.map((_font)=>{
            if(_font.type===selectedFont.type){
                let tempFont=JSON.parse(JSON.stringify(_font));
                tempFont.attributes.fontWeight='normal';
                tempFont.attributes.textDecoration='none';
                tempFont.attributes.fontStyle='normal';
                for(let i=0; i<_formats.length; i++){
                    const value=_formats[i].value;
                    if(value==='Bold'){
                        tempFont.attributes.fontWeight='bold';
                    }
                    if(value==='UnderLine'){
                        tempFont.attributes.textDecoration='underline';
                    }
                    if(value==='Italic'){
                        tempFont.attributes.fontStyle='italic'; 
                    }
                }
                setSelectedFont({...tempFont});
                return tempFont
            }
            else{
                return _font;
            }
        });
        const payload={
            fonts:newFonts
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));

    }


    useEffect(() => {
        const handleResize = () => {
          const windowWidth = window.innerWidth;
          const isMobile = windowWidth <= 767;
          const isTablet = windowWidth >= 768 && windowWidth <= 1023;
          const isDesktop = windowWidth >= 1024;
    
          setIsMobileView(isMobile);
          setIsTabletView(isTablet);
          setIsDesktopView(isDesktop);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    useEffect(()=>{
        if(selectedFont){
            const fontSize=selectedFont.attributes.fontSize;
            const fontFamily=selectedFont.attributes.fontFamily;
            const fontWeight=selectedFont.attributes.fontWeight;
            const fontColor=selectedFont.attributes.color;
            const textDecoration=selectedFont.attributes.textDecoration;
            const fontStyle=selectedFont.attributes.fontStyle;
            let matches = fontSize.match(/(\d+)/);
            let tempFormats=[];
            if (matches) {
                setFontSize({label:matches[0], value:matches[0]});
            }
            if(fontWeight ==='bold'){
                tempFormats.push({label:'Bold', value:'Bold'});
            }
            if(textDecoration==='underline'){
                tempFormats.push({label:'UnderLine', value:'UnderLine'});
            }
            if(fontStyle==='italic'){
                tempFormats.push({label:'Italic', value:'Italic'});
            };
            setFontFormats([...tempFormats]);
            setFont({label:fontFamily, value:fontFamily})
            setFontColor(fontColor);
        }
    }, [selectedFont])

    return(
        <div className='p-1'>
            <div className='d-flex justify-content-around align-items-center mb-1' style={{...selectedFont.attributes}}>
                {selectedFont?.type} Example
            </div>
            <div>
                <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                            <div>Font</div>
                            <div>
                                <Select
                                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                        classNamePrefix="select"
                                        options={fontOptiions}
                                        onChange={(data) => handleChangeFont(data)}
                                        value={font}
                                    />
                            </div>
                </div>
                <div className='hover-row d-flex justify-content-between align-items-center mt-1'>
                            <div>Font Size</div>
                            <div>
                                <Select
                                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                        classNamePrefix="select"
                                        options={fontSizeOptions}
                                        onChange={(data) => handleChangeFontSize(data)}
                                        value={fontSize}
                                    />
                            </div>
                </div>
                <div className='color-row d-flex justify-content-between mt-1'>
                    <div>
                        <Label>Font Color</Label>
                        <div className='ms-1'>
                            <div>
                                <Label>Theme Color</Label>
                                <div className='d-flex justify-content-around align-items-center mt-1' style={{width:'200px'}}>
                                {
                                formTheme && formTheme.colors && formTheme.colors.map((_color)=>{
                                    return(
                                    <div style={{width:'30px', height:'30px',backgroundColor:_color.value}} onClick={(e)=>{
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
                                <Input type="color" value={handleFontColorChange} onChange={(e)=>handleFontColorChange(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hover-row mt-1'>
                            <div>Font Format</div>
                            <div>
                                <MultiSelect
                                    value={fontFormats}
                                    className=""
                                    classNamePrefix="select"
                                    options={fontFormatOptions}
                                    style={{marginLeft:'0px'}}
                                    onChange={(e)=>handleFontFormatChange(e)}
                                    />
                                {/* <Select
                                        className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                        classNamePrefix="select"
                                        options={fontFormats}
                                        onChange={(data) => handleFontFormatChange(data)}
                                        value={fontFormat}
                                    /> */}
                            </div>
                </div>
            </div>
        </div>
    )
}
