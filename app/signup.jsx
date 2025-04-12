import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase.js"

export default function SignUpScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successed, setSuccessed] = useState(false);

   


    const isStrongPassword = (password) => {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        return regex.test(password) ;
    };

    const handleSignUp = () => {      
        
        setErrorMessage(null);
        setSuccessed(false);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!isStrongPassword(password)) {
            setErrorMessage("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                setSuccessed(true);
                setErrorMessage(null);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                    style={[
                        styles.button,
                        (isLoading || !email || !password || !confirmPassword) && styles.disabledButton
                    ]}
                    onPress={handleSignUp}
                    disabled={isLoading || !email || !password || !confirmPassword}
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
                <View >
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}
                    {successed ? (
                        <View style={styles.successContainer}>
                            <TouchableOpacity onPress={() => router.replace('/login')}>
                                <Text style={styles.successText}>
                                    Signup successful! Tap here to login.
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}

            

                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    successContainer: {
        backgroundColor: "#003300", // أخضر غامق يناسب الدارك مود
        borderRadius: 8,
        padding: 12,
        marginTop: 20,
        width: "100%",
        borderWidth: 1,
        borderColor: "#00cc66",
        alignItems: "center",
    },

    successText: {
        color: "#00cc66", // أخضر فاتح
        fontSize: 14,
        textAlign: "center",

    },

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
        color: "#FFD700"
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
    loginLink: {
        marginTop: 20,
    },
    loginText: {
        color: "#007bff",
        fontSize: 14,
    },
});