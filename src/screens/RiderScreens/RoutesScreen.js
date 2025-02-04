import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {Images} from '../../assets';
import {Color} from '../../assets/Utils';
import Categories from '../../Components/Categories';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Hr from '../../Components/Hr';
import {
  language,
  location,
  logout,
  order,
  subscription,
} from '../../assets/icons';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/Slices';
import MapView from 'react-native-maps';
import {deleteRouteById, getRouteById} from '../../GlobalFunctionns';
import {Apikey} from '../../assets/ApiKey';
import MapViewDirections from 'react-native-maps-directions';
import {useIsFocused} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import {baseUrl} from '../../baseUrl';

const RoutesScreen = ({navigation}) => {
  console.log('edit rider');
  const {userData} = useSelector(state => state.user);
  const split = userData.userName.split(' ');
  const [routesData, setRoutesData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const focus = useIsFocused();
  const [deleteLoading, setDeleteLoading] = useState(false);
  console.log('userdata.profilepic', userData.profilePic);
  const dispatch = useDispatch();
  const getRoutesByIdHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getRouteById(userData.token);
      setIsLoading(false);

      setRoutesData(response.data);
    } catch (error) {
      setIsLoading(false);

      console.log('error', error);
    }
  };

  useEffect(() => {
    getRoutesByIdHandler();
  }, [focus]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 20, flexGrow: 1}}>
      <PlainHeader
        handlePress={() => navigation.goBack()}
        text={'My Profile'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginLeft: 15,
          marginTop: 30,
        }}>
        <TouchableOpacity style={{height: 100, width: 100}}>
          <Image
          resizeMode='stretch'
            style={{
              height: responsiveHeight(12.5),
              width: responsiveWidth(22.5),
              borderRadius: responsiveHeight(0.8),
              marginRight: responsiveHeight(1),
              borderWidth:2,
              borderColor:Color.themeColor
            }}
            source={
              userData?.profilePic
                ? {uri: `${baseUrl}user/${userData.profilePic}`}
                : Images.user
            }
          />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20, color: Color.black, fontWeight: 'bold'}}>
            {split[0]} <Text style={{fontWeight: '300'}}> {split[1]}</Text>
          </Text>
          <Text style={{color: Color.black, fontSize: 13}}>
            {userData.email}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              backgroundColor: Color.themeColor,
              width: 95,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 4,
              marginTop: 15,
            }}>
            <Text style={{color: Color.white}}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <TouchableOpacity>
          <Categories xml={order} text={'Order History'} />
          <Hr marginVertical={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={language} text={'Language'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={location} text={'Location'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Categories xml={subscription} text={'Subscription'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(clearToken())}>
          <Categories vector={true} xml={logout} text={'Logout'} />
          <Hr marginVertical={12} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('RoadWay')}
        style={{
          backgroundColor: Color.themeColor,
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
          borderRadius: 10,
          height: 90,
          paddingVertical: 5,
        }}>
        <View style={{paddingHorizontal: 15}}>
          <Text style={style.textStyle}>Setup</Text>
          <Text style={style.textStyle}>Routes</Text>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
            right: 5,
          }}>
          <MapView
            scrollEnabled={false}
            style={{flex: 1}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </TouchableOpacity>
      {isLoading ? (
        <View style={{marginTop: responsiveHeight(2.5)}}>
          <ActivityIndicator size={'large'} color={Color.black} />
        </View>
      ) : routesData && routesData.length > 0 ? (
        routesData.map((area, index) => (
          <TouchableOpacity
            key={index} // Ensure a unique key
            onPress={() => navigation.navigate('ViewRouteDetails', {area})}
            style={{
              backgroundColor: Color.themeColor,
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
              borderRadius: 10,
              height: 90,
              paddingVertical: 5,
            }}>
            {/* Delete Button */}
            {/* <TouchableOpacity
              onPress={() => deleteRouteByIdHandler(area._id)}
              style={{
                position: 'absolute',
                right: responsiveHeight(1),
                top: responsiveHeight(1.5),
                zIndex: 10,
              }}>
              {deleteLoading ? (
                <ActivityIndicator size={'large'} color={Color.black} />
              ) : (
                <FontAwesome6 name={'trash'} color={Color.black} size={25} />
              )}
            </TouchableOpacity> */}

            {/* Route Info */}
            <View
              style={{
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={style.textStyle}>Routes</Text>
                <Text style={style.textStyle}>Maps</Text>
              </View>
            </View>

            {/* Map View */}
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                right: 5,
              }}>
              <MapView
                scrollEnabled={false}
                style={{flex: 1}}
                initialRegion={{
                  latitude: area.startLocation
                    ? parseFloat(area.startLocation.coordinates[1])
                    : 37.78825,
                  longitude: area.endLocation
                    ? parseFloat(area.endLocation.coordinates[0])
                    : -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {area?.startLocation && (
                  <MapViewDirections
                    origin={{
                      latitude: parseFloat(area.startLocation.coordinates[1]),
                      longitude: parseFloat(area.startLocation.coordinates[0]),
                    }}
                    strokeColor="red"
                    strokeWidth={4}
                    destination={{
                      latitude: parseFloat(area.endLocation.coordinates[1]),
                      longitude: parseFloat(area.endLocation.coordinates[0]),
                    }}
                    apikey={Apikey}
                  />
                )}
              </MapView>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: responsiveHeight(2.5),
            fontWeight: '500',
            fontSize: responsiveFontSize(2.5),
            color: Color.black,
          }}>
          No Routes Found
        </Text>
      )}
    </ScrollView>
  );
};

export default RoutesScreen;
const style = StyleSheet.create({
  textStyle: {
    color: Color.white,
    fontSize: 18,
    fontWeight: '500',
    // textAlign: 'center',
  },
});
