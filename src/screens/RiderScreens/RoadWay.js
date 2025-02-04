import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import PlainHeader from '../../Components/PlainHeader';
import {Color} from '../../assets/Utils';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import GetSearchedLocation from '../../Components/GetLocation';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import DatePickerComp from '../../Components/DatePickerComp';
import {setRoutes} from '../../GlobalFunctionns';
import {Apikey} from '../../assets/ApiKey';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {setEndRoute, setStartRoute} from '../../redux/Slices';
const RoadWay = ({navigation}) => {
  const mapRef = useRef(null); // Create a ref for the MapView
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [checkPoints, setCheckPoints] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [radius, setRadius] = useState();
  const dispatch = useDispatch();
  const {_id, token, userType} = useSelector(state => state.user.userData);
  const [isLoading, setIsLoading] = useState(false);
  console.log('pickuplocation', pickupLocation);
  console.log('dropofflocation', dropoffLocation);
  const addCheckpoint = () => {
    if (selectedLocation) {
      setCheckPoints(prev => [...prev, selectedLocation]);
      setSelectedLocation(null); // Clear input after adding
    }
  };
  const handlePickupLocationSelect = location => {
    setDropoffLocation(location);

    // Pan the map to the pickup location
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.04, // Zoom level
          longitudeDelta: 0.04, // Zoom level
        },
        500,
      ); // Animation duration in ms
    }
  };

  const setRouteHandler = async () => {
    setIsLoading(true);
    console.log('checkpoints', checkPoints);
    try {
      const response = await setRoutes(
        checkPoints,
        _id,
        selectedDate,
        pickupLocation.locationName,
        pickupLocation,
        dropoffLocation.locationName,
        dropoffLocation,
        radius,
        token,
      );
      setIsLoading(false);
      dispatch(
        setStartRoute({
          latitude: parseFloat(response?.data?.startLocation?.coordinates[1]),
          longitude: parseFloat(response?.data?.startLocation?.coordinates[0]),
        }),
      );
      dispatch(
        setEndRoute({
          latitude: parseFloat(response?.data?.endLocation?.coordinates[1]),
          longitude: parseFloat(response?.data?.endLocation?.coordinates[0]),
        }),
      );
      console.log('response.data.endlocation', response.data.endLocation);
      console.log('response.startlocation', response.data.startLocation);
      if (response.success) {
        return ShowToast('success', 'Routes Added Successfully');
      } else {
        return ShowToast('error', response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error', error.response.data.message);
    }
  };
  const handleDelete = index => {
    setCheckPoints(prevCheckPoints =>
      prevCheckPoints.filter((_, i) => i !== index),
    );
  };
  return (
    <View style={{flex: 1}}>
      <PlainHeader
        notification={true}
        bgColor={'#FB8456'}
        fntWeight={'600'}
        color={Color.white}
        handlePress={() => navigation.goBack()}
        text={'Road way'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Color.white,
          paddingBottom: responsiveHeight(2),
        }}>
        <View style={{padding: responsiveHeight(2)}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: responsiveHeight(1)}}>
              <Ionicons
                name="location-outline"
                color={'#fb8456'}
                size={responsiveHeight(5)}
              />
            </View>
            <GetSearchedLocation
              placeholder="Your Pickup Location"
              onLocationSelect={location => setPickupLocation(location)}
            />
          </View>
          <View
            style={{
              gap: 8,
              marginLeft: responsiveHeight(2.2),
              bottom: responsiveHeight(0.01),
            }}>
            <View style={styles.distance}></View>
            <View style={styles.distance}></View>
            <View style={styles.distance}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: responsiveHeight(1)}}>
              <Ionicons
                name="location-outline"
                color={'#fb8456'}
                size={responsiveHeight(5)}
              />
            </View>
            <GetSearchedLocation
              placeholder="Your Drop Off Location"
              onLocationSelect={handlePickupLocationSelect}
            />
          </View>
          <View style={{marginTop: responsiveHeight(2)}}>
            <GetSearchedLocation
              placeholder="Add Checkpoints"
              onLocationSelect={location => setSelectedLocation(location)}
            />

            <TouchableOpacity
              onPress={addCheckpoint}
              style={{
                height: responsiveHeight(4.5),
                width: responsiveWidth(16),
                top: responsiveHeight(1.2),
                alignSelf: 'center',
                borderRadius: responsiveHeight(2),
                zIndex: 20,
                position: 'absolute',
                right: 10,
                backgroundColor: Color.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Color.white,
                  fontWeight: '500',
                  fontSize: responsiveFontSize(2),
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
          {checkPoints?.map((area, index) => {
            return (
              <View
                style={{
                  marginTop: responsiveHeight(1),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    width: '85%',
                    fontSize: responsiveFontSize(2),
                  }}>
                  CheckPoint{index + 1}:{'  '}
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: responsiveFontSize(2),
                      alignSelf: 'center',
                    }}>
                    {area.locationName}
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <FontAwesome6 name="trash" size={25} color={Color.black} />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={{alignItems: 'center', marginTop: responsiveHeight(2)}}>
            <Input
              gap={2}
              bgColor={'#fff'}
              width={'100%'}
              keyboardType={'numeric'}
              handleInputChange={radius => setRadius(radius)}
              placeholder={'Select Your Radius In Meters'}
              placeHolderColor={'#bbb7b7'}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <DatePickerComp
              headingMrgn={0.1}
              height={responsiveHeight(6.3)}
              width={responsiveWidth(92)}
              mrgnTop={responsiveHeight(0.01)}
              bgColor={'#fff'}
              onDateChange={date => setSelectedDate(date)}
              txtColor={'#000'}
              placeHolder={
                selectedDate
                  ? moment(selectedDate).format('hh:mm A')
                  : 'Select Your Ride Start Time'
              }
              mode={'time'}
            />
          </View>
        </View>

        <View
          style={{
            height: responsiveHeight(30),
            width: responsiveWidth(90),
            borderRadius: 10,
            overflow: 'hidden',
            alignSelf: 'center',
            marginTop: responsiveHeight(1),
          }}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={{
              latitude: pickupLocation
                ? parseFloat(pickupLocation.latitude)
                : 37.78825,
              longitude: pickupLocation
                ? parseFloat(pickupLocation.longitude)
                : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {pickupLocation && dropoffLocation && (
              <MapViewDirections
                origin={{
                  latitude: parseFloat(pickupLocation.latitude),
                  longitude: parseFloat(pickupLocation.longitude),
                }}
                strokeColor="red"
                strokeWidth={4}
                destination={{
                  latitude: parseFloat(dropoffLocation.latitude),
                  longitude: parseFloat(dropoffLocation.longitude),
                }}
                apikey={Apikey}
              />
            )}

            {/* Corrected Markers */}
            {pickupLocation && dropoffLocation && (
              <>
                <Marker
                  pinColor="red"
                  coordinate={{
                    latitude: pickupLocation.latitude, // Ensure this exists
                    longitude: pickupLocation.longitude,
                  }}
                />
                <Marker
                  pinColor="red"
                  coordinate={{
                    latitude: dropoffLocation.latitude, // Ensure this exists
                    longitude: dropoffLocation.longitude,
                  }}
                />
              </>
            )}

            {/* Checkpoints Mapping */}
            {checkPoints?.map((area, index) => (
              <Marker
                key={index} // Always add a unique key when mapping over elements
                title={`Checkpoint ${index + 1}: ${area?.locationName}`}
                pinColor="green"
                coordinate={{
                  latitude: area.latitude,
                  longitude: area.longitude,
                }}
              />
            ))}
          </MapView>
        </View>
        <Button
          marginTop={responsiveHeight(3)}
          alignSelf={'center'}
          txtColor={Color.white}
          handleOnPress={() => setRouteHandler()}
          styleName={'plainButton'}
          title={
            isLoading ? (
              <ActivityIndicator size={25} color={Color.white} />
            ) : (
              'Add Route'
            )
          }
          padding={responsiveHeight(2)}
          color={'#FB8456'}
        />
      </ScrollView>
    </View>
  );
};

export default RoadWay;

const styles = StyleSheet.create({
  distance: {
    height: responsiveHeight(2.6),
    width: responsiveWidth(1),
    backgroundColor: '#bebebe',
  },
});

// import {View, Text, ScrollView, LogBox} from 'react-native';
// import React from 'react';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {Color} from '../../assets/Utils';
// import {Apikey} from '../../assets/ApiKey';

// const RoadWay = () => {
//   return (
//     <ScrollView
//       // nestedScrollEnabled={true}
//       // keyboardShouldPersistTaps="handled"
//       contentContainerStyle={{flexGrow: 1, backgroundColor: Color.black}}>
//       <GooglePlacesAutocomplete
//         placeholder="Search"
//         onPress={(data, details = null) => console.log(data, details)}
//         query={{
//           key: Apikey,
//           language: 'en',
//         }}
//       />
//     </ScrollView>
//   );
// };

// export default RoadWay;
