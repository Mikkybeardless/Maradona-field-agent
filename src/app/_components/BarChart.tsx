import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWindowResizer } from "../hooks/useWindowResize";

const data = [
  {
    name: "Jan",
    pending: 65,
    declined: 28,
    approved: 15,
  },
  {
    name: "Feb",
    pending: 59,
    declined: 48,
    approved: 22,
  },
  {
    name: "Mar",
    pending: 80,
    declined: 40,
    approved: 18,
  },
  {
    name: "Apr",
    pending: 81,
    declined: 35,
    approved: 25,
  },
  {
    name: "May",
    pending: 56,
    declined: 52,
    approved: 30,
  },
  {
    name: "Jun",
    pending: 55,
    declined: 38,
    approved: 20,
  },
];

export default function StackedBarChart() {

  const {isMobile} = useWindowResizer();
  return (
    <div className="bg-white w-full ">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: isMobile ? 0 : 30,
            left: 0,
            bottom: 5,
          }}
          maxBarSize={50}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
          {/* <Legend /> */}

          {/* Three stacked bars with different colors */}
          <Bar
            dataKey="pending"
            stackId="a"
            fill="#F79009"
            name="Pending"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="declined"
            stackId="a"
            fill="#F04438"
            name="Declined"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="approved"
            stackId="a"
            fill="#17B26A"
            name="Approved"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
