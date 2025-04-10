import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebase";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }

        setIsLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            router.replace("/Home");
        } catch (error) {
            let errorMessage = "Failed to login. Please try again.";
            
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password";
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
                <Text style={styles.title}>Login</Text>

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

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={isLoading}
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.signUpLink} 
                    onPress={() => router.push("/signup")}
                >
                    <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
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
        color: "#FFD700",     },
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
    signUpLink: {
        marginTop: 20,
    },
    signUpText: {
        color: "#007bff",
        fontSize: 14,
    },
});