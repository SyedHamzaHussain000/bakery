import {
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SvgIcons from '../../Components/SvgIcons';
import {Notification} from '../../assets/icons';
import {Color} from '../../assets/Utils';
import {Images} from '../../assets';
import PostHeader from '../../Components/PostHeader';
import Post from '../../Components/Post';
import {useSelector} from 'react-redux';
import {getAllPostHandler} from '../../GlobalFunctionns';
import {responsiveFontSize} from '../../assets/Responsive_Dimensions';
const NeighbourHood = ({navigation}) => {
  const token = useSelector(state => state.user.token);
  const [isLoading, setIsLoading] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  const [postResponse,setPostResponse] = useState(null)
  const [updateLike,setUpdateLike] = useState()
  console.log('edit subscriber');
  const getPosts = async () => {
    setIsLoading(true);
    // setPostDetails([])
    const response = await getAllPostHandler(token);
    setIsLoading(false);
    setPostDetails(response.data);
    console.log('res.data=============>>>>>.', response.data);
  };
  useEffect(() => {
    getPosts();
  }, [postResponse,updateLike]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{backgroundColor: Color.white, flexGrow: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={{padding: 20, alignSelf: 'flex-end'}}>
        <SvgIcons
          color={Color.black}
          height={'30'}
          width={'30'}
          xml={Notification}
        />
      </TouchableOpacity>

      <PostHeader
      prevResponse={(data)=>setPostResponse(data.status)}
        handleProfilePress={() => navigation.navigate('UserProfile')}
      />
      {isLoading && (
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={Color.black} />
        </View>
      )}
      {!postDetails.length && !isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: responsiveFontSize(3.8),
              color: '#A9A9A9',
              fontWeight: '600',
            }}>
            No Post Found
          </Text>
        </View>
      ) : null}
      <FlatList
        contentContainerStyle={{paddingBottom: 20, gap: 25, marginTop: 10}}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return <Post setUpdateLike={setUpdateLike} data={item} />;
        }}
        data={postDetails}
      />
    </ScrollView>
  );
};

export default NeighbourHood;
