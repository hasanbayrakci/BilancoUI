import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Dashboard from './components/Dashboard';
import Kalemler from './components/Kalemler';
import GelirGider from './components/GelirGider';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kalemler" element={<Kalemler />} />
          <Route path="/gelirgider" element={<GelirGider />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
