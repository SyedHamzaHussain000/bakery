import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight } from '../assets/Responsive_Dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../Styles';
import { Color } from '../assets/Utils';

const Availability = ({ onDayChange, onAvailabilityChange,currentDay,currentAvailability }) => {
  
  console.log('cuuuurrrrennt availabilty',currentAvailability)
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusAvailability, setIsFocusAvailability] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [availabilityValue, setAvailabilityValue] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(currentAvailability);
  const availabilityData = [
    {
      label: 'Once A Week',
      value: '1',
    },
    {
      label: 'Once A Month',
      value: '2',
    },
    {
      label: 'Daily',
      value: '3',
    },
  ];
  const daysData = [
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
    {label: 'Sunday', value: '7'},
  ];
  // console.log('selected availabilty',selectedAvailability)
  // console.log('selectedDay',selectedDay)
  return (
    <View
    style={{
    }}>
          <Text style={[styles.heading,{marginBottom:responsiveHeight(2)}]}>Change Availability?</Text>

    <Dropdown
      style={[
        styles.dropdown,
        isFocusAvailability && {borderColor: 'gray'},
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={availabilityData}
      search
      maxHeight={'90%'}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? currentAvailability : '...'}
      searchPlaceholder="Search..."
      value={availabilityValue}
      onFocus={() => setIsFocusAvailability(true)}
      onBlur={() => setIsFocusAvailability(false)}
      onChange={item => {
        console.log(item);
        setAvailabilityValue(item.value);
        setSelectedAvailability(item.label);
        setIsFocusAvailability(false);
        onAvailabilityChange?.(item.label);
      }}
    />
    {(selectedAvailability === 'Once A Week' || selectedAvailability === 'Once A Month') && (
        <View
          style={{
            gap: responsiveHeight(2),
          }}>
          <Text style={styles.heading}>Change Day?</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={daysData}
            search
            maxHeight={'90%'}
            labelField="label"
            valueField="value"
            placeholder={currentDay ? currentDay : 'Monday'}
            searchPlaceholder="Search..."
            value={dayValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              console.log(item);
              setDayValue(item.value);
              setSelectedDay(item.label);
              setIsFocus(false);
              onDayChange?.(item.label);
            }}
          />
        </View>
      )}
  </View>
  )
}

export default Availability

