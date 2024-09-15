import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const App = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
