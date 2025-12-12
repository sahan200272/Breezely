import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
// Importing icons from libraries built into Expo
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "../../constants/colours";
import { router } from "expo-router";

export default function LoginScreen() {
  // 1. State variables to hold input values and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleLogin() {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://192.168.1.9:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells the server the body is JSON
        },
        body: JSON.stringify(loginData),
      });

      console.log(response);
      router.replace("/register");
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    // SafeAreaView ensures content doesn't go under the notch on phones
    <SafeAreaView style={styles.safeArea}>
      {/* KeyboardAvoidingView pushes content up when the keyboard opens */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          {/* --- Header --- */}
          <Text style={styles.title}>Login</Text>

          {/* --- Email Input Section --- */}
          <Text style={styles.label}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            // Using the light green color from the image for the placeholder
            placeholderTextColor={Colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* --- Password Input Section --- */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor={Colors.text}
              value={password}
              onChangeText={setPassword}
              // Toggle secure entry based on state
              secureTextEntry={!isPasswordVisible}
            />
            {/* Eye icon button to toggle password visibility */}
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="text"
              />
            </TouchableOpacity>
          </View>

          {/* --- Social Login Section --- */}
          <Text style={styles.orText}>or log-in using</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesign name="google" size={32} color="text" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesign name="linkedin" size={32} color="text" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              {/* Using FontAwesome6 for the X icon */}
              <FontAwesome6 name="x-twitter" size={32} color="text" />
            </TouchableOpacity>
          </View>

          {/* --- Main Login Button --- */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log-in</Text>
          </TouchableOpacity>

          {/* --- Footer Section --- */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.replace("/register")}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center", // Centers content vertically
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 25, // Creates the pill shape
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: Colors.text,
  },
  // Container for password input and eye icon
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1, // Takes up remaining space
    height: "100%",
    fontSize: 16,
    color: Colors.text,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  orText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  socialIcon: {
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
});
