import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Customers from "./pages/Customers";
import Properties from "./pages/Properties";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Ana Sayfa</Link></li>
            <li><Link to="/customers">Müşteriler</Link></li>
            <li><Link to="/properties">Emlaklar</Link></li>
            <li><Link to="/appointments">Randevular</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Ana Sayfa</h1>} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
