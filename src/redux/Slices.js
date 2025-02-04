import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ShowToast} from '../GlobalFunctionns/ShowToast';

const initialState = {
  user: [],
  userType: '',
  userData: {},
  updatedProfile: null,
  token: '',
  isLoading: false,
  addToCartProducts: [],
  startRide:true,
  nextCheckpoint:false,
  reachedDestination:false,
  checkpointId:null,
  startRoute: {},
  endRoute: {},
  currentLocation: {},
  pickupLocation: {},
  dropoffLocation: {},
  error: null,
};

export const UserLogin = createAsyncThunk(
  'auth/UserLogin',
  async (config, {rejectWithValue}) => {
    await axios.request(config);
    try {
      const response = await axios(config);
      console.log('response===>>>', JSON.stringify(response.data.success));
      if (response.data.success) {
        ShowToast('success', 'Login Successful');
        console.log('responseeee====>>>>>', response.data.data);
        return response.data;
      } else {
        ShowToast('error', response.data.message);
        console.log('response.data.message');
        return rejectWithValue(response.data);
      }
    } catch (error) {
      console.log(error);
      ShowToast('error', error.message);
      return rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    clearToken: (state, action) => {
      state.token = '';
    },

    addToCart: (state, action) => {
      state.addToCartProducts = action.payload;
    },
    clearProducts: (state, action) => {
      state.addToCartProducts = [];
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setStartRide: (state, action) => {
      state.startRide = action.payload;
    },
    setNextCheckpoint: (state, action) => {
      state.nextCheckpoint = action.payload;
    },
    setReachedDestination: (state, action) => {
      state.reachedDestination = action.payload;
    },
    setCheckPointId: (state, action) => {
      state.checkpointId = action.payload;
    },
    setStartRoute: (state, action) => {
      state.startRoute = action.payload;
    },
    setEndRoute: (state, action) => {
      state.endRoute = action.payload;
    },
    setUpdatedProfile: (state, action) => {
      state.updatedProfile = action.payload;
    },
    setProfileData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentLocation: (state, action) => {
      console.log('action.payload', action.payload);
      state.currentLocation = action.payload;
    },
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDropoffLocation: (state, action) => {
      state.dropoffLocation = action.payload;
    },
    clearUserData: state => {
      state.user = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(UserLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.token;
        console.log('action.payloaaaad<<<<=====', action.payload);
        state.userData = action.payload.data;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUserType,
  clearToken,
  addToCart,
  clearProducts,
  setUserData,
  setProfileData,
  clearUserData,
  setUpdatedProfile,
  setStartRoute,
  setEndRoute,
  setStartRide,
  setNextCheckpoint,
  setReachedDestination,
  setCheckPointId,
  setCurrentLocation,
  setPickupLocation,
  setDropoffLocation,
} = authSlice.actions;

export default authSlice.reducer;
