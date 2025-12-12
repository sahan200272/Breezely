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
  Alert, // Added Alert for better user feedback on button press
} from "react-native";
// Importing icons from libraries built into Expo
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
// 🌟 New: Import Colors from the constants file
import { Colors } from "../../constants/colours"; // Adjust path (e.g., '@/constants/Colors') if you use aliases

export default function RegisterScreen() {
  // --- State Variables ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [familiarHand, setFamiliarHand] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isReEnterPasswordVisible, setIsReEnterPasswordVisible] =
    useState(false);

  // --- Logic ---
  const handleRegister = async () => {
    if (password !== reEnterPassword) {
      Alert.alert("Error", "Passwords do not match. Please re-enter.");
      return;
    }

    const userData = {
      name,
      email,
      familiarHand,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST", // Standard method for creating a new resource
        headers: {
          "Content-Type": "application/json", // Tells the server the body is JSON
        },
        body: JSON.stringify(userData), // Convert JavaScript object to JSON string
      });

      // 4. Handle the Response
      if (response.ok) {
        // Check if the response status is 200-299
        // Success!
        Alert.alert("Success", "Registration successful! You can now log in.");

        const responseData = await response.json();
        console.log(responseData);
        router.replace("/login"); // Redirect to the login page
      } else {
        // Server returned an error (e.g., 400, 500)
        const errorData = await response.json();
        Alert.alert(
          "Registration Failed",
          errorData.message || "An unknown error occurred on the server."
        );
      }
    } catch (error) {
      // Network or other critical error (e.g., server is down)
      console.error("Registration API Error:", error);
      Alert.alert(
        "Network Error",
        "Could not connect to the registration server."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          {/* --- Header --- */}
          <Text style={styles.title}>Register</Text>

          {/* --- Name Input --- */}
          <Text style={styles.label}>Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={Colors.text}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          {/* --- Email Input --- */}
          <Text style={styles.label}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={Colors.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* --- Familiar Hand input --- */}
          <Text style={styles.label}>Familiar Hand :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your familiar hand"
            placeholderTextColor={Colors.text}
            value={familiarHand}
            onChangeText={setFamiliarHand}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* --- Password Input --- */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor={Colors.text}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* --- Re-enter Password Input --- */}
          <Text style={styles.label}>Re-enter Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Re-enter password"
              placeholderTextColor={Colors.text}
              value={reEnterPassword}
              onChangeText={setReEnterPassword}
              secureTextEntry={!isReEnterPasswordVisible}
            />
            <TouchableOpacity
              onPress={() =>
                setIsReEnterPasswordVisible(!isReEnterPasswordVisible)
              }
              style={styles.eyeIcon}
            >
              <Ionicons
                name={
                  isReEnterPasswordVisible ? "eye-off-outline" : "eye-outline"
                }
                size={24}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* --- Social Login Section --- */}
          <Text style={styles.orText}>or register using</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesign name="google" size={32} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome6 name="linkedin" size={32} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome6 name="x-twitter" size={32} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {/* --- Main Register Button --- */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {/* --- Footer Section --- */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>If account exist?</Text>
              <TouchableOpacity
                style={styles.loginButton}
                // Correct usage of the imported router object
                onPress={() => router.replace("/login")}
              >
                <Text style={styles.loginButtonText}>Log-in</Text>
              </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Stylesheet now only uses the imported Colors object
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
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.text, // Used Colors.primary
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    color: Colors.text,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    borderWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
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
    marginTop: 5,
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 20,
  },
  registerButton: {
    backgroundColor: Colors.primary, // Used Colors.primary
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: Colors.background, // Used Colors.background (white)
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
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
});
