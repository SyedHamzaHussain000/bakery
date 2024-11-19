import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import PlainHeader from '../../Components/PlainHeader';
import {baseUrl} from '../../baseUrl';
import {responsiveHeight} from '../../assets/Responsive_Dimensions';
import {Color} from '../../assets/Utils';
import SvgIcons from '../../Components/SvgIcons';
import {category1} from '../../assets/icons';
import {styles} from '../../Styles';
import {useSelector} from 'react-redux';
import TextWithLabel from '../../Components/TextWithLabel';

const OrderDetails = ({navigation, route}) => {
  const {area} = route.params;
  const {userType} = useSelector(state => state.user);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, padding: 20}}>
      <PlainHeader
        iconSize={25}
        fntSize={22}
        fntWeight={600}
        handlePress={() => navigation.goBack()}
        text={'Product Details'}
      />
      <Image
        style={{
          alignSelf: 'center',
          marginTop: 30,
          height: 170,
          width: 300,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Color.themeColor,
        }}
        source={{uri: `${baseUrl}bakery/${area.productId.productImage}`}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <View>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: Color.black}}>
            {area.productId.productName}
          </Text>
          <Text style={styles.orderDetailsText}>
            Flavor - {area.productId.flavor ? area.productId.flavor : 'Creamy'}
          </Text>
        </View>
        <View
          style={{backgroundColor: '#EBEBEB', padding: 12, borderRadius: 30}}>
          <SvgIcons xml={category1} height={'33'} width={'33'} />
        </View>
      </View>

      <View>
        <TextWithLabel
          title={'Product Description'}
          text={area.productId.productDescp}
        />
        <TextWithLabel
          title={'Category'}
          text={area.productId.chooseCategory}
        />
        <TextWithLabel title={'Price'} text={`$${area.TotalPrice}`} />
        <TextWithLabel title={'Quantity'} text={area.quantity} />
        <TextWithLabel title={'Availability'} text={area.availabilty} />
        <TextWithLabel title={'Days'} text={area.days} />
        <TextWithLabel title={'Status'} text={area.status} />
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: Color.black,
            marginTop: responsiveHeight(2),
          }}>
          {userType === 'Subscriber' ? 'Owner' : 'User'} Details
        </Text>
        <TextWithLabel
          text={
            userType === 'Subscriber'
              ? area.BakeryId.userName
              : area.subscriberId.userName
          }
          title={'Name'}
        />
        <TextWithLabel
          text={
            userType === 'Subscriber'
              ? area.BakeryId.email
              : area.subscriberId.email
          }
          title={'Email'}
        />
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
