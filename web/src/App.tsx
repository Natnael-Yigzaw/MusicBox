import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css"
import Layout from "./components/Layout";
import Home from './pages/Home';
import Upload from "./pages/Upload";
import Explore from "./pages/Explore";
import Statistic from "./pages/Statistic";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/statistics" element={<Statistic />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
