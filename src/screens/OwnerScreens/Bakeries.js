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
import {category1, cookies, cupcake, donut, pastry} from '../../assets/icons';
import SeeAll from '../../Components/SeeAll';
import FoodCategory from '../../Components/FoodCategory';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useSelector} from 'react-redux';
import {baseUrl} from '../../baseUrl';
import {useIsFocused} from '@react-navigation/native';
import {styles} from '../../Styles';
import axios from 'axios';
import {
  getAllProducts,
  getProductsByCategoryHandler,
  searchProductsHandler,
} from '../../GlobalFunctionns';
import {ShowToast} from '../../GlobalFunctionns/ShowToast';
import { responsiveHeight } from '../../assets/Responsive_Dimensions';
const Bakeries = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const {token,userData} = useSelector(state => state.user);
  const [searchedValue, setSearchedValue] = useState();
  console.log('userData', userData.id);
  // console.log(activeCategory);
  const [data, setData] = useState([]);
  const myDataMemo = useMemo(() => data, [data]);
  // console.log('myDataMemo',myDataMemo)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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
  // const getAllProductHandler = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getAllProducts(token);
  //     setIsLoading(false);
  //     setData(response.data);
  //   } catch (error) {
  //     setIsLoading(false);

  //     console.log('error', error);
  //   }
  // };

  const getProductByCategory = async () => {
    console.log('active', activeCategory);
    setIsLoading(true);
    try {
      const res = await getProductsByCategoryHandler(activeCategory, token, userData._id);
      console.log('res.getproducts', res.getProductbyCatagories);
      setData(res.getProductbyCatagories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const searchProduct = async () => {
    setActiveCategory(null);
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await searchProductsHandler(searchedValue, token,userData._id);
      setData(res.products);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setErrorMessage(
        'Sorry, we couldn’t locate any products matching your search.',
      );
      ShowToast('error', error.response.data.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (activeCategory) {
      getProductByCategory();
    }
  }, [activeCategory, focus]);

  // useEffect(() => {
  //   focus && getAllProductHandler();
  // }, [focus]);
  const renderItem = ({item}) => {
    // console.log('item.productImage', item.productImage);
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
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Image
              style={{height: 90, width: 90,borderRadius:responsiveHeight(1),marginRight:responsiveHeight(1)}}
              source={userData?.profilePic ? {uri: `${baseUrl}user/${userData.profilePic}`} : Images.user} 

              // source={Images.goldBakery}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: Color.black,
                fontSize: 20,
                fontWeight: '500',
              }}>
              {userData.bakeryName}
            </Text>
            <Text style={{fontSize: 12, color: '#676767'}}>
             {userData.city}
            </Text>
          </View>
        </View>

        <Button
          handleOnPress={() => navigation.navigate('AddProduct')}
          VectorIcon={AntDesign}
          fontSize={16}
          iconSize={18}
          fontWeight={'500'}
          styleName={'viewDetails'}
          iconName={'plus'}
          width={'auto'}
          disable={true}
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
            onChangeText={changedText => setSearchedValue(changedText)}
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
            onPress={() => searchProduct()}
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
          {categoriesData?.map((area, index) => {
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
      <View style={{marginTop: 20, flex: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Color.black} />
          </View>
        ) : myDataMemo.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: Color.black, fontWeight: '500'}}>
              {errorMessage ? errorMessage : 'No products found'}
            </Text>
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
            // inverted
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
