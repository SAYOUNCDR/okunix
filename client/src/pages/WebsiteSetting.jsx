import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useCopy from "../hooks/useCopy";
import DangerModal from "../components/common/DangerModal";
import {
  getWebsite,
  deleteWebsite,
  getTrackingScript,
  updateWebsite,
  resetWebsite,
} from "../services/websiteApi";

const WebsiteSetting = () => {
  const navigate = useNavigate();
  const { websiteId } = useParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedId, copyId] = useCopy();
  const [copiedScript, copyScript] = useCopy();
  const [trackingScript, setTrackingScript] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Edit states
  const [editName, setEditName] = useState("");
  const [editDomain, setEditDomain] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch both website details and the dynamic tracking script in parallel
        const [websiteRes, scriptRes] = await Promise.all([
          getWebsite(websiteId),
          getTrackingScript(websiteId),
        ]);

        setWebsite(websiteRes.website);
        setEditName(websiteRes.website.websiteName);
        setEditDomain(websiteRes.website.domain);
        setTrackingScript(scriptRes.script);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch website data:", err);
        setError("Failed to load website details");
      } finally {
        setLoading(false);
      }
    };

    if (websiteId) {
      fetchData();
    }
  }, [websiteId]);

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      setSuccess(false);
      setError(null);

      const response = await updateWebsite(websiteId, {
        websiteName: editName,
        domain: editDomain,
      });

      setWebsite(response.updatedWebsite);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update website:", err);
      setError(typeof err === "string" ? err : "Failed to update website");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteWebsite(websiteId);
      setIsDeleteModalOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to delete website:", err);
      setError(typeof err === "string" ? err : "Failed to delete website");
      setIsDeleting(false);
    }
  };

  const handleReset = () => {
    setIsResetModalOpen(true);
  };

  const confirmReset = async () => {
    try {
      setIsResetting(true);
      await resetWebsite(websiteId);
      setIsResetModalOpen(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to reset website:", err);
      setError(typeof err === "string" ? err : "Failed to reset website");
    } finally {
      setIsResetting(false);
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
        <header className="px-8 pt-6">
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

        {/* <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div> */}

        <div className="flex-1 px-8">
          <div className="mt-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="mb-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Website Id
              </h3>
              <div className="bg-gray-100 p-2 border border-slate-200 rounded-lg flex items-center justify-between">
                <p className="text-gray-900">{website.websiteId}</p>
                <button
                  onClick={() => copyId(website.websiteId)}
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
            <div className="flex items-center gap-4">
              <button
                onClick={handleUpdate}
                disabled={updateLoading}
                className="mt-4 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm disabled:opacity-50"
              >
                {updateLoading ? "Saving..." : "Save changes"}
              </button>
              {success && (
                <p className="mt-4 text-sm text-green-600 font-medium">
                  Website updated successfully!
                </p>
              )}
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
                  {trackingScript}
                </p>
                <button
                  onClick={() => copyScript(trackingScript)}
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

          <div className="my-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm"
                >
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
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-red-500 hover:text-red-900 transition-colors text-sm font-medium border border-red-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-red-50 shadow-sm"
                >
                  Delete Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DangerModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Website"
        description="This will permanently delete all records and settings for this website. This cannot be undone."
        confirmText="Confirm Delete"
        message={`Are you sure you want to delete ${website?.websiteName}?`}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        color="red"
      />

      <DangerModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Statistics"
        description="This will wipe all historical visitor data. Your website settings and tracking code will remain intact."
        confirmText="Reset Data"
        message={`Are you sure you want to reset ${website?.websiteName}'s stats?`}
        onConfirm={confirmReset}
        isLoading={isResetting}
        color="orange"
      />
    </div>
  );
};

export default WebsiteSetting;
