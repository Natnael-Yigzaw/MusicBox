import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";
import Layout from "./components/Layout";
import Home from './pages/Home';
import Upload from "./pages/Upload";
import Update from "./pages/Update";
import Explore from "./pages/Explore";
import Statistic from "./pages/Statistic";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/update/:songId" element={<Update />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/statistics" element={<Statistic />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
