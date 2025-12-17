import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
function App() {
  return (
    <>
      <Provider store={store}>
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
      </Provider>
    </>
  );
}

export default App;
