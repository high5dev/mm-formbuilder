import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { selectThemeColors } from '@utils';
import {Edit2, Plus} from 'react-feather';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { updateWebBuilderThemeAction, getToImageLibraryAction} from '../../../store/action';
import ImagesModal from '../theme/modal/ImagesModal';
export default function BackgroundTheme({store, selectedBackground, setSelectedBackground}) {
    const formTheme=store.formTheme;
    const formData=store.form.formData;
    let pages=[];
    formData && formData.map((_page)=>{
        const item={label:_page.name, value:_page._id};
        pages.push(item);
    });
    const dispatch=useDispatch();
    const [backgroundColor, setBackgroundColor]=useState();
    const [images, setImages]=useState([]);
    const [selectedImage, setSelectedImage]=useState();
    const [selectedBgColor, setSelectedBgColor]=useState('#ffffff');
    const [selectedPage, setSelectedPage]=useState(pages[0]);
    const [imagesMdl, setImagesMdl]=useState(false);
    const handlePageChange =(_page) =>{
        setSelectedPage(_page);
    }
    const _toggle=(_open)=>{
        setImagesMdl(_open);
    }

    const handleBackgroundColorChange=(_color)=>{
        let tempbackground=JSON.parse(JSON.stringify(selectedBackground));
        tempbackground.backgroundColor=_color;
        setSelectedBackground(tempbackground);
        const payload={
            background:tempbackground
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    const handlePageBgColorChange=(_color)=>{
        setSelectedBgColor(_color);
        let tempbackground=JSON.parse(JSON.stringify(selectedBackground));
        let pages=tempbackground.pages;
        pages && pages.map((_page)=>{
            if(_page._id===selectedPage._id){
                _page.backgroundColor=_color;
                return _page
            }
            else{
                return _page
            }
        });
        setSelectedBackground(tempbackground);
        const payload={
            background:tempbackground
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));
    }

    useEffect(()=>{
        const payload={page:1, pageSize:24};
        dispatch(getToImageLibraryAction(payload)).then((res)=>{
            if(res.data){
                let tempImages=images;
                for(let i=0; i<res.data.length;i++){
                    tempImages.push(res.data[i]);
                }
                setImages(tempImages);
            }
        })
    }, [])


    useEffect(()=>{
        if(selectedBackground){
            const _backgroundColor=selectedBackground.backgroundColor;
            setBackgroundColor(_backgroundColor);
        }
    }, [selectedBackground]);

    useEffect(()=>{
        let imageUrl='';
        if(selectedImage){
            imageUrl=selectedImage;
        }
        let tempbackground=JSON.parse(JSON.stringify(selectedBackground));
        let pages=tempbackground.pages;
        pages && pages.map((_page)=>{
            if(_page._id===selectedPage._id){
                _page.backgroundImage=imageUrl;
                return _page
            }
            else{
                return _page
            }
        });
        setSelectedBackground(tempbackground);
        const payload={
            background:tempbackground
          }
        const themeId=formTheme._id;
        dispatch(updateWebBuilderThemeAction(themeId, payload));

    }, [selectedImage])

    useEffect(()=>{
        if(selectedPage){
            let tempbackground=JSON.parse(JSON.stringify(selectedBackground));
            let pages=tempbackground.pages;
            if(pages.length>0){
                pages.map((_page)=>{
                    if(_page._id===selectedPage._id){
                        setSelectedBgColor(_page.backgroundColor);
                        setSelectedImage(_page.backgroundImage);
                    }
                })
            }
            else{
                setSelectedBgColor('#ffffff');
                setSelectedImage();
                pages.push({
                    _id:selectedPage._id,
                    name:selectedPage.name,
                    backgroundColor:'#ffffff',
                    backgroundImage:''
                })
            }
        }
    }, [selectedPage])


    return(
        <div className='p-1'>
            <div className='default-background'>
                <div className='fs-5 fw-bold'>
                    Default Background
                </div>
                <div className='d-flex justify-content-between mt-1'>
                    <div>Background Color</div>
                    <Input type='color' value={backgroundColor} style={{width:'30px', padding:'5px', height:'30px'}} onChange={(e)=>handleBackgroundColorChange(e.target.value)}/>
                </div>
            </div>
            <div className='page-background mt-2'>
                <div className='fs-5  fw-bold'>
                    Background Per Page
                </div>
                <div className='mt-1'>
                    <div className='d-flex justify-content-around' >
                        <div style={{width:'50%'}}>
                            <Select
                                className="react-select ms-1 mobile-view-responsive-ybusiness-react-select"
                                classNamePrefix="select"
                                options={pages}
                                onChange={(data) => handlePageChange(data)}
                                value={selectedPage}
                            />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className='py-1'>
                            Background Image
                        </div>
                        <div className='background-image-element d-flex justify-content-around' onClick={(e)=>setImagesMdl(true)}>
                            {
                                selectedImage?<img src={selectedImage?.image} width={150} height={150}/>:
                                <div className='upload-image d-flex align-items-center justify-content-around cursor-pointer' style={{border:'1px dashed lightgray', width:'200px', height:'200px'}}>
                                    <div className='d-flex align-items-center'>
                                        <Plus color={'#000000'}/>
                                        <div>Image</div>
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            selectedImage && 
                            <div className='text-primary text-center cursor-pointer fw-bold mt-1' onClick={(e)=>setSelectedImage()}>
                                Remove
                            </div>
                        }

                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='py-1'>
                            Background Color
                        </div>
                        <div>
                            <Input type='color' value={selectedBgColor} style={{width:'30px', padding:'5px', height:'30px'}} onChange={(e)=>handlePageBgColorChange(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <ImagesModal store={store} selectedImage={selectedImage} setSelectedImage={setSelectedImage} isOpen={imagesMdl} images={images} toggle={_toggle}/>
        </div>
    )
}