import {View, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Color} from '../../assets/Utils';
import Button from '../../Components/Button';
import {useSelector} from 'react-redux';
import { responsiveHeight } from '../../assets/Responsive_Dimensions';

const ChooseLocation = ({navigation, route}) => {
  const mapRef = useRef(null);
  const {type} = route.params;
  console.log('type', type);
  const {userType} = useSelector(state => state.user);
  console.log('usertype<<<<<<<<', userType);
  const [latLng, setLatLng] = useState(null); // Use null for an empty initial state
  console.log(latLng);
  return (
    <View style={styles.container}>
      <MapView
      mapType='terrain'
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {latLng && (
          <Marker
            key={latLng.latitude + latLng.longitude}
            coordinate={{
              latitude: latLng.latitude,
              longitude: latLng.longitude,
            }}
          />
        )}
      </MapView>

      <View
        style={{
          position: 'absolute',
          top: 20,
          width: '90%',
          alignSelf: 'center',
        }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            if (details) {
              const chosenRegion = {
                longitude: details.geometry.location.lng,
                latitude: details.geometry.location.lat,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              };
              setLatLng({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                location: data.description,
              }); // Update the latLng state
              mapRef.current.animateToRegion(chosenRegion, 1000);
            } else {
              console.warn('No details available for the selected place.');
            }
          }}
          query={{
            key: 'AIzaSyA8roKrUBUJzWBySsm9v5ig05B_wJNY2hE',
            language: 'en',
          }}
          fetchDetails
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Button
        padding={responsiveHeight(1.9)}
          styleName={'plainButton'}
          handleOnPress={() =>
            navigation.navigate(
              type === 'editProfile' ? 'EditProfile' : 'Cart',
              {latLng: latLng},
            )
          }
          marginBottom={20}
          title={'Submit'}
          color={Color.themeColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ChooseLocation;
