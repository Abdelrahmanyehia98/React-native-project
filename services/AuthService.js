import { auth } from './firebase';

const signUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = () => {
  return auth().currentUser;
};

export { signUp, signIn, signOut, getCurrentUser };