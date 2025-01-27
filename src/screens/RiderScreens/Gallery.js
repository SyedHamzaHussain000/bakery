import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets';
import Button from '../../Components/Button';
import {Color} from '../../assets/Utils';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {riderStatusHandler} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
import axios from 'axios';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';

const Gallery = ({navigation, route}) => {
  const {response, data} = route.params;
  const {token} = useSelector(state => state.user);
  console.log('response.path', response.path);
  console.log('response.mime', response.mime);
  const [isLoading, setIsLoading] = useState(false);

  console.log('isLoading', isLoading);
  // const handleDropOrder = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Ensure you are passing the correct values for picPath and picMime
  //     const picPath = response.path; // Adjust this according to where the image data is coming from
  //     const picMime = response.mime; // Adjust this according to where the mime type is coming from

  //     // Now call the riderStatusHandler with the correct parameters
  //     const response = await riderStatusHandler(data._id, 'Drop', token, picPath, picMime);

  //     setIsLoading(false);
  //     console.log('response', response);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log('error', error);
  //   }
  // };

  const handleDropOrder = async () => {
    let formData = new FormData();
    formData.append('BookingId', data._id); // Ensure BookingId is valid
    formData.append('bookingStatus', 'Drop');

    if (response.path && response.mime) {
      formData.append('bookingDropImg', {
        uri: response.path, // Dynamic URI
        name: 'product', // Optional: Change to a descriptive name
        type: response.mime, // MIME type
      });
    }

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
      setIsLoading(true);

      const response = await axios.request(config);
      setIsLoading(false);

      console.log('response.data.message', response.data.message);
      if (response.data.success) {
        ShowToast('success', response.data.message);
        navigation.navigate('OrderComplete');
      } else {
        ShowToast('error', response.data.message);
      }
      return response.data;
    } catch (error) {
      setIsLoading(false);

      console.error('Error in riderStatusHandler:', error);
      throw error;
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#AFAFAF',
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={{uri: response.path}}
          style={{
            height: responsiveHeight(50),
            width: responsiveWidth(85),
            borderRadius: responsiveHeight(2),
          }}
          resizeMode="stretch" // Adjust as needed
        />
      </View>

      <Button
        padding={responsiveHeight(1.9)}
        styleName={'plainButton'}
        handleOnPress={() => handleDropOrder()}
        title={
          isLoading ? (
            <ActivityIndicator size={'large'} color={Color.white} />
          ) : (
            'Submit'
          )
        }
        color={Color.themeColor}
        marginBottom={20}
      />
    </View>
  );
};

export default Gallery;
