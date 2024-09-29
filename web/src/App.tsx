import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css"
import Layout from "./components/Layout";
import Home from './pages/Home';
import Upload from "./pages/Upload";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
