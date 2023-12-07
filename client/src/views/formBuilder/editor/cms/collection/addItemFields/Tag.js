import React, { useEffect, useState, useRef } from 'react';
import { Plus, X } from 'react-feather';
import { Input } from 'reactstrap';

const Tag = ({field, onChange, isDefault}) => {
  const [viewInput, setViewInput] = useState(false);
  const [tags, setTags] = useState([]);

  const onChangeTags = (v) => {
    if (tags.indexOf(v) === -1 && v) {
      onChange({[field.name]: [...tags, v]});
      setTags([...tags, v]);
    }
  }

  const cancelTag = (v) => {
    const index = tags.indexOf(v);
    const tempTags = [...tags];
    tempTags.splice(index, 1);
    onChange({[field.name]: tempTags});
    setTags(tempTags);
  }

  return <>
    {
      !viewInput && <div className='d-flex flex-wrap align-items-center border border-light-secondary rounded' onClick={() => {setViewInput(true)}}>
        {
          tags.map(t => {
            return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#d6e6fe', borderRadius: 15, height: 30, paddingRight: 10, paddingLeft: 10, margin: 3}}  onClick={(e) => {e.stopPropagation(); cancelTag(t);}}>
              {t} <X size={17} className='ms-1' onClick={(e) => {e.stopPropagation(); e.preventDefault(); cancelTag(t);}}/>
            </div>;
          })
        }
        <div style={{paddingTop: 8, paddingBottom: 8}}><Plus size={17} className='mx-1'/>Add Tag</div>
      </div>
    }
    {
      viewInput && <Input type='text' onBlur={e => {onChangeTags(e.target.value); setViewInput(false);}} disabled={isDefault} />
    }
  </>;
}

export default Tag;