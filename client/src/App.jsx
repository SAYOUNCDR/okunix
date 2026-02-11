import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardDetail from "./pages/DashboardDetail";
import WebsiteSetting from "./pages/WebsiteSetting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
        {/* Test route for dashboard details */}
        <Route path="/dashboard/detail" element={<DashboardDetail />} />
        <Route path="/dashboard/setting" element={<WebsiteSetting />} />
      </Routes>
    </Router>
  );
}

export default App;
