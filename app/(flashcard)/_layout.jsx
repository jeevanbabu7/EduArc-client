import React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { TouchableOpacity,Image,StyleSheet,Styles } from 'react-native';
import hamburger from '../../assets/icons/hamburger-icon.png';

const Layout = () => {
  const navigation = useNavigation();
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: 'FlashCards',
        headerRight: () => (
          <TouchableOpacity>
              <Image source={hamburger} style={styles.menuIcon} />
          </TouchableOpacity>
        ),
      });
    }, [navigation]);
  return (
      <Slot />
  );
};

export default Layout;
const styles = StyleSheet.create({
  menuIcon:{
      width: 24,
      height: 24
  }
  });