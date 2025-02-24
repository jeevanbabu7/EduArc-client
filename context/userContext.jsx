import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../lib/appwrite/appwrite";
import { toast } from "../lib/appwrite/toast";


const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    toast('Welcome back. You are logged in');
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    toast('Logged out');
  }

  async function register(email, password) {
    try {
    
      const newUser = await account.create(ID.unique(), email, password);
      await login(email, password);
      toast('Account created successfully');
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.code === 400) {
        toast("Invalid email or password format");
      } else if (error.code === 409) {
        toast("This email is already in use");
      } else {
        toast("Something went wrong. Please try again.");
      }
  
      return { success: false, error: error.message };
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
      toast('Welcome back. You are logged in');
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register, toast }}>
      {props.children}
    </UserContext.Provider>
  );
}
