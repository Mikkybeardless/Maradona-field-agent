import { ReusableBarChart } from "./charts/barChart";

interface InspectionSectionProps {
  inspectionData: Array<{
    name: string;
    completed: number;
    pending: number;
  }>;
  stats: Stats;
}

export const InspectionTabSection = ({
  inspectionData,
  stats,
}: InspectionSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Inspection Status by Type
        </h3>
        <ReusableBarChart data={inspectionData} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Inspection Summary
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Completed Inspections</p>
              <p className="text-sm text-gray-600">
                Total completed this period
              </p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {stats.inspections.completed_inspections}
            </p>
          </div>
          <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Pending Inspections</p>
              <p className="text-sm text-gray-600">Awaiting completion</p>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.inspections.pending_inspections}
            </p>
          </div>
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Completion Rate</p>
              <p className="text-sm text-gray-600">Overall efficiency</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {stats.inspections.completion_rate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
