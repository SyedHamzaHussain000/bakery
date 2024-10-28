import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {Images} from '../../assets';
import {Color} from '../../assets/Utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgIcons from '../../Components/SvgIcons';
import {category1, cookies, cupcake, donut, pastry} from '../../assets/icons';
import SeeAll from '../../Components/SeeAll';
import FoodCategory from '../../Components/FoodCategory';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {getAllProducts} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
import {useIsFocused} from '@react-navigation/native';
import {styles} from '../../Styles';
const Bakeries = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const token = useSelector(state => state.user.token);
  // console.log(activeCategory);
  const [data, setData] = useState([]);
  const myDataMemo = useMemo(() => data, [data]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log('myDataMemo', myDataMemo);
  const focus = useIsFocused();
  const categoriesData = [
    {
      id: 1,
      text: 'All',
      icon: category1,
    },
    {
      id: 2,
      text: 'Pastry',
      icon: pastry,
    },
    {
      id: 3,
      text: 'Cupcake',
      icon: cupcake,
    },
    {
      id: 4,
      text: 'Donuts',
      icon: donut,
    },
    {
      id: 5,
      text: 'Biscuits',
      icon: cookies,
    },
  ];
  const getAllProductHandler = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProducts(token);
      setIsLoading(false);

      setData(response.data);
    } catch (error) {
      setIsLoading(false);

      console.log('error', error);
    }
  };
  useEffect(() => {
    focus && getAllProductHandler();
  }, [focus]);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', {id: item._id})}
        style={{
          backgroundColor: Color.white,
          flexBasis: '48%',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          elevation: 2,
          marginBottom: 20,
        }}>
        <Image
          source={{uri: `${baseUrl}bakery/${item.productImage}`}}
          style={{width: '100%', height: 120}}
        />
        <View style={{padding: 10}}>
          <View>
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontWeight: 'semibold',
              }}>
              {item.productName}
            </Text>
          </View>
          <Text style={{color: '#B8B8B8', fontSize: 10, marginTop: 10}}>
            Flavor - {item.flavor ? item.flavor : 'Creamy'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: Color.themeColor,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              ${item.discountPrice}
            </Text>
            <View>
              <Text style={{color: Color.themeColor, fontSize: 10}}>
                View Details
              </Text>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: Color.themeColor,
                }}></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // console.log('all data', data);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
        backgroundColor: Color.white,
        flexGrow: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{flexDirection: 'row', width: '65%', alignItems: 'center'}}>
          <Image style={{height: 100, width: 100}} source={Images.goldBakery} />
          <View style={{flex: 1}}>
            <Text
              style={{
                color: Color.black,
                fontSize: 20,
                fontWeight: '500',
              }}>
              Gold Bakery
            </Text>
            <Text style={{fontSize: 12, color: '#676767'}}>
              47 W 13th St, New York, NY 10011, USA
            </Text>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('AddProduct')}
          style={{
            backgroundColor: Color.themeColor,
            height: 50,
            width: 110,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Text style={{color: Color.white, fontSize: 16, fontWeight: '500'}}>
            Add Item
          </Text>
          <AntDesign size={18} name="plus" color={Color.white} />
        </TouchableOpacity> */}

        <Button
          handleOnPress={() => navigation.navigate('AddProduct')}
          VectorIcon={AntDesign}
          fontSize={16}
          iconSize={18}
          fontWeight={'500'}
          styleName={'viewDetails'}
          iconName={'plus'}
          width={'auto'}
          color={Color.themeColor}
          title={'Add Item'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={{width: '80%'}}>
          <TextInput
            placeholderTextColor={'#D6D6D6'}
            placeholder={'Search Here...'}
            style={[
              styles.shadow,
              {
                paddingVertical: 15,
                paddingHorizontal: 20,
                backgroundColor: Color.white,
                borderWidth: 1,
                borderColor: Color.white,
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
                borderBottomRightRadius: 14,
                borderBottomLeftRadius: 0,
                color: Color.black,
                fontSize: 14,
              },
            ]}
          />
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Color.themeColor,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 25,
            }}>
            <Ionicons name="search" color={Color.white} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <SeeAll firstText={'Discover by'} secondText={'Category'} />
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: hp(-3)}}
          contentContainerStyle={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 20,
            paddingHorizontal: hp(3),
          }}>
          {categoriesData.map((area, index) => {
            return (
              <View key={index}>
                <FoodCategory
                  active={activeCategory}
                  handlePress={() => setActiveCategory(area.text)}
                  title={area.text}
                  category={area.icon}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <SeeAll firstText={'My'} secondText={'Products'} />
      <View style={{marginTop: 20,flex:1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent:'center', }}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={
              {
                // paddingHorizontal: 10,
                // paddingBottom: 20,
              }
            }
            columnWrapperStyle={{
              justifyContent: 'space-between',
              // marginTop: 20,
            }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={myDataMemo}
            renderItem={renderItem}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Bakeries;
