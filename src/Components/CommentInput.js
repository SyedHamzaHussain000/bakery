import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../Styles';
const CommentInput = ({
  handleButtonPress,
  commentText,
  setCommentText,
}) => {
  return (
    <View style={{margin: 15, marginTop: 0}}>
      <TextInput
        onChangeText={text => setCommentText(text)}
        placeholder="Add a comment..."
        value={commentText}
        style={styles.commentTxtInput}
      />
      <TouchableOpacity
        onPress={handleButtonPress}
        style={styles.addCommentBtn}>
        <Ionicons
          name="send"
          color={commentText.length ? '#005FDA' : '#BDC3CA'}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;
