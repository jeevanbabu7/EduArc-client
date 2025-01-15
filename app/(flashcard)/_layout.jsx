import React from 'react';
import { Slot, useNavigation } from 'expo-router';

const Layout = () => {
  const navigation = useNavigation();
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'FlashCards',
      });
    }, [navigation]);
  return (
      <Slot />
  );
};

export default Layout;
