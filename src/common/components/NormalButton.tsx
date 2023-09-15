import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {colors} from '../../styles/colors';
import {NormalButtonProps} from './button-type';

const NormalButton = (props: NormalButtonProps) => {
  const {name, height = 55, width = 65, theme = false, handlePress} = props;
  const color = theme ? colors.blue : colors.whiteBg;
  const textColor = theme ? colors.white : colors.textBlue;
  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.firstRowButton,
            {
              width,
              height,
              backgroundColor: color,
              borderColor: color,
            },
          ]}>
          <Text style={[styles.buttonTextStyle, {color: textColor}]}>
            {name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default NormalButton;

const styles = StyleSheet.create({
  firstRowButton: {
    padding: 6,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    borderWidth: 2,
    margin: 10,
  },
  buttonTextStyle: {
    color: colors.textBlue,
    fontWeight: '600',
    fontSize: 20,
  },
});
