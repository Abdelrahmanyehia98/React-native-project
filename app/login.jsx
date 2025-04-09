import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter both username and password");
            return;
        }

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (username && password) {
                router.replace("/Home");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to login. Please try again.");
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
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessibilityLabel="Username input"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
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
});
