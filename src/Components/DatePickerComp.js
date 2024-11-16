import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../assets/Utils';
import {
  responsiveHeight,
  responsiveWidth,
} from '../assets/Responsive_Dimensions';
import DatePicker from 'react-native-date-picker';
import Input from './Input';

const DatePickerComp = ({
  mode,
  title,
  onDateChange,
  selectedResult,
  placeHolder,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Text style={localStyles.heading}>{title}</Text>
      <TouchableOpacity
        style={localStyles.viewStyle}
        onPress={() => setOpen(true)}>
        <Text>{selectedResult ? selectedResult : placeHolder}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode={mode}
        open={open}
        date={date}
        onConfirm={selectedDate => {
          console.log('Selected date:', selectedDate);
          setOpen(false);
          setDate(selectedDate);

          // Call the callback to pass the date to the parent component
          if (onDateChange) {
            onDateChange(selectedDate);
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerComp;

const localStyles = StyleSheet.create({
  heading: {
    color: Color.black,
    fontSize: 18,
    fontWeight: 'medium',
    marginTop: 10,
  },

  viewStyle: {
    zIndex: 10,
    marginTop: responsiveHeight(1),
    height: responsiveHeight(6),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor:Color.white,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: responsiveWidth(90),
    borderTopLeftRadius: 30,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: responsiveHeight(2),
    justifyContent: 'center',
  },
});
