import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase.js';
import { useRouter } from 'expo-router';
import { useUser } from '../../context/userContext.jsx';
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
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Login</Text>

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title="Submit" onPress={handleSubmit} />

          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.footer}>
              Don't have an account? <Text style={styles.link}>Sign Up</Text>
            </Text>
          </Pressable>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: "50%",
    width: "100%",
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
  error: {
    color: 'red',
    marginBottom: 12,
  },
  footer: {
    marginTop: 16,
  },
  link: {
    color: 'blue',
  },
});

export default LoginForm;
