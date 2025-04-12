import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.js"

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)


    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    };
    const handleLogin = () => {

        if (!email.trim() || !password.trim()) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!isStrongPassword(password)) {
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        setIsLoading(true);


        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log("45"+user);

            })
            .catch((error) => {
                const errorCode = error.code;
                setErrorMessage(error.message);

            }).finally(() => {
                setIsLoading(false);
                router.replace("/Home");

            });;
    }

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
                    style={[
                        styles.button,
                        (isLoading || !email || !password ) && styles.disabledButton
                    ]}

                    onPress={handleLogin}
                    disabled={isLoading || !email || !password }
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

                {errorMessage ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                ) : null}

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: "#330000",
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        width: "100%",
        borderWidth: 1,
        borderColor: "#FF4C4C",
    },

    errorText: {
        color: "#FF4C4C",
        fontSize: 14,
        textAlign: "center",
    },
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
        color: "#FFD700",
    },
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
        // backgroundColor: "#555",
        borderColor: "#777",
        opacity: 0.6,
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