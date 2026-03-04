import Sidebar from "../components/layout/Sidebar";
import Button from "../components/common/Button";
import BarChart from "../components/charts/BarChart";
import StatCard from "../components/dashboard/StatCard";
import TimeFilter from "../components/dashboard/TimeFilter";
import ChartFilter from "../components/dashboard/ChartFilter";
import LocationSection from "../components/dashboard/LocationSection";
import SourcesSection from "../components/dashboard/SourcesSection";
import EnvironmentSection from "../components/dashboard/EnvironmentSection";
import TrafficHeatmap from "../components/dashboard/TrafficHeatmap";
import EntryExitPages from "../components/dashboard/EntryExitpages";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Cog,
  Users,
  MousePointerClick,
  Eye,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDashboardStats,
  getActivityChart,
  getLocationMetrics,
  getEnvironmentMetrics,
  getHeatmapData,
  getSourcesMetrics,
  getPagesMetrics,
} from "../services/analyticsApi";
import { getWebsite } from "../services/websiteApi";

const DashboardDetail = () => {
  const navigate = useNavigate();
  const { websiteId } = useParams(); // URL should be something like /dashboard/:websiteId

  const [stats, setStats] = useState({
    visitors: { value: 0, change: 0 },
    visits: { value: 0, change: 0 },
    views: { value: 0, change: 0 },
    bounceRate: { value: "0%", change: 0 },
    visitDuration: { value: "0m 0s", change: 0 },
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartFilter, setChartFilter] = useState("Day");
  const [website, setWebsite] = useState(null);
  const [timeRange, setTimeRange] = useState("Last 24 hours");
  const [timeOffset, setTimeOffset] = useState(0);

  // Parse range into duration for UI calculation, similar to backend parseRangeBounds
  const getDurationMs = (rangeStr) => {
    const match = (rangeStr || "24h").match(/^(\d+)([hdM])$/);
    let durationMs = 0;
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2];
      if (unit === "h") durationMs = value * 60 * 60 * 1000;
      else if (unit === "d") durationMs = value * 24 * 60 * 60 * 1000;
      else if (unit === "M") durationMs = value * 30 * 24 * 60 * 60 * 1000;
    } else {
      durationMs = 24 * 60 * 60 * 1000;
    }
    return durationMs;
  };

  const getActiveDateLabel = () => {
    if (timeOffset === 0) return timeRange;
    const mappedRange = getMappedRange(timeRange);
    const durationMs = getDurationMs(mappedRange);

    const now = new Date();
    const rangeEnd = new Date(now.getTime() - timeOffset * durationMs);
    const rangeStart = new Date(rangeEnd.getTime() - durationMs);

    // Format e.g., "Mar 2, 2026" or "Feb 28 - Mar 2, 2026" depending on range
    const options = { month: "short", day: "numeric", year: "numeric" };

    if (timeRange === "Last 24 hours") {
      return rangeStart.toLocaleDateString("en-US", options);
    } else {
      const startStr = rangeStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const endStr = rangeEnd.toLocaleDateString("en-US", options);
      return `${startStr} - ${endStr}`;
    }
  };

  const getMappedRange = (rangeLabel) => {
    switch (rangeLabel) {
      case "Last 7 days":
        return "7d";
      case "Last 30 days":
        return "30d";
      case "Last 3 months":
        return "3M";
      case "Last 24 hours":
      default:
        return "24h";
    }
  };

  // New states for location and environment
  const [locationData, setLocationData] = useState({
    Countries: [],
    Regions: [],
    Cities: [],
  });
  const [environmentData, setEnvironmentData] = useState({
    Browsers: [],
    OS: [],
    Devices: [],
  });
  const [sourcesData, setSourcesData] = useState([]);
  const [pagesData, setPagesData] = useState({
    Path: [],
    Entry: [],
    Exit: [],
  });
  const [heatmapData, setHeatmapData] = useState(
    Array.from({ length: 7 }, () => Array(24).fill(0)),
  );
  const [loadingExtras, setLoadingExtras] = useState(true);

  const chartOptions =
    timeRange === "Last 3 months" ? ["Day", "Month"] : ["Day", "Hour"];

  useEffect(() => {
    setTimeOffset(0);
  }, [timeRange]);

  useEffect(() => {
    if (!chartOptions.includes(chartFilter)) {
      setChartFilter("Day");
    }
  }, [timeRange, chartOptions, chartFilter]);

  useEffect(() => {
    const mappedRange = getMappedRange(timeRange);

    const fetchStats = async () => {
      if (!websiteId) return;
      try {
        setLoadingStats(true);
        const data = await getDashboardStats(
          websiteId,
          mappedRange,
          timeOffset,
        );
        setStats(data);
      } catch (error) {
        // Error handled in service layer
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchChartData = async () => {
      if (!websiteId) return;
      try {
        setLoadingChart(true);
        const data = await getActivityChart(
          websiteId,
          mappedRange,
          chartFilter,
          timeOffset,
        );
        setChartData(data);
      } catch (error) {
        // Error handled in service layer
      } finally {
        setLoadingChart(false);
      }
    };

    const fetchExtras = async () => {
      if (!websiteId) return;
      try {
        setLoadingExtras(true);
        const [locData, envData, heatData, srcData, pgData] = await Promise.all(
          [
            getLocationMetrics(websiteId, mappedRange, timeOffset),
            getEnvironmentMetrics(websiteId, mappedRange, timeOffset),
            getHeatmapData(websiteId, mappedRange, timeOffset),
            getSourcesMetrics(websiteId, mappedRange, timeOffset),
            getPagesMetrics(websiteId, mappedRange, timeOffset),
          ],
        );
        setLocationData(locData);
        setEnvironmentData(envData);
        if (heatData && heatData.length > 0) {
          setHeatmapData(heatData);
        }
        setSourcesData(srcData);
        setPagesData(pgData);
      } catch (error) {
        // Error handled in service layer
      } finally {
        setLoadingExtras(false);
      }
    };

    const fetchWebsiteDetail = async () => {
      if (!websiteId) return;
      try {
        const res = await getWebsite(websiteId);
        setWebsite(res.website);
      } catch (error) {
        console.error("Failed to fetch website details:", error);
      }
    };

    fetchStats();
    fetchChartData();
    fetchExtras();
    fetchWebsiteDetail();
  }, [websiteId, timeRange, chartFilter, timeOffset]);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <header className="px-4 sm:px-8 py-4 sm:py-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
          >
            <ArrowLeft size={16} />{" "}
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </button>
        </header>

        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="flex-1 p-4 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1 min-w-0 w-full sm:w-auto">
                {website ? (
                  <>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                      {website.websiteName}
                    </h1>
                    <a
                      href={`https://${website.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors text-xs sm:text-sm flex items-center gap-1 truncate"
                    >
                      {website.domain}
                    </a>
                  </>
                ) : (
                  <div className="animate-pulse flex flex-col gap-2 py-1">
                    <div className="h-7 bg-gray-200 rounded w-48"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 mr-auto sm:mr-0">
                  <button
                    onClick={() => setTimeOffset((prev) => prev + 1)}
                    className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setTimeOffset((prev) => Math.max(0, prev - 1))
                    }
                    disabled={timeOffset === 0}
                    className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-sm font-medium border rounded-lg transition-colors shadow-sm ${
                      timeOffset === 0
                        ? "border-slate-100 text-gray-300 cursor-not-allowed bg-gray-50/50"
                        : "border-slate-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="w-full sm:w-auto">
                  <TimeFilter
                    value={timeRange}
                    onChange={setTimeRange}
                    customDisplay={getActiveDateLabel()}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  label: "Visitors",
                  value: stats.visitors.value,
                  icon: Users,
                  change: stats.visitors.change,
                },
                {
                  label: "Visits",
                  value: stats.visits.value,
                  icon: MousePointerClick,
                  change: stats.visits.change,
                },
                {
                  label: "Views",
                  value: stats.views.value,
                  icon: Eye,
                  change: stats.views.change,
                },
                {
                  label: "Bounce rate",
                  value: stats.bounceRate.value,
                  icon: Activity,
                  change: stats.bounceRate.change,
                },
                {
                  label: "Visit duration",
                  value: stats.visitDuration.value,
                  icon: Clock,
                  change: stats.visitDuration.change,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-gray-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-50 text-gray-600 rounded-lg group-hover:bg-gray-100 transition-colors">
                      <stat.icon size={18} />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {stat.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    {loadingStats ? (
                      <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-black transition-colors">
                        {stat.value}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 min-h-[24px]">
                    {loadingStats ? (
                      <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                    ) : (
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${
                          stat.change === 0
                            ? "bg-gray-100 text-gray-600"
                            : stat.change > 0
                              ? "bg-green-50 text-emerald-600 border border-green-100/50"
                              : "bg-red-50 text-rose-600 border border-red-100/50"
                        }`}
                      >
                        {stat.change === 0 ? (
                          <span className="text-gray-400">~</span>
                        ) : stat.change > 0 ? (
                          <ArrowUpRight size={14} className="stroke-[2.5]" />
                        ) : (
                          <ArrowDownRight size={14} className="stroke-[2.5]" />
                        )}
                        {Math.abs(stat.change)}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
              {timeRange !== "Last 24 hours" && (
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <ChartFilter
                    value={chartFilter}
                    onChange={setChartFilter}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>
            <div className="h-64 sm:h-80 w-full flex items-center justify-center">
              {loadingChart ? (
                <p className="text-gray-500">Loading chart...</p>
              ) : chartData.length > 0 ? (
                <BarChart
                  data={chartData}
                  filterType={
                    timeRange === "Last 24 hours" ? "Hour" : chartFilter
                  }
                />
              ) : (
                <p className="text-gray-500">
                  No activity data for the last 7 days.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <TrafficHeatmap data={heatmapData} loading={loadingExtras} />
            <SourcesSection data={sourcesData} loading={loadingExtras} />
            <LocationSection data={locationData} loading={loadingExtras} />
            <EnvironmentSection
              data={environmentData}
              loading={loadingExtras}
            />
            <EntryExitPages data={pagesData} loading={loadingExtras} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardDetail;
