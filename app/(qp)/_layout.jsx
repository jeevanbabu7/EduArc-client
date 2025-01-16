import React from 'react';
import { Slot, useNavigation } from 'expo-router';

const Layout = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'PYQ', // Set the header title
      headerStyle: {
        backgroundColor: '#white ', // Background color of the header
      },
      headerTintColor: 'black', // Color of the title and back button
    });
  }, [navigation]);

  return <Slot />;
};

export default Layout;
