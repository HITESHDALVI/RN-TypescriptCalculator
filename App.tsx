import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import Calculator from './src/screens/calculator/Calculator';
import {Dimension, androidPlatform} from './src/utilis/constants';
import {ThemeContext, themeType} from './src/utilis/context/ThemeContext';
import {colors} from './src/styles/colors';

function App(): JSX.Element {
  const [theme, setTheme] = useState<themeType>('light');
  const themeMode = theme === 'dark';
  const backgroundStyle = {
    backgroundColor: themeMode ? colors.black : colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={[
          backgroundStyle,
          styles.sectionContainer,
          {
            backgroundColor: backgroundStyle.backgroundColor,
            opacity: themeMode ? 1 : 0.8,
          },
        ]}>
        <StatusBar
          barStyle={themeMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Switch
          value={themeMode}
          onValueChange={() => setTheme(themeMode ? 'light' : 'dark')}
        />
        <View style={styles.linearGradient}>
          <Calculator theme={themeMode} />
        </View>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: androidPlatform ? Dimension.height - 50 : Dimension.height,
    width: Dimension.width,
    elevation: 10,
    shadowColor: colors.shadowBlack,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  linearGradient: {
    height: '95%',
    paddingHorizontal: androidPlatform ? 25 : 10,
    paddingVertical: 30,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginVertical: 25,
    marginHorizontal: 0,
  },
});

export default App;
