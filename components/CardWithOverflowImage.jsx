import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import learn from '../assets/icons/learn.png';

const CardWithOverflowImage = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={learn}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Smarter Learning</Text>
          <Text style={styles.title}>With AI</Text>
          <Text style={styles.description}>
            Unlock the power of AI
          </Text>
          <Text style={styles.description}>
            For a tailored learning experience.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardWithOverflowImage;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#800080",
    borderRadius: 5,
    padding: 16,
    margin:10,
    // borderWidth:1,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Ensures the text container takes the remaining space
    marginLeft: 16, // Adds spacing between the image and text
    paddingLeft:25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color:'white'
  },
  description: {
    fontSize: 14,
    color: "#ffff",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8, 
  },
});
