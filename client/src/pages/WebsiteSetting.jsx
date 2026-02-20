import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getWebsite } from "../services/websiteApi";

const WebsiteSetting = () => {
  const navigate = useNavigate();
  const { websiteId } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Edit states
  const [editName, setEditName] = useState("");
  const [editDomain, setEditDomain] = useState("");

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        setLoading(true);
        const data = await getWebsite(websiteId);
        setWebsite(data.website);
        setEditName(data.website.websiteName);
        setEditDomain(data.website.domain);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch website:", err);
        setError("Failed to load website details");
      } finally {
        setLoading(false);
      }
    };

    if (websiteId) {
      fetchWebsite();
    }
  }, [websiteId]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </main>
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
        <Sidebar />
        <main className="flex-1 flex flex-col p-8">
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error || "Website not found"}
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium w-fit"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <header className="px-8 py-6">
          <div className="mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {website.websiteName}
              </h1>
              <a
                href={`https://${website.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center gap-1"
              >
                {website.domain}
              </a>
            </div>
          </div>
        </header>

        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="flex-1 p-8">
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Website Id
              </h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg flex items-center justify-between">
                <p className="text-gray-900">{website.websiteId}</p>
                <button
                  onClick={() => handleCopy(website.websiteId, "id")}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedId ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-500 hover:text-gray-900"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Name</h3>
              <input
                type="text"
                name="websiteName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-gray-100 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all text-gray-900"
                placeholder="Enter website name"
              />
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Domain
              </h3>
              <input
                type="text"
                name="domain"
                value={editDomain}
                onChange={(e) => setEditDomain(e.target.value)}
                className="w-full bg-gray-100 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all text-gray-900"
                placeholder="domain.com"
              />
            </div>
            <div>
              <button className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm">
                Save changes
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Tracking Code
              </h3>
              <p className="py-4 px-2 text-sm text-gray-600">
                To track stats for this website, place the following code in the
                "head" section of your website's HTML.
              </p>
              <div className="bg-gray-100 p-3 border border-slate-200 rounded-lg flex items-center justify-between font-mono text-xs">
                <p className="break-all whitespace-pre-wrap">
                  {`<script
  defer
  data-website-id="${website.websiteId}"
  src="http://localhost:5000/tracker.js"
></script>`}
                </p>
                <button
                  onClick={() =>
                    handleCopy(
                      `<script defer data-website-id="${website.websiteId}" src="http://localhost:5000/tracker.js"></script>`,
                      "script",
                    )
                  }
                  className="p-1 ml-4 hover:bg-gray-200 rounded transition-colors self-start"
                >
                  {copiedScript ? (
                    <Check size={16} className="text-green-600" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-500 hover:text-gray-900"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div></div>

          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-red-600">Danger Zone</h3>
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-gray-50 pt-4">
              <div>
                <h3 className="font-bold">Reset website</h3>
                <p className="text-sm">
                  All statistics for this website will be deleted, but your
                  settings will remain intact.
                </p>
              </div>
              <div>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm">
                  Reset Website
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-gray-50 pt-4">
              <div>
                <h3 className="font-bold">Delete website</h3>
                <p className="text-sm">All website data will be deleted.</p>
              </div>
              <div>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm">
                  Delete Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WebsiteSetting;
