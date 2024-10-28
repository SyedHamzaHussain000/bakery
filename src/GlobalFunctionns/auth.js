import axios from 'axios';
import {baseUrl} from '../baseUrl';
import {UserLogin} from '../redux/Slices';

export const registeration = async (
  name,
  email,
  address,
  password,
  userType,
) => {
  let data = JSON.stringify({
    userName: name,
    email: email,
    password: password,
    address: address,
    type: userType,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleLogin = (email, password, dispatch, userType) => {
  let data = JSON.stringify({
    email: email,
    password: password,
    type: userType,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/login`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  dispatch(UserLogin(config));
};

export const EditProfileHandler = async (
  userType,
  mime,
  path,
  username,
  phone,
  dob,
  state,
  city,
  zipCode,
  bakeryName,
  bakeryWeb,
  bakeryHours,
  selectedCategories,
  latLng,
  token,
) => {
  console.log('allitems',userType,mime,path,username,phone,dob,city,bakeryName,bakeryWeb,bakeryHours,selectedCategories,latLng,token)
  let data = new FormData();
  data.append('userName', username);
  data.append('phoneNumber', phone);
  data.append('DOB', dob);
  data.append('city', city);
  if (userType !== 'Owner') {
    data.append('state', state);
    data.append('zipCode', zipCode);
  } else {
    data.append('bakeryName', bakeryName);
    data.append('bakeryWebsite', bakeryWeb);
    data.append('businessHours', bakeryHours);
    data.append('categories', selectedCategories);
    data.append('Longtitude', latLng.lat);
    data.append('Latitude', latLng.lng);
  }
  data.append('profilePic', {
    uri: path,
    name: 'Profile',
    type: mime,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/edit-profile`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
