import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color} from '../assets/Utils';
import {styles} from '../Styles';
import {
  responsiveFontSize,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
const Button = ({
  title,
  color,
  marginBottom,
  handleOnPress,
  width,
  fontSize,
  fontWeight,
  txtColor,
  VectorIcon,
  iconName,
  iconSize,
  marginTop,
  styleName,
  height,
  disable,
}) => {
  return (
    <TouchableOpacity
    // disabled={!disable}
      onPress={handleOnPress}
      style={[
        styles[styleName],
        {
          backgroundColor: disable === false ? 'lightgray' : color,
          flexDirection: iconName ? 'row' : null,
          height:height ? height : null,
          gap: iconName ? 10 : null,
          marginBottom: marginBottom,
          width: width ? width : responsiveWidth(90),
          marginTop: marginTop,
          alignItems: 'center',
        },
      ]}>
      <Text
        style={{
          color: txtColor ? txtColor : Color.white,
          fontSize: fontSize ? fontSize : responsiveFontSize(2.2),
          fontWeight: fontWeight ? fontWeight : '600',
        }}>
        {title}
      </Text>
      {iconName ? (
        <VectorIcon size={iconSize} color={Color.white} name={iconName} />
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
