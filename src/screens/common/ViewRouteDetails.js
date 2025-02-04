import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Apikey} from '../../assets/ApiKey';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Button';
import {Color} from '../../assets/Utils';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../assets/Responsive_Dimensions';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import {deleteRouteById, getNearbyBakeries, updateRoute} from '../../GlobalFunctionns';
import {
  setCheckPointId,
  setEndRoute,
  setNextCheckpoint,
  setReachedDestination,
  setStartRide,
  setStartRoute,
} from '../../redux/Slices';

const ViewRouteDetails = ({navigation, route}) => {
  const {area} = route.params;
  const {userType, userData} = useSelector(state => state.user);
  const [deleteLoading, setDeleteLoading] = useState(false);

  console.log('routeid',area);
  const [checkPointLoading, setCheckpointLoading] = useState(false);
  const [nearbyBakeries,setNearbyBakeries] = useState();
  const getNearbyBakeriesHandler = async () => {
    try{
   const response = await getNearbyBakeries(area._id,userData.token);
   setNearbyBakeries(response.data);
   console.log('response nearby bakeries====',response.data);
    }catch(error){
      console.log('error',error);
    };
  };
  const dispatch = useDispatch();
  const {
    startRoute,
    endRoute,
    checkpointId,
    startRide,
    nextCheckpoint,
    reachedDestination,
  } = useSelector(state => state.user);
  useEffect(() => {
    if (startRide) {
      dispatch(
        setStartRoute({
          latitude: parseFloat(area?.startLocation?.coordinates[1]),
          longitude: parseFloat(area?.startLocation?.coordinates[0]),
        }),
      );
      dispatch(
        setEndRoute({
          latitude: parseFloat(area?.endLocation?.coordinates[1]),
          longitude: parseFloat(area?.endLocation?.coordinates[0]),
        }),
      );
    }
    getNearbyBakeriesHandler();
  }, []);
  const deleteRouteHandler = async id => {
    setDeleteLoading(true);
    try {
      const response = await deleteRouteById(userData.token, area._id);
      setDeleteLoading(false);
      console.log('response', response);
      if (response.sucess) {
        navigation.goBack();
        return ShowToast('success', 'Route Deleted Successfully');
      } else {
        return ShowToast('error', response?.msg);
      }
    } catch (error) {
      setDeleteLoading(false);

      console.log('error', error);
    }
  };

  const startRideHandler = async () => {
    setCheckpointLoading(true);
    try {
      const response = await updateRoute(
        area._id,
        checkpointId,
        userData.token,
      );
      setCheckpointLoading(false);

      console.log('response========', response.data);
      console.log('response=====', response?.data?.nextLocation);

      if (response?.data?.currentLocation == null) {
        dispatch(
          setStartRoute({
            latitude: parseFloat(response?.data?.startLocation?.coordinates[1]),
            longitude: parseFloat(
              response?.data?.startLocation?.coordinates[0],
            ),
          }),
        );
        dispatch(setStartRide(false));
        dispatch(setNextCheckpoint(true));
        dispatch(
          setEndRoute({
            latitude: parseFloat(response?.data?.nextLocation?.coordinates[1]),
            longitude: parseFloat(response?.data?.nextLocation?.coordinates[0]),
          }),
        );
        dispatch(setCheckPointId(response.data?.nextLocation?._id));
      } else {
        dispatch(
          setStartRoute({
            latitude: parseFloat(
              response?.data?.currentLocation?.coordinates[1],
            ),
            longitude: parseFloat(
              response?.data?.currentLocation?.coordinates[0],
            ),
          }),
        );
        if (response?.data?.nextLocation == null) {
          dispatch(
            setEndRoute({
              latitude: parseFloat(response?.data?.endLocation?.coordinates[1]),
              longitude: parseFloat(
                response?.data?.endLocation?.coordinates[0],
              ),
            }),
          );
          dispatch(setReachedDestination(true));
          dispatch(setCheckPointId(null));
        } else {
          dispatch(setStartRide(false));
          dispatch(setNextCheckpoint(true));
          dispatch(setCheckPointId(response.data?.nextLocation?._id));
          dispatch(
            setEndRoute({
              latitude: parseFloat(
                response?.data?.nextLocation?.coordinates[1],
              ),
              longitude: parseFloat(
                response?.data?.nextLocation?.coordinates[0],
              ),
            }),
          );
        }
      }
    } catch (error) {
      setCheckpointLoading(false);

      console.log('error', error);
    }

    //   console.log('response=========>>>>>>>>>>', response);
    // } catch (error) {
    //   console.log('error', error);
    // }
  };
  const endRideHandler = () => {
    dispatch(setStartRide(true));
    dispatch(setCheckPointId(null));
    dispatch(setReachedDestination(false));
    dispatch(setNextCheckpoint(false));
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        mapType="terrain"
        scrollEnabled
        style={{flex: 1, height: 200, width: '100%'}}
        initialRegion={{
          ...startRoute,
          latitudeDelta: 0.0952,
          longitudeDelta: 0.0451,
        }}>
        <MapViewDirections
          origin={startRoute}
          destination={endRoute}
          strokeColor="red"
          strokeWidth={4}
          apikey={Apikey}
        />
        <Marker
          title={area?.startLocationName}
          coordinate={{
            latitude: area?.startLocation?.coordinates[1],
            longitude: area?.startLocation?.coordinates[0],
          }}
        />
        <Marker
          title={area?.endLocationName}
          coordinate={{
            latitude: area?.endLocation?.coordinates[1],
            longitude: area?.endLocation?.coordinates[0],
          }}
        />
        {area?.checkPoints?.map((checkpoint, index) => (
          <Marker
            title={`Checkpoint ${index + 1}: ${checkpoint?.locationName}`}
            pinColor="green"
            coordinate={{
              latitude: checkpoint.coordinates[1],
              longitude: checkpoint.coordinates[0],
            }}
          />
        ))}
        {nearbyBakeries?.map((bakeries, index) => (
          <Marker
            title={`Checkpoint ${index + 1}: ${bakeries?.bakeryName}`}
            pinColor="blue"
            coordinate={{
              latitude: bakeries?.Location.coordinates[1],
              longitude: bakeries?.Location.coordinates[0],
            }}
          />
        ))}
      </MapView>
      {userType === 'Rider' && (
        <View
          style={{
            position: 'absolute',
            bottom: responsiveHeight(2),
            alignSelf: 'center',
            gap: responsiveHeight(2),
          }}>
          <View style={{alignSelf: 'center'}}>
            <Button
              handleOnPress={
                reachedDestination ? endRideHandler : startRideHandler
              }
              color={Color.themeColor}
              width={responsiveWidth(90)}
              padding={responsiveHeight(1.8)}
              styleName={'plainButton'}
              title={
                checkPointLoading ? (
                  <ActivityIndicator size={'large'} color={Color.white} />
                ) : startRide ? (
                  'Start Ride'
                ) : nextCheckpoint ? (
                  'Next Checkpoint'
                ) : (
                  'Reached Destination'
                )
              }
            />
          </View>
          <View style={{alignSelf: 'center'}}>
            <Button
              handleOnPress={() => deleteRouteHandler()}
              color={Color.themeColor}
              width={responsiveWidth(90)}
              padding={responsiveHeight(1.8)}
              styleName={'plainButton'}
              title={
                deleteLoading ? (
                  <ActivityIndicator size={'large'} color={Color.white} />
                ) : (
                  'Delete Route'
                )
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ViewRouteDetails;
