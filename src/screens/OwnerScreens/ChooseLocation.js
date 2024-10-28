import {View, Text, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Button from '../../Components/Button';
import {Color} from '../../assets/Utils';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ChooseLocation = ({navigation}) => {
  const mapRef = useRef(null);
  const [latLng, setLatLng] = useState(null); // Use null for an empty initial state
  console.log(latLng);
  return (
    <View style={styles.container}>
      <MapView
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
            key={latLng.lat + latLng.lng}
            coordinate={{
              latitude: latLng.lat,
              longitude: latLng.lng,
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
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng,
                location:data.description
                
              }); // Update the latLng state
              mapRef.current.animateToRegion(chosenRegion, 1000);
            } else {
              console.warn('No details available for the selected place.');
            }
          }}
          query={{
            key: 'AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8',
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
          styleName={'plainButton'}
          handleOnPress={() =>
            navigation.navigate('EditProfile', {latLng: latLng})
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
