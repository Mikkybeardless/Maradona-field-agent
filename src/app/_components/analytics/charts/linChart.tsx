import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReuseableLinchartProps {
  data: Array<{ month: string; enquiries_sold: number; bids_sold: number }>;
}

export const ReuseableLinchart = ({ data }: ReuseableLinchartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="enquiries_sold"
          stroke="#10B981"
          strokeWidth={3}
          name="Enquiries Sold"
        />
        <Line
          type="monotone"
          dataKey="bids_sold"
          stroke="#F59E0B"
          strokeWidth={3}
          name="Bids Sold"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
