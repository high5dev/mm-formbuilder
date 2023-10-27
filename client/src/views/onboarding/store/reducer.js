import { createSlice } from '@reduxjs/toolkit';

export const onboarding = createSlice({
  name: 'onboarding',
  initialState: {
    onboardStatus: {
      loading: false,
      success: false,
      error: null,
      data: null
    },
    selectedTour: '',
    currentShepherd: null
  },
  reducers: {
    onbordStatusReducer: (state, action) => {
      state.onboardStatus.loading = false;
      state.onboardStatus.success = true;
      state.onboardStatus.data = action.payload;
    },
    selectTourReducer: (state, action) => {
      state.selectedTour = action.payload;
    },
    setCurrentShepherd: (state, action) => {
      state.currentShepherd = action.payload;
    }
  }
});

export const { onbordStatusReducer, selectTourReducer, setCurrentShepherd } = onboarding.actions;

export default onboarding.reducer;
