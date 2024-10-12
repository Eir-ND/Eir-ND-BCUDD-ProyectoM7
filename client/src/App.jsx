import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProductsPage from "./pages/ProductsPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductProvider } from "./context/ProductContext";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
// import  from "./components/Layout/Index";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/add-product" element={<ProductFormPage />} />
              <Route path="/products/:id" element={<ProductFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
