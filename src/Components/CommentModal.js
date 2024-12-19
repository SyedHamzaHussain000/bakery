import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Color} from '../assets/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {Images} from '../assets';
import moment from 'moment';
import {addCommentHandler} from '../GlobalFunctionns';
import {styles} from '../Styles';
import CommentInput from './CommentInput';

const CommentModal = ({showCommentBox, setShowCommentBox, postId, data}) => {
  const [commentText, setCommentText] = useState('');
  const token = useSelector(state => state.user.token);
  const [commentData, setCommentData] = useState([]);
  console.log('commenttext', commentText);
  useEffect(() => {
    setCommentData(data.item.PostComment);
  }, []);
  const addComment = async id => {
    const response = await addCommentHandler(id, commentText, token);
    setCommentData(response.post.PostComment);
    setCommentText('');
  };
  return (
    <Modal
      onBackdropPress={() => setShowCommentBox(!showCommentBox)}
      isVisible={showCommentBox}
      style={styles.commentModal}>
      <View style={styles.commentModalContainer}>
        <TouchableOpacity
          style={styles.commentCrossBtn}
          onPress={() => setShowCommentBox(false)}>
          <Entypo name="circle-with-cross" color={Color.white} size={25} />
        </TouchableOpacity>
        <Text style={styles.commentHeading}>Comments</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.commentScrollStyle}>
          {commentData.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image style={styles.commentImage} source={Images.profileImage} />
              <View>
                <Text
                  style={{
                    color: Color.white,
                    fontSize: 18,
                    fontWeight: 'medium',
                  }}>
                  user01{'  '}
                  <Text style={{color: Color.white, fontSize: 12}}>
                    {moment(data.item.createdAt).fromNow()}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: Color.white,
                    fontWeight: 'medium',
                  }}>
                  {item.comment}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          handleButtonPress={() =>
            commentText
              ? addComment(postId)
              : console.log('plz enter some values')
          }
        />
      </View>
    </Modal>
  );
};

export default CommentModal;
