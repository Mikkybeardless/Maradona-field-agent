import React, { useEffect, useState } from "react";
import { Users, Calendar, Target, Eye, DollarSign } from "lucide-react";
import { TabButton } from "./tabButton";
import { MetricCard } from "./metricCard";
import { ConversionTabSection } from "./conversionTab";
import { InspectionTabSection } from "./inspectionSection";
import { RevenueStatus } from "./revenue&StatusOverview";
import { PerformanceSection } from "./performaneSection";
import CustomPeriodModal from "../modals/customPeriod";
import { buildCleanParams } from "@/app/helper/helperFunction";
import { fetchFn } from "@/app/api/fetchFn";
import { SquareLoader } from "../common/squareLoader";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [customDate, setCustomDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initialStats: Stats = {
    inspections: {
      total_inspections: 0,
      completed_inspections: 0,
      pending_inspections: 0,
      purchase_inspections: {
        total: 0,
        completed: 0,
        pending: 0,
      },
      regular_inspections: {
        total: 0,
        completed: 0,
        pending: 0,
      },
      completion_rate: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    conversions: {
      overall_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      purchase_enquiries_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      auction_bids_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    performance: {
      data: [],
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    bids: {
      total_assigned: 0,
      sold_count: 0,
      pending_count: 0,
      rejected_count: 0,
      total_revenue: "",
      conversion_rate: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    enquiries: {
      closed_count: 0,
      conversion_rate: 0,
      pending_count: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
      sold_count: 0,
      total_assigned: 0,
      total_revenue: "",
    },
  };
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const params = buildCleanParams(customDate).toString();
        const response = await fetchFn(`/api/analytics?${params}`);
        // console.log("Stats Data:", response.data.data);
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [customDate.start_date, customDate.end_date]);

  const handleCustomPeriodApply = (customDate: {
    start_date: string;
    end_date: string;
  }) => {
    setCustomDate(customDate);
  };

  const bidIsEmpty =
    stats.bids.sold_count === 0 &&
    stats.bids.pending_count === 0 &&
    stats.bids.rejected_count === 0;
  const enquiryIsEmpty =
    stats.enquiries.sold_count === 0 &&
    stats.enquiries.pending_count === 0 &&
    stats.enquiries.closed_count === 0;

  const bidStatusData = [
    { name: "Sold", value: stats.bids.sold_count, color: "#10B981" },
    { name: "Pending", value: stats.bids.pending_count, color: "#F59E0B" },
    { name: "Rejected", value: stats.bids.rejected_count, color: "#EF4444" },
  ];

  const enquiryStatusData = [
    { name: "Sold", value: stats.enquiries.sold_count, color: "#10B981" },
    { name: "Pending", value: stats.enquiries.pending_count, color: "#F59E0B" },
    { name: "Closed", value: stats.enquiries.closed_count, color: "#6B7280" },
  ];

  const inspectionData = [
    {
      name: "Purchase",
      completed: stats.inspections.purchase_inspections.completed,
      pending: stats.inspections.purchase_inspections.pending,
    },
    {
      name: "Regular",
      completed: stats.inspections.regular_inspections.completed,
      pending: stats.inspections.regular_inspections.pending,
    },
  ];
  const tabNavigations = [
    "overview",
    "conversions",
    "inspections",
    "performance",
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4">
      <CustomPeriodModal
        Modal={isModalOpen}
        setModal={setIsModalOpen}
        onApply={handleCustomPeriodApply}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
              Analytics Overview
            </h1>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {stats.conversions.period.description}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Live Data
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange text-white px-3 py-2 rounded-md"
            >
              Custom period
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2">
          {tabNavigations.map((tab, index) => (
            <TabButton
              key={index}
              id={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={setActiveTab}
            />
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <SquareLoader key={index} />
              ))}
            </div>
          ) : (
            <>
              {/* Key Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                  title="Overall Conversion Rate"
                  value={`${stats.conversions.overall_conversion.conversion_rate}%`}
                  subtitle={`${stats.conversions.overall_conversion.total_sold}/${stats.conversions.overall_conversion.total_assignments} assignments`}
                  icon={Target}
                  color="text-blue-600"
                  trend={
                    stats.conversions.auction_bids_conversion.conversion_rate +
                    stats.conversions.purchase_enquiries_conversion
                      .conversion_rate /
                      2 -
                    70
                  }
                />
                <MetricCard
                  title="Total Revenue"
                  value={
                    (Number(stats.bids.total_revenue) +
                      Number(stats.enquiries.total_revenue)) /
                    1000
                  }
                  subtitle="Combined revenue"
                  icon={DollarSign}
                  color="text-green-600"
                  trend={12}
                  isRevenue={true}
                />
                <MetricCard
                  title="Total Assignments"
                  value={stats.conversions.overall_conversion.total_assignments}
                  subtitle="This period"
                  icon={Users}
                  color="text-purple-600"
                  trend={8}
                />
                <MetricCard
                  title="Inspection Rate"
                  value={`${stats.inspections.completion_rate}%`}
                  subtitle={`${stats.inspections.completed_inspections}/${stats.inspections.total_inspections} completed`}
                  icon={Eye}
                  color="text-orange-600"
                  trend={-2}
                />
              </div>

              {/* Revenue and Status Overview */}
              <RevenueStatus stats={stats} />
            </>
          )}
        </>
      )}

      {/* Conversions Tab */}
      {activeTab === "conversions" && (
        <ConversionTabSection
          bidIsEmpty={bidIsEmpty}
          enquiryIsEmpty={enquiryIsEmpty}
          bidData={bidStatusData}
          enquiryData={enquiryStatusData}
        />
      )}

      {/* Inspections Tab */}
      {activeTab === "inspections" && (
        <InspectionTabSection stats={stats} inspectionData={inspectionData} />
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && <PerformanceSection stats={stats} />}
    </div>
  );
};

export default Dashboard;
