// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmptyObject } from 'jquery';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// ** Fetch Workspace - api
export const fetchWorkspaceApi = createAsyncThunk('appWorkspace/fetchWorkspace', async () => {
  const response = await API.get(`/workspace/get-all/`);
  return response.data;
});

// ** Fetch All Workspace
// export const getNewWorkspaceApi = createAsyncThunk('appWorkspace/newWorkspace', async () => {
//   const response = await API.get(`/workspace/get-new/`);
//   return response.data;
// });

// ** Fetch All Workspace
export const getSharedWorkspaceApi = createAsyncThunk('appWorkspace/sharedWorkspace', async () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const response = await API.get(`/workspace/get-shared/${userId}`);
  return response.data;
});

export const getSelectedWorkspaceData = createAsyncThunk(
  'appSelectWorkspace/selectWorkspace',
  async (id) => {
    const response = await API.get(`/workspace/get/${id}`);
    return response.data.data;
  }
);

export const addWorkspace = createAsyncThunk(
  'appWorkspace/addWorkspace',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/add', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const updateWorkspaceTitle = createAsyncThunk(
  'appWorkspace/updateWorkspaceTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/update', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const deleteWorkspace = createAsyncThunk(
  'appWorkspace/deleteWorkspace',
  async (data, { dispatch }) => {
    const response = await API.delete(`/workspace/delete/${data.id.toString()}`);
    await dispatch(fetchWorkspaceApi());
    return response;
  }
);

// ** Share Tasks
export const fetchSharedTasksApi = createAsyncThunk('appWorkspace/getShared', async () => {
  const response = await API.get(`/kanban/share`);
  return response.data.data;
});

export const shareTasks = createAsyncThunk('appWorkspace/share', async (data, { dispatch }) => {
  const response = await API.post(`/kanban/share`, data);
  await dispatch(fetchWorkspaceApi());
  return response;
});

export const shareRevertTask = createAsyncThunk(
  'appWorkspace/share',
  async (data, { dispatch }) => {
    const response = await API.post(`/kanban/share-revert`, data);
    await dispatch(fetchWorkspaceApi());
    toast.success('Assigneee is successfully deleted');
    return response;
  }
);

export const appWorkspaceSlice = createSlice({
  name: 'appWorkspace',
  initialState: {
    workspace: [],
    selectedWorkspace: {},
    newWorkspace: {},
    shared: {},
    boards: [],
    tasks: []
  },
  reducers: {
    handleSelectWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceApi.fulfilled, (state, action) => {
        state.workspace = action.payload;
        if (isEmptyObject(state.selectedWorkspace)) {
          state.selectedWorkspace = action.payload[0];
        } else if (state.selectedWorkspace?.isShared) {
        } else {
          state.selectedWorkspace =
            action.payload.filter((x) => x._id === state.selectedWorkspace._id)[0] ||
            action.payload[0];
        }
      })
      .addCase(fetchSharedTasksApi.fulfilled, (state, action) => {
        state.shared = action.payload;
        if (state.selectedWorkspace?.isShared) {
          state.selectedWorkspace = action.payload;
        }
      })
      .addCase(getSelectedWorkspaceData.fulfilled, (state, action) => {
        state.selectedWorkspace = action.payload;
      })
      // .addCase(getNewWorkspaceApi.fulfilled, (state, action) => {
      //   state.newWorkspace = action.payload;
      // })
      .addCase(getSharedWorkspaceApi.fulfilled, (state, action) => {
        state.sharedWorkspace = action.payload;
      });
  }
});

export const { handleSelectWorkspace, handleSelectTask } = appWorkspaceSlice.actions;

export default appWorkspaceSlice.reducer;
