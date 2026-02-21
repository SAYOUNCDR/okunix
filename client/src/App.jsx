import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardDetail from "./pages/DashboardDetail";
import WebsiteSetting from "./pages/WebsiteSetting";
import UserSetting from "./pages/UserSetting";
import Blogs from "./pages/Blogs";
import Sponsor from "./pages/Sponsor";
import Features from "./pages/Features";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Support from "./pages/Support";
import Docs from "./pages/Docs";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/features" element={<Features />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route
            path="/dashboard/detail/:websiteId"
            element={<DashboardDetail />}
          />
          <Route
            path="/dashboard/setting/:websiteId"
            element={<WebsiteSetting />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard/setting/user" element={<UserSetting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
