import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col mx-auto max-w-7xl px-4 w-full">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:code" element={<ProductPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}