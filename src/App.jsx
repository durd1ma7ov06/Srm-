import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PromotionsPage from './pages/PromotionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="katalog" element={<CatalogPage />} />
        <Route path="katalog/:slug" element={<CategoryProductsPage />} />
        <Route path="mahsulot/:id" element={<ProductPage />} />
        <Route path="savatcha" element={<CartPage />} />
        <Route path="kirish" element={<LoginPage />} />
        <Route path="royxatdan-otish" element={<SignupPage />} />
        <Route path="aksiyalar" element={<PromotionsPage />} />
        <Route path="biz-haqimizda" element={<AboutPage />} />
        <Route path="aloqa" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
