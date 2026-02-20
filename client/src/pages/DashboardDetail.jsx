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
import { Cog, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-geist">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <header className="px-4 sm:px-8 py-4 sm:py-6">
          <div className="mb-4 sm:mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm"
            >
              <ArrowLeft size={16} />{" "}
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex flex-col gap-1 min-w-0 w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                Dev Calendar
              </h1>
              <a
                href="https://devcalendar.sayoun.studio"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors text-xs sm:text-sm flex items-center gap-1 truncate"
              >
                devcalendar.sayoun.studio
              </a>
            </div>

            <Button className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <Cog size={16} />
              Edit
            </Button>
          </div>
        </header>

        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="flex-1 p-4 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap justify-end items-center gap-2">
              <div className="flex items-center gap-2 mr-auto sm:mr-0 order-2 sm:order-1">
                <button className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm">
                  <ArrowLeft size={16} />
                </button>
                <button className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm">
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full sm:w-auto order-1 sm:order-2">
                <TimeFilter />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <StatCard
                title="Visitors"
                value="15"
                change="15%"
                trend="up"
                trendColor="green"
              />

              <StatCard
                title="Visits"
                value="18"
                change="21%"
                trend="down"
                trendColor="red"
              />

              <StatCard
                title="Views"
                value="22"
                change="63%"
                trend="down"
                trendColor="red"
              />

              <StatCard
                title="Bounce rate"
                value="78%"
                change="37%"
                trend="up"
                trendColor="red"
              />

              <StatCard
                title="Visit duration"
                value="2m 48s"
                change="40%"
                trend="down"
                trendColor="red"
              />
            </div>
          </div>

          <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ChartFilter />
              </div>
            </div>
            <div className="h-64 sm:h-80 w-full">
              <BarChart />
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <TrafficHeatmap />
            <SourcesSection />
            <LocationSection />
            <EnvironmentSection />
            <EntryExitPages />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardDetail;
