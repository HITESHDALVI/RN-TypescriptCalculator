import {Dimensions, Platform} from 'react-native';

export const Dimension = Dimensions.get('screen');

export const androidPlatform = Platform.OS === 'android';

export const iosPlatform = Platform.OS === 'android';
