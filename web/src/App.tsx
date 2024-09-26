import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css"
import Layout from "./components/Layout";
import Home from './pages/Home';
import Upload from "./pages/Upload";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
