import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ReusableBarChartProps {
  data: Array<{
    name: string;
    completed: number;
    pending: number;
  }>;
}

export const ReusableBarChart = ({ data }: ReusableBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} />
        <Tooltip />
        <Bar
          dataKey="completed"
          fill="#10B981"
          name="Completed"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="pending"
          fill="#F59E0B"
          name="Pending"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
