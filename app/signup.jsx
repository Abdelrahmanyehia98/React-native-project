import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebase";

export default function SignUpScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords don't match");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password should be at least 6 characters");
            return;
        }

        setIsLoading(true);
         try {
        console.log("Attempting to create user with:", email);
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("User created successfully:", userCredential.user);
        
        router.replace("/Home");
        } catch (error) {
            let errorMessage = "Failed to sign up. Please try again.";
            
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email is already in use";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password should be at least 6 characters";
                    break;
                default:
                    errorMessage = error.message;
            }
            
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    accessibilityLabel="Email input"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    accessibilityLabel="Password input"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    accessibilityLabel="Confirm password input"
                />

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.disabledButton]}
                    onPress={handleSignUp}
                    disabled={isLoading}
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.loginLink} 
                    onPress={() => router.push("/login")}
                >
                    <Text style={styles.loginText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212", 
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#FFD700"},
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#2D2D2D",
        borderColor: "#333",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: "#FFF",
        fontSize: 16,
    },
    button: {
        width: "100%",
        backgroundColor: "#333",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFD700", 
    },
    disabledButton: {
        backgroundColor: "#555",
    },
    buttonText: {
        color: "#FFD700", 
        fontSize: 18,
        fontWeight: "bold",
    },
    loginLink: {
        marginTop: 20,
    },
    loginText: {
        color: "#007bff",
        fontSize: 14,
    },
});