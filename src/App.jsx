import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Components
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <Header />

                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/favorites"
                      element={
                        <ProtectedRoute>
                          <Favorites />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>

                <Footer />

                {/* Toast Notifications */}
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "var(--toast-bg)",
                      color: "var(--toast-color)",
                      border: "1px solid var(--toast-border)",
                    },
                    success: {
                      iconTheme: {
                        primary: "#10B981",
                        secondary: "#FFFFFF",
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: "#EF4444",
                        secondary: "#FFFFFF",
                      },
                    },
                  }}
                />
              </div>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
