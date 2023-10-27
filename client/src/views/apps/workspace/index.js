// ** React Imports
import { useEffect, useState } from 'react';

// ** Reactstrap Imports
import { Badge, Input } from 'reactstrap';

// ** Actions
import { updateWorkspaceTitle } from './store';

// ** Styles
import '@styles/react/apps/app-kanban.scss';
import '@src/assets/styles/app-kanban.scss';

const Workspace = (props) => {
  // ** States
  const { workspace, dispatch, isLabel, currentLabel } = props;
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(workspace?.title);
  }, [workspace?.title]);

  const workspaceTitleChange = (value) => {
    setTitle(value);
  };

  const trackEnterKey = (event) => {
    if (event.key === 'Enter') {
      dispatch(
        updateWorkspaceTitle({
          id: workspace._id,
          title: event.target.value
        })
      );
      event.target.blur();
    }
  };

  return (
    <div className="app-workspace-wrapper">
      {/* <Input
        id="selWorkspaceTitle"
        key="selWorkspaceTitle"
        style={{
          fontSize: '1.2rem',
          fontWeight: 800,
          spellCheck: false,
          dir: 'auto',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          width: '140px'
        }}
        className="py-1"
        onChange={(e) => workspaceTitleChange(e.target.value)}
        onKeyPress={trackEnterKey}
        value={`${title}`}
        disabled={title === 'Personal' || title === 'Business'}
      /> */}
      <h4
        id="selWorkspaceTitle"
        key="selWorkspaceTitle"
        style={{
          fontSize: '1.2rem',
          fontWeight: 800,
          spellCheck: false,
          dir: 'auto',
          borderColor: 'transparent',
          backgroundColor: 'transparent'
          // width: '140px'
        }}
        className="p-1 py-1 ml-1 mb-0"
      >
        {title}
      </h4>
    </div>
  );
};

export default Workspace;
