import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReusableAreaChartProps {
  data: Array<{ month: string; conversion_rate: number; total_sold: number }>;
}
export const ReusableAreaChart = ({ data }: ReusableAreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="conversion_rate"
          stroke="#e65800"
          fill="#e65800"
          fillOpacity={0.1}
          name="Conversion Rate (%)"
        />
        <Line
          type="monotone"
          dataKey="total_sold"
          stroke="#10B981"
          name="Total Sold"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
