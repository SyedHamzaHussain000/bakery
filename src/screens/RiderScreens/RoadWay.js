import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {Color} from '../../assets/Utils';
import MapView, {Marker} from 'react-native-maps';
import {styles} from '../../Styles';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const RoadWay = ({navigation}) => {
  const mapRef = useRef(null);
  const [latLng, setLatLng] = useState(null);
  return (
    <View style={{flex: 1, backgroundColor: Color.white}}>
      <PlainHeader
        notification={true}
        bgColor={'#FB8456'}
        fntWeight={'600'}
        color={Color.white}
        handlePress={() => navigation.goBack()}
        text={'Road way'}
      />

      <View
        style={{
          height: responsiveHeight(30),
          width: responsiveWidth(90),
          borderRadius: 10,
          overflow: 'hidden',
          alignSelf: 'center',
          marginTop: responsiveHeight(8),
        }}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

  

      <View style={{width: responsiveWidth(90), alignSelf: 'center',backgroundColor:'red'}}>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{alignItems: 'center', gap: 10}}>
            <Ionicons
              name="location-outline"
              color={'#fb8456'}
              size={responsiveHeight(5)}
            />
            <View style={{gap: 8}}>
              <View style={currentStyles.distance}></View>
              <View style={currentStyles.distance}></View>
              <View style={currentStyles.distance}></View>
            </View>
            <Ionicons
              name="location-outline"
              color={'#fb8456'}
              size={responsiveHeight(5)}
            />
          </View>

          <View style={{flex: 1}}>
            {/* <Input
              flexGrow={1}
              brdrWidth={0.1}
              brbtmRightRds={30}
              elevation={0.01}
              bgColor={'#F3EDED'}
              width={'100%'}
              placeholder={'your pickup location'}
              placeHolderColor={'#686666'}
            /> */}
             <GooglePlacesAutocomplete
      placeholder='your pickup location'
      //  keyboardShouldPersistTaps="handled" // Keeps list clickable after keyboard dismissal
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      
      styles={{
        textInput: {
          backgroundColor: '#F3EDED',
          borderRadius: 30,
          paddingHorizontal:20,
          // paddingVertical:20,
          height:responsiveHeight(5.9)
        },
        
        listView: {
          backgroundColor: '#FFF', // Background color of suggestion box
          borderRadius: 10, // Rounded corners
          marginHorizontal: 10, // Optional: Add some spacing from the screen edges
          elevation: 5, // For shadow on Android
          shadowColor: '#000', // For shadow on iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          zIndex:20
        },
        container:{
          height:responsiveHeight(18.5),
          zIndex:20
        }
      }}
      query={{
        key: 'AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8',
        language: 'en',
      }}
    />
            <View style={{}}>
            <GooglePlacesAutocomplete
      placeholder='your pickup location'
      //  keyboardShouldPersistTaps="handled" // Keeps list clickable after keyboard dismissal
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      
      styles={{
        textInput: {
          backgroundColor: '#F3EDED',
          borderRadius: 30,
          paddingHorizontal:20,
          // paddingVertical:20,
          height:responsiveHeight(5.9)
        },
        
        listView: {
          backgroundColor: '#FFF', // Background color of suggestion box
          borderRadius: 10, // Rounded corners
          marginHorizontal: 10, // Optional: Add some spacing from the screen edges
          elevation: 5, // For shadow on Android
          shadowColor: '#000', // For shadow on iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          zIndex:20

        },
        container:{
          maxHeight:responsiveHeight(20.5)
        }
      }}
      query={{
        key: 'AIzaSyCxPKJMEW5ko5BoDLW5F3K4bzs-faQaHU8',
        language: 'en',
      }}
    />
            </View>
          </View>
        </View>
      </View>
     
      {/* <Button txtColor={'#6b4132'} borderRadius={50}  height={responsiveHeight(5)} title={'fb8456'} color={'#FB8456'}  width={responsiveWidth(50)}/> */}

      <TouchableOpacity style={{width:responsiveWidth(42),height:responsiveHeight(6),borderRadius:30,backgroundColor:'#FB8456',justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:responsiveHeight(5)}}>
        <Text style={{color:'#6B4132',fontSize:18,fontWeight:'bold'}}>add route</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoadWay;

const currentStyles = StyleSheet.create({
  distance: {
    height: responsiveHeight(2.6),
    width: responsiveWidth(1),
    backgroundColor: '#bebebe',
  },
});
