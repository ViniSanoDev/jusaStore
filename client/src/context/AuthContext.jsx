import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { apiService } from "../services/apiService";

// Create AuthContext
export const AuthContext = createContext();

export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error("Not authenticated. Please log in again.");
  return { Authorization: `Bearer ${token}` };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Email/password authentication
    const signin = async (email, password) => {
        try {
            const response = await apiService.post("/api/user/signin", { email, password });
            const { token } = response;
            // Store token in localStorage
            localStorage.setItem("authToken", token);

            const decodedUser = jwtDecode(token);
            setUser(decodedUser);

            navigate("/");
        } catch (error) {
            console.error("Signin error:", error);
            throw new Error("Invalid credentials");
        }
    };
    
    // Google authentication
    const signinWithGoogle = async () => {
        try {
            // Sign in with Google using Firebase
            const result = await signInWithPopup(auth, googleProvider);
            
            // Get the ID token
            const idToken = await result.user.getIdToken();
            
            // Exchange Firebase token for our app's JWT token
            const response = await apiService.post("/api/user/google-auth", { 
                idToken,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            });
            
            const { token } = response.data;
            
            // Store token in localStorage
            localStorage.setItem("authToken", token);
            
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            
            navigate("/");
        } catch (error) {
            console.error("Google signin error:", error);
            throw new Error("Google authentication failed");
        }
    };

    const signout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/account");
    };

    // Function to check auth status on app load
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                if (decodedUser.exp * 1000 < Date.now()) {
                    signout(); // Signout if token is expired
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error("Token decoding error:", error);
                signout();
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, signin, signinWithGoogle, signout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
