import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase.js';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/userContext.jsx';
import { Divider, InputField } from '@gluestack-ui/themed';
import { Input } from '@gluestack-ui/themed';
import { FontAwesome } from '@expo/vector-icons';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const user = useUser(); 

  const handleSubmit = async () => {
    // Alert.alert('Form submitted with:'+ email + password);
    
    if (!email || !password) {
      setErrorMessage('All fields are required.');
    }else {
      setErrorMessage('');
      // try {

      //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
      //   const user = userCredential.user;
  
      //   if (user) {
      //     console.log('Form submitted with:', { email, password });
      //     Alert.alert('Success', 'Signed in successfully.');
      //     router.push('(tabs)/home');
      //   } else {
      //     setErrorMessage('An error occurred while signing in.');
      //     Alert.alert('Error', 'An error occurred while signing in.');
      //   }
      // } catch (error) {
      //   setErrorMessage(error.message);
      //   Alert.alert('Error', error.message);
      // }

      // appwrite auth
      try {
        const res = await user.login(email, password);
        if(res.success) {
          router.push('/(tabs)/home');
        } else {
          setErrorMessage(res.error);
        }
      }catch(err) {
        console.error(err);
      }
      
    }
  };
  
  return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
              
              <View>
                <Text style={styles.header}>Login</Text>
                <Pressable onPress={() => router.push('/(auth)/signup')}>
                  <Text style={styles.footer}>
                    Already registered ? <Text style={styles.link}>Sign up</Text>
                  </Text>
                  </Pressable>
              </View>
  
              
  
              <View 
                style={styles.inputContainer}
              >
                {/* <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                /> */}
  
              <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </Input>
              <Input
                variant="underlined"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </Input>
          
  
              </View>
  
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.continue} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
  
              
              
              <Divider />
  
              <View style={styles.googlebtnContainer}>
                <TouchableOpacity style={styles.googlebtn} >
                <FontAwesome name="google" size={24} style={styles.googleIcon} />
                  <Text style={styles.google}>Continue with google</Text>
                </TouchableOpacity>
              </View>
              
              {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
  
              <View style={styles.imageContainer}>
                {/* <Image
                  source={require('../../assets/images/signup.png')}
                  style={styles.image}
                /> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      width: '100%',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    innerContainer: {
      flex: 1,
      paddingTop: 52,
      paddingHorizontal: 16,
      gap: 16,
      width: '100%',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 12,
      paddingLeft: 8,
    },
    inputContainer: {
      gap: 16,
    },
    error: {
      color: 'red',
      marginBottom: 12,
    },
    footer: {
      marginBottom: 12,
    },
    link: {
      color: 'blue',
    },
    continue: {
      borderRadius: 10,
      backgroundColor: '#000000',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
    btnContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    image: {
      width: '100%',
      height: 200,
      marginTop: 20,
   
  
    },
    googlebtnContainer: {
      height: 50,
      marginTop: 24,
  
    },
    googlebtn: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 120,
      border: "1px solid #000000",
      borderWidth: 1,
  
    },
    google: {
      fontSize: 18,
      fontWeight: "bold",
    },
    googleIcon: {
      marginRight: 10,
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      flex: 1
    }
  
  });

export default LoginForm;
