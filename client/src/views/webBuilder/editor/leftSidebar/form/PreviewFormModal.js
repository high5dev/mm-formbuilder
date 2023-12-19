import React, { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '@src/assets/styles/form-builder.scss';
import {getChildPreviewFormPageAction} from '../../../store/action';
import {X} from 'react-feather';

export default function Index({store, toggle, currentFormPage}) {
  const dispatch=useDispatch();
  const formRules=store.formRules;
  const [pageContent, setPageContent]=useState();
  const [height, setHeight] = React.useState("0px");
  const ref = useRef();
  const resizeIframe=(obj) => {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  };

  const compareValues=(operator, leftValue, rightValue) =>{
    switch(operator){
      case 'is equal to':
      {
        return leftValue===rightValue;
      }
      case 'is not equal to':
      {
        return leftValue!=rightValue;
      }
      case 'is empty':{
        return rightValue==='';
      }
      case 'is filled':{
        return rightValue!='';
      }
      case 'Contains':{
        return rightValue.includes(leftValue)
      }
      case 'Does not contain':{
        return !rightValue.includes(leftValue)
      }
      case 'is checked':{
        const checked=true;
        return checked===rightValue
      }
      case 'is not checked':{
        const checked=false;
        return checked===rightValue;
      }
      case 'is after':{
        return rightValue>leftValue
      }
      case 'is after or equal to':{
        return rightValue>leftValue || rightValue===leftValue
      }
      default:
        return true
    }
  }

  const runRules=(_element)=>{
    if(formRules){
      for(let i=0; i<formRules.length;i++){
        const formRule=formRules[i];
        const input=formRule.input;
        const operators=formRule.operators;
        const output=formRule.output;
        let result='';
        for(let j=0;j<input.length;j++){
          const input_unit=input[j];
          const condition=JSON.parse(JSON.stringify(input_unit.condition));
          const value=input_unit.value;
          const element=ref.current.contentWindow.document.getElementById(value.id);
          if(element.className==='birthday-element'){
            const month=element.getElementsByTagName('select')[0].value;
            console.log('month', month)
            const inputEls=element.getElementsByTagName('input');
            const day=inputEls[0].value;
            const year=inputEls[1].value;
            const birthday=new Date(year, month, day);
            if(day && year && month){
              result=result+compareValues(condition.value,  new Date(value.inputValue), birthday);
            }
          }
          else{
            if(condition.value==='is checked' || condition.value==='is not checked'){
              result=result+compareValues(condition.value,  value.inputValue, element.checked);
            }
            else{
              if(value.inputValue){
                if(value.inputValue.value){
                  result=result+compareValues(condition.value,  value.inputValue.value, _element.value);
                }
                else{
                  result=result+compareValues(condition.value,  value.inputValue, element.value);
                }
              }
              else{
                result=result+compareValues(condition.value,  value.inputValue, element.value);
              }
            }
            if(operators.length>0 && j<operators.length){
              const operator=operators[j];
              if(operator.value==='and'){
                 result=result+'&&';
              }
              if(operator.value==='or'){
                result=result+'||';
              }
            }
          }
        };
        result=eval(result);
        if(result){
          for(let k=0; k<output.length;k++){
            const output_unit=output[k];
            const outputIds=output_unit.outputIds;
            const output_value=output_unit.value.value;
            for(let m=0; m<outputIds.length;m++){
              let selectedOutputEl=ref.current.contentWindow.document.getElementById(outputIds[m]);
              selectedOutputEl.style.display=output_value;
            }
          }
        }
        else{
          for(let k=0; k<output.length;k++){
            const output_unit=output[k];
            const outputIds=output_unit.outputIds;
            for(let m=0; m<outputIds.length;m++){
              let selectedOutputEl=ref.current.contentWindow.document.getElementById(outputIds[m]);
              selectedOutputEl.style.display='block';
            }
          }
        }
      }
    }
  }

  const onLoad = () => {
    setHeight(ref.current.contentWindow.document.body.scrollHeight + "px");
    const inputElements=ref.current.contentWindow.document.getElementsByTagName('input');
    const selectElements=ref.current.contentWindow.document.getElementsByTagName('select');
    for (let i=0; i<inputElements.length; i++){
      const element=inputElements[i];
      element.addEventListener('change', function(){
        runRules(element);
      })
    }
    for(let j=0; j<selectElements.length; j++){
      const element=selectElements[j];
      element.addEventListener('click', function(){
        runRules(element);
      })
    }
  };
  useEffect(()=>{
    const formId=store.childForm._id;
    const payload={
        id:formId,
        pageId:currentFormPage._id
    };
    dispatch(getChildPreviewFormPageAction(payload)).then((res)=>{
        setPageContent(res);
    })
  }, []);

  return (
    <div className='d-flex justify-content-around mt-5'>
      <div style={{border:'1px solid lightgray  '}}>
        <div className="p-1 d-flex justify-content-end">
              <div className="text-primary cursor-pointer" onClick={(e)=>toggle(false)}>
                Back to Editor
              </div>
        </div>
        <div className='d-flex justify-content-around' >
            <iframe ref={ref} srcDoc={pageContent} width={500} onLoad={onLoad}  height={height}/>
        </div>
      </div>
    </div>
    
  );
}
