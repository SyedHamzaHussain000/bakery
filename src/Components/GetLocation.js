import React from 'react';
import {StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {responsiveHeight} from '../assets/Responsive_Dimensions';
import {Apikey} from '../assets/ApiKey';
import { Color } from '../assets/Utils';

const GetSearchedLocation = ({placeholder, onLocationSelect}) => {
  return (
    <GooglePlacesAutocomplete
      debounce={400}
      minLength={2}
      listViewDisplayed="auto"
      enablePoweredByContainer={false}
      placeholder={placeholder}
      onPress={(data, details = null) => {
        if (details) {
          const locationName = details.formatted_address;
          const latitude = details.geometry.location.lat;
          const longitude = details.geometry.location.lng;
          onLocationSelect({locationName, latitude, longitude});
        }
      }}
      styles={styles}
      query={{
        key: Apikey, // Replace with your API key
        language: 'en',
      }}
      fetchDetails={true} // Required to get full location details
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 20,
    height: responsiveHeight(6.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listView: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 20,
    maxHeight: responsiveHeight(10),
  },
  container: {
    zIndex: 20,
  },
});

export default GetSearchedLocation;
