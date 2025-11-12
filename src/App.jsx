import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../src/components/Signup";
import Login from "../src/components/Login";
import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductAdmin from "./pages/ProductAdmin.jsx";
import Products from "./components/Products.jsx";
import Profile from "./components/Profile.jsx";
import Product from "./components/Product.jsx";
import ProductDetailPage from "./components/ProductDetail.jsx";
import ReviewForm from "./components/Review.jsx";
import CartPage from "./components/CartPage.jsx"; 
import NotFound from "./components/NotFound.jsx";
import Contact from "./components/ContactUs.jsx";
import FAQ from "./components/Faq.jsx";
import AboutUs from "./components/AboutUs.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import Careers from "./components/Careers.jsx";
import GetContact from "./components/getContact.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import PaymentPage from "./pages/Payment.jsx";
import OrderScreen from "./pages/OrderScreen.jsx";

const App = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/products" element={<ProductAdmin />} />
          <Route path="/user/products" element={<Products />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/comment" element={<ReviewForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />}/>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsOfService />}/>
          <Route path="/careers" element={<Careers />}/>
          <Route path="/GetMessage" element={<GetContact />}/>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </main>

      <Footer />
    </div>
  );
};

export default App;