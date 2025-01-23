import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import Button from '../../Components/Button';
import { Color } from '../../assets/Utils';
import { responsiveHeight } from '../../assets/Responsive_Dimensions';

const Map = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Button
          height={responsiveHeight(7)}
          styleName={'plainButton'}
          handleOnPress={() => navigation.navigate('BottomTabs')}
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

export default Map;
