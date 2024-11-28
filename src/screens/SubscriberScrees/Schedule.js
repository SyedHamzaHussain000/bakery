import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Color} from '../../assets/Utils';
import SvgIcons from '../../Components/SvgIcons';
import {category1, category3, logo} from '../../assets/icons';
import Hr from '../../Components/Hr';
import Header from '../../Components/Header';
import DiscoverCategory from '../../Components/DiscoverCategory';
import {getSubscriberProducts} from '../../GlobalFunctionns';
import {useSelector} from 'react-redux';
import Products from '../../Components/Products';

const Schedule = ({navigation}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const {token, addToCartProducts} = useSelector(state => state.user);
  const [products, setProducts] = useState();
  const myDataMemo = useMemo(() => products, [products]);

  console.log('addToCartProducts===>>>', addToCartProducts);
  const [activeCategory, setActiveCategory] = useState('bread');
  const [isLoading, setIsLoading] = useState(false);
  const categoryData = [
    {
      id: 1,
      name: 'bread',
      icon: category1,
    },
    {
      id: 2,
      name: 'bread2',
      icon: category1,
    },
    {
      id: 3,
      name: 'cheese',
      icon: category3,
    },
    {
      id: 4,
      name: 'cheese2',
      icon: category3,
    },
  ];
  const getProductsHandler = async () => {
    setIsLoading(true);
    const response = await getSubscriberProducts(token);
    setIsLoading(false);
    setProducts(response.data);
  };

  useEffect(() => {
    getProductsHandler();
  }, []);

  console.log('products', addToCartProducts.length);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: Color.white,
      }}>
      <View style={{padding: 40, alignItems: 'center'}}>
        <SvgIcons height={'113'} width={'140'} xml={logo} />
      </View>
      <Header
        handleNavigate={() => navigation.navigate('UserProfile')}
        products={addToCartProducts.length > 0 ? true : false}
        handlePress={() => navigation.navigate('Cart')}
      />
      <View style={{marginTop: 20}}>
        <Hr />
      </View>
      <View style={{padding: 20, flex: 1}}>
        <Text style={{fontSize: 22, color: Color.black}}>
          Discover by{' '}
          <Text style={{fontSize: 22, color: Color.black, fontWeight: 'bold'}}>
            Category.
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {categoryData.map((area, index) => {
            return (
              <View>
                <DiscoverCategory
                  title={area.name}
                  activeTab={activeCategory}
                  handleOnPress={() => setActiveCategory(area.name)}
                  icon={area.icon}
                />
              </View>
            );
          })}
        </View>

        <Text style={{fontSize: 22, color: Color.black, marginTop: 20}}>
          Set Up{' '}
          <Text style={{fontSize: 22, color: Color.black, fontWeight: 'bold'}}>
            Your Delivery.
          </Text>
        </Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={Color.black} />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{justifyContent: 'space-between', gap: 10}}
              contentContainerStyle={{
                marginTop: 30,
              }}
              style={{
                flexGrow: 1,
              }}
              numColumns={2}
              data={myDataMemo?.reverse()}
              renderItem={(area, index) => {
                console.log('area.item', area.item);
                return (
                  <Products
                    screen={'ProductDetails'}
                    routesData={area.item._id}
                    navigation={navigation}
                    data={area}
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Schedule;
