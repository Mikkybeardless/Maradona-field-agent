import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ReuseablePieChartProps {
  data: dataObj[];
  cx?: number | string;
  cy?: string | number;
  dataKey?: string;
}
export const ReuseablePieChart = ({
  data,
  cx = "50%",
  cy = "50%",
  dataKey = "value",
}: ReuseablePieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={60}
          outerRadius={120}
          paddingAngle={2}
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
