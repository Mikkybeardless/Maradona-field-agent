import { ReuseableLinchart } from "./charts/linChart";
import { ReusableAreaChart } from "./charts/areaChart";

interface PerformanceSectionProps {
  stats: Stats;
}
export const PerformanceSection = ({ stats }: PerformanceSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Conversion Trends
        </h3>
        <ReusableAreaChart data={stats.performance.data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Enquiries vs Bids Trend
          </h3>
          <ReuseableLinchart data={stats.performance.data} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Monthly Performance Summary
          </h3>
          <div className="space-y-4">
            {stats.performance.data.slice(-2).map((month, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-900">{month.month}</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {month.conversion_rate}%
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>Assignments: {month.total_assignments}</span>
                  <span>Sold: {month.total_sold}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
