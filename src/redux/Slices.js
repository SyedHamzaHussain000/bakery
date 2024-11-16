import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ShowToast} from '../GlobalFunctionns/ShowToast';

const initialState = {
  user: [],
  userType: '',
  token: '',
  isLoading: false,
  addToCartProducts: [],
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
        console.log('responseeee', response.data.data);
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
    setUserData:(state,action) => {
      state.user = action.payload
    }
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
        console.log(action.payload);
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {setUserType, clearToken, addToCart,clearProducts,setUserData} = authSlice.actions;

export default authSlice.reducer;
