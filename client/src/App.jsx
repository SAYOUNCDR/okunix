import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import DashboardDetail from "./components/dashboard/DashboardDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
        {/* Test route for dashboard details */}
        <Route path="/dashboard/detail" element={<DashboardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
