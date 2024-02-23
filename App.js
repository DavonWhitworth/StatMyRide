import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LocationTracker from './components/LocationTracker';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Not a bad start.</Text>
      <StatusBar style="auto" />
      <LocationTracker/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
