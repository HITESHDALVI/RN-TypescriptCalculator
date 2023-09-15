import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import NormalButton from '../../common/components/NormalButton';
import {colors} from '../../styles/colors';
import {Props, buttonType, operationType} from './calculatorScreen-type';
import {androidPlatform} from '../../utilis/constants';

const initialState = {
  firstNumber: '',
  secondNumber: '',
  operation: '',
  result: null,
};

const NormalButtonCompoenet = ({
  name,
  height,
  width,
  theme,
  handlePress,
}: buttonType) => (
  <NormalButton
    name={name}
    height={height}
    width={width}
    theme={theme}
    handlePress={handlePress}
  />
);
const Calculator = (props: Props) => {
  const {theme} = props;
  const [calculatorState, setCalculatorState] =
    useState<operationType>(initialState);
  const [result, setResult] = React.useState<Number | null>(null);
  const buttonsData = [
    ['Ac', () => clear()],
    [
      '⌫',
      () =>
        setCalculatorState({
          ...calculatorState,
          firstNumber: calculatorState.firstNumber.slice(0, -1),
        }),
    ],
    ['%', () => handleOperationPress('%')],
    ['/', () => handleOperationPress('/')],
    ['7', () => handleNumberPress('7')],
    ['8', () => handleNumberPress('8')],
    ['9', () => handleNumberPress('9')],
    ['x', () => handleOperationPress('*')],
    ['4', () => handleNumberPress('4')],
    ['5', () => handleNumberPress('5')],
    ['6', () => handleNumberPress('6')],
    ['+', () => handleOperationPress('+')],
    ['1', () => handleNumberPress('1')],
    ['2', () => handleNumberPress('2')],
    ['3', () => handleNumberPress('3')],
    ['-', () => handleOperationPress('-')],
    ['0', () => handleNumberPress('0')],
    ['.', () => handleNumberPress('.')],
    ['=', () => getResult()],
  ];
  const handleNumberPress = (buttonValue: string) => {
    if (calculatorState.firstNumber.length < 10) {
      setCalculatorState({
        ...calculatorState,
        firstNumber: calculatorState.firstNumber + buttonValue,
      });
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setCalculatorState({
      ...calculatorState,
      operation: buttonValue,
      firstNumber: '',
      secondNumber: calculatorState.firstNumber,
    });
  };

  const clear = () => {
    setCalculatorState(initialState);
    setResult(null);
  };

  const getResult = () => {
    const {firstNumber, secondNumber, operation} = calculatorState;
    let result = 0;
    switch (operation) {
      case '+':
        result = parseInt(secondNumber) + parseInt(firstNumber);
        break;
      case '-':
        result = parseInt(secondNumber) - parseInt(firstNumber);
        break;
      case '*':
        result = parseInt(secondNumber) * parseInt(firstNumber);
        break;
      case '%':
        result = parseInt(secondNumber) % parseInt(firstNumber);
        break;
      case '/':
        result = parseInt(secondNumber) / parseInt(firstNumber);
        break;
      default:
        result = 0;
        break;
    }
    clear();
    setResult(result);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [styles.screenFirstNumber, {color: colors.result}]
              : [styles.screenFirstNumber, {fontSize: 30, color: colors.result}]
          }>
          {result?.toString()}
        </Text>
      );
    }
    if (calculatorState.firstNumber && calculatorState.firstNumber.length < 6) {
      return (
        <Text style={styles.screenFirstNumber}>
          {calculatorState.firstNumber}
        </Text>
      );
    }
    if (calculatorState.firstNumber === '') {
      return <Text style={styles.screenFirstNumber}>{'0'}</Text>;
    }
    if (
      calculatorState.firstNumber.length > 5 &&
      calculatorState.firstNumber.length < 8
    ) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 30}]}>
          {calculatorState.firstNumber}
        </Text>
      );
    }
    if (calculatorState.firstNumber.length > 7) {
      return (
        <Text style={[styles.screenFirstNumber, {fontSize: 30}]}>
          {calculatorState.firstNumber}
        </Text>
      );
    }
  };

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.containerStyle}>
        <Text style={styles.screenSecondNumber}>
          {calculatorState.secondNumber}
          <Text style={styles.operationText}>{calculatorState.operation}</Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={styles.rowSpacing}>
        {buttonsData.map(([name, handlePress], index) => (
          <NormalButtonCompoenet
            key={index}
            name={name}
            height={55}
            width={index === 16 ? 160 : 65}
            theme={theme}
            handlePress={handlePress}
          />
        ))}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  wrapper: {height: '100%', width: '100%'},
  containerStyle: {
    height: androidPlatform ? '46%' : '30%',
    width: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  operationText: {
    color: 'purple',
    fontSize: 30,
    fontWeight: '500',
  },
  rowSpacing: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  result: {color: colors.black, fontWeight: '600', fontSize: 30},
  screenSecondNumber: {
    fontSize: 40,
    color: colors.gray,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  screenFirstNumber: {
    fontSize: 40,
    fontWeight: '400',
    color: colors.gray,
    alignSelf: 'flex-end',
    marginBottom: 35,
  },
});
