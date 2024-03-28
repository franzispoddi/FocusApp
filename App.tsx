import React from 'react';
import type { PropsWithChildren } from 'react';
import Config from 'react-native-config'; 
import TaskList from './components/TaskList';

// Example: Accessing the API base URL from the .env file using react-native-config
const apiBaseUrl = Config.API_BASE_URL;
console.log('API Base URL:', apiBaseUrl);

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        {/* TaskList component to display tasks */}
        <TaskList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... styles remain unchanged
});

export default App;
