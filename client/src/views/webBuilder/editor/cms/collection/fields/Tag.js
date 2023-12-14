// import React, { useEffect, useState, useRef } from 'react';
// import { Input } from 'reactstrap';

// const Tag = ({field, value, onChange, isDefault}) => {
//   return <Input type='text' value={value} onChange={e => {onChange(field, e.target.value)}} disabled={isDefault} />
// }

// export default Tag;

import React, { useEffect, useState, useRef } from 'react';
import { Plus, X } from 'react-feather';
import { Input } from 'reactstrap';

const Tag = ({field, value, onChange, isDefault}) => {
  const [viewInput, setViewInput] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(value || []);
  }, [value]);

  const onChangeTags = (v) => {
    if (tags.indexOf(v) === -1 && v) {
      onChange(field, [...tags, v], rowId);
      setTags([...tags, v]);
    }
  }

  const cancelTag = (v) => {
    const index = tags.indexOf(v);
    const tempTags = [...tags];
    tempTags.splice(index, 1);
    onChange(field, tempTags, rowId);
    setTags(tempTags);
  }

  return <div style={{maxWidth: 250, overflow: 'hidden'}}>
    {
      <div className={`d-flex ${viewInput && 'flex-wrap'} align-items-center border border-light-secondary rounded`} onClick={() => {setViewInput(true)}}>
        {
          tags.map(t => {
            return <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#d6e6fe', borderRadius: 12, height: 25, paddingRight: 10, paddingLeft: 10, margin: 2}}  onClick={(e) => {e.stopPropagation(); cancelTag(t);}}>
              {t} <X size={17} className='ms-1' onClick={(e) => {e.stopPropagation(); e.preventDefault(); cancelTag(t);}}/>
            </div>;
          })
        }
        {!viewInput && <div className='d-flex align-items-center'><Plus size={17} className='ms-1'/>Add Tag</div>}
      </div>
    }
    {
      viewInput && <Input type='text' onBlur={e => {onChangeTags(e.target.value); setViewInput(false);}} disabled={isDefault} />
    }
  </div>;
}

export default Tag;