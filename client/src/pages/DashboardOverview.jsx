import { useState, useEffect } from "react";
import Button from "../components/common/Button";
import Sidebar from "../components/layout/Sidebar";
import WebsiteList from "../components/dashboard/WebsiteList";
import AddWebsiteModal from "../components/dashboard/AddWebsiteModal";
import { Plus, Search } from "lucide-react";
import { getUserWebsites, createWebsite } from "../services/websiteApi";

const DashboardOverview = () => {
  const [websites, setWebsites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch websites on mount
  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      setLoading(true);
      const data = await getUserWebsites();
      // Assuming data is an array of websites or data.websites is the array
      // Adjust based on your actual API response structure
      setWebsites(Array.isArray(data) ? data : data.websites || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch websites:", err);
      setError("Failed to load websites");
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebsite = async (newWebsiteData) => {
    try {
      // API call to create website
      const response = await createWebsite({
        websiteName: newWebsiteData.name,
        domain: newWebsiteData.domain,
      });

      // Based on success response structure: { message, newWebsite: {...} }
      const newSite = response.newWebsite;

      // Optimistically update the list
      setWebsites((prev) => [...prev, newSite]);
      setError(null);
      return Promise.resolve(); // Signal success to modal
    } catch (err) {
      console.error("Failed to create website:", err);
      // Propagate error to modal so it can display it
      return Promise.reject(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <AddWebsiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddWebsite}
      />

      <main className="flex-1 flex flex-col overflow-hidden w-full relative">
        <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-8 pl-14 lg:pl-8 shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Websites
          </h1>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Website</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="mb-6">
            <div className="relative w-full max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search websites..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <WebsiteList
              websites={websites.filter((site) => {
                const query = searchQuery.toLowerCase();
                const name = (
                  site.name ||
                  site.websiteName ||
                  ""
                ).toLowerCase();
                const domain = (site.domain || "").toLowerCase();
                return name.includes(query) || domain.includes(query);
              })}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
