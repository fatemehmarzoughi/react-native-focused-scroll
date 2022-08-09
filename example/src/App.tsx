import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FocusedScrollView from 'react-native-focused-scroll';

export default function App() {
  const [ data, setData ] = useState([
    { text: "text1" },
    { text: "text2" },
    { text: "text3" },
    { text: "text4" },
    { text: "text5" },
    { text: "text6" }
  ]);

  return (
    <View style={styles.container}>
      <FocusedScrollView
        data={data}
        onItemPress={() => console.log('pressed')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
