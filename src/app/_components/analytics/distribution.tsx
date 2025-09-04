import { ReuseablePieChart } from "./charts/pieChart";

interface DistributionProps {
  data: dataObj[];
  title: string;
}
export const Distribution = ({ data, title }: DistributionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <ReuseablePieChart data={data} />
      <div className="flex justify-center mt-4 space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
