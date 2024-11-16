import axios from 'axios';
import {baseUrl} from '../baseUrl';
import {ShowToast} from './ShowToast';
import { clearProducts } from '../redux/Slices';

export const AddProductIntegration = async (
  mime,
  path,
  productName,
  price,
  discountPrice,
  productDescp,
  category,
  stockQuantity,
  flavour,
  token,
) => {
  let data = new FormData();
  data.append('productName', productName);
  data.append('price', price);
  data.append('discountPrice', discountPrice);
  data.append('productDescp', productDescp);
  data.append('chooseCategory', category);
  data.append('stockQuantity', stockQuantity);
  data.append('flavor', flavour);
  data.append('productImage', {
    uri: path,
    name: 'Profile',
    type: mime,
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}/bakery/add-product`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async token => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}bakery/all-product`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (id, token) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}bakery/product-by-prId/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubscriberProducts = async token => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}subscriber/get-all-product`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bookProducts = async (addToCartProducts, token,dispatch) => {
  let allSuccessful = true;
  for (const area of addToCartProducts) {
    console.log('Booking product:', area._id);

    const data = JSON.stringify({
      availabilty: area.availability,
      days: area.days,
      quantity: area.quantity,
      TotalPrice: area.totalPrice,
      BakeryId: area.bakeryId,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}subscriber/product-booking/${area._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const res = await axios.request(config);
      console.log(`Product ${area._id} booked successfully`);
      if (res.data.success) {
        allSuccessful = true;
      } else {
        allSuccessful = false;

      }
    } catch (error) {
      allSuccessful = false;
      console.log(`Error booking product ${area._id}:`, error);
       ShowToast('error', error.message);
    }
  }
  if (allSuccessful) {
    dispatch(clearProducts())
   return ShowToast('success', 'Products Booked Successfully');
  } else {
  return  ShowToast('error', 'There was an issue booking products');
  }
};
