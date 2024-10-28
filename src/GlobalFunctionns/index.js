import axios from 'axios';
import {baseUrl} from '../baseUrl';

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

export const getSubscriberProducts = async (token) => {
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
