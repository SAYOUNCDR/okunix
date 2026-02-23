import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { Loader2 } from "lucide-react";

// Lazy loaded pages
const Landing = lazy(() => import("./pages/Landing"));
const DashboardOverview = lazy(() => import("./pages/DashboardOverview"));
const DashboardDetail = lazy(() => import("./pages/DashboardDetail"));
const WebsiteSetting = lazy(() => import("./pages/WebsiteSetting"));
const UserSetting = lazy(() => import("./pages/UserSetting"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Sponsor = lazy(() => import("./pages/Sponsor"));
const Features = lazy(() => import("./pages/Features"));
const Support = lazy(() => import("./pages/Support"));
const Docs = lazy(() => import("./pages/Docs"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

// Fallback loader component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/features" element={<Features />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

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
      </Suspense>
    </Router>
  );
}

export default App;
