import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardOverview from "./components/dashboard/DashboardOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
