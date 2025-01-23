import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { UserLogin } from '../redux/Slices';

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

// export const EditProfileHandler = async (
//   userType,
//   // mime,
//   // path,
//   username,
//   phone,
//   dob,
//   state,
//   city,
//   zipCode,
//   bakeryName,
//   bakeryWeb,
//   bakeryHours,
//   selectedCategories,
//   latLng,
//   token,
// ) => {
//    console.log('userType=========>>>>>>>>>>>>', latLng)
//   let data = new FormData();
//   data.append('userName', username ? username : 'abc');
//   data.append('phoneNumber', phone ? phone : '');
//   data.append('DOB', dob ? dob : '');
//   data.append('city', city ? city : '');

//   if (userType !== 'Owner') {
//     data.append('state', state ? state : '');
//     data.append('zipCode', zipCode ? zipCode : '');
//   } 
//   else if (userType === 'Subscriber') {
//     alert('hello world')
//     // data.append('Longtitude', JS
//     // ON.stringify(40.6544));
//     // data.append('Latitude', JSON.stringify(64.8989));
//   }
//   else if (userType === 'Owner') {
//     data.append('bakeryName', bakeryName ? bakeryName : '');
//     data.append('bakeryWebsite', bakeryWeb ? bakeryWeb : '');
//     data.append('businessHours', bakeryHours ? bakeryHours : '');
//     data.append('categories', selectedCategories ? selectedCategories : '');
//   }
//   // data.append('profilePic', {
//   //   uri: path ? path : '1737581270009-Profile',
//   //   name: 'Profile',
//   //   type: mime ?  mime : 'image/jpeg',
//   // });
//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: `${baseUrl}/user/edit-profile`,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     },
//     data: data,
//   };

//   try {
//     const response = await axios.request(config);
//     console.log('edit response.data==<<<<<<<>', response.data.data.Location);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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
  console.log('userType and latLng:================>>>>>>>>>>>>>', userType, latLng);
  let data = new FormData();
  data.append('userName', username);
  data.append('phoneNumber', phone);
  data.append('DOB', dob);
  data.append('city', city);
  data.append('profilePic', {
    uri: path,
    name: 'Profile',
    type: mime,
  });
  if (userType !== 'Rider' && latLng?.latitude && latLng?.longitude) {
    data.append('Latitude', latLng.latitude);
    data.append('Longtitude', latLng.longitude);
  }
  if (userType === 'Subscriber' || 'Rider') {
    data.append('state', state);
    data.append('zipCode', zipCode);
  } if (userType === 'Owner') {
    data.append('bakeryName', bakeryName);
    data.append('bakeryWebsite', bakeryWeb);
    data.append('businessHours', bakeryHours);
    data.append('categories', selectedCategories);
  }
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
    console.log('Edit response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during edit profile API call:', error);
    throw error;
  }
};
