import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { ShowToast } from './ShowToast';
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
    url: `https://appsdemo.pro/Bakery/api/bakery/all-product`,
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

export const bookProducts = async (addToCartProducts, token, dispatch) => {
  let allSuccessful = true;
  for (const area of addToCartProducts) {
    // console.log('Booking product:', area._id);

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
      console.log(`res.data`, res.data);
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
    dispatch(clearProducts());
    return ShowToast('success', 'Products Booked Successfully');
  } else {
    return ShowToast('error', 'There was an issue booking products');
  }
};

export const searchProductsHandler = async (searchValue, token, id) => {
  let data = JSON.stringify({
    searchTerm: searchValue,
    bakeryId: id,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://appsdemo.pro/Bakery/api/bakery/SearchProductByNameAndCatagoreis',
    headers: {
      'Content-Type': 'application/json',
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
  // setData(response.data.products);
};

export const getProductsByCategoryHandler = async (
  activeCategory,
  token,
  id,
) => {
  let data = {
    chooseCategory: activeCategory,
    bakeryId: id,
  };

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://appsdemo.pro/Bakery/api/bakery/GetAllProductByCatagories',
    headers: {
      'Content-Type': 'application/json',
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

export const getAllBookedProductsHandler = async token => {
  let data = '';
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}subscriber/GetAllMyBookingProducts`,
    headers: {
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

export const getAllAcceptedBookings = async (token) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/get-all-accepted-booking`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const orderReadyHandler = async (id, token) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}bakery/booking-ready-owner/${id}`,
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

export const createPostHandler = async (caption, imageData, token) => {
  let data = new FormData();
  data.append('caption', caption);
  if (imageData && imageData.path && imageData.mime) {
    data.append('postPicture', {
      uri: imageData.path,
      name: 'Pic',
      type: imageData.mime,
    });
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}post/createPost`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllPostHandler = async token => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}post/getAllPost`,
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

export const addCommentHandler = async (id, commentText, token) => {
  let data = JSON.stringify({
    postId: id,
    comment: commentText,
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}post/CommentAPost`,
    headers: {
      'Content-Type': 'application/json',
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

export const getAllReadyBookingHandler = async token => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/get-all-ready-booking`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const riderStatusHandler = async (
  bookingId,
  bookingStatus,
  token,
  picPath,
  picMime,
) => {
  let formData = new FormData();
  formData.append('BookingId', bookingId);
  formData.append('bookingStatus', bookingStatus);
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/order-book-from-rider`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  try {
    const response = await axios.request(config);
    console.log('response.data.message', response.data.message);
    if (response.data.success) {
      ShowToast('success', response.data.message);
    } else {
      ShowToast('error', response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Error in riderStatusHandler:', error);
    throw error;
  }
};


export const completedOrdersHandler = async (token) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/get-all-accepted-completed-booking`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  try {
    const response = await axios.request(config)
    return response.data
  } catch (error) {
    throw error
  }


}
export const acceptOrderHandler = async (orderData) => {
  let data = JSON.stringify({
    "bookingId": orderData.bookingId,
    "riderId": orderData.riderId,
    "type": orderData.type,
    "riderStatus": orderData.riderStatus,
    "orderStatus": orderData.orderStatus
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/accept-booking`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config)
    return response
  } catch (error) {
    throw error
  }
}

export const rejectOrderHandler = async (orderData) => {
  let data = JSON.stringify({
    "bookingId": orderData.bookingId,
    "riderId": orderData.riderId,
    "type": orderData.type,
    "riderStatus": 'Rejected'
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${baseUrl}rider/rejected-booking`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  try {
    const response = await axios.request(config)
    return response
  } catch (error) {
    throw error
  }
}