import React from "react";
import { BiSolidLandscape } from "react-icons/bi";
import { FaCar, FaHouse } from "react-icons/fa6";
import { MdPedalBike } from "react-icons/md";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Data = {
  name: string;
  value: number;
  color?: string; // Optional color for custom segments
};

interface ReusablePieChartProps {
  data: Data[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  width?: number;
  height?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  centerLabel?: string;
  paddingAngle?: number;
  showTotal?: boolean; // New prop to show total value
  showHighest?: boolean; // New prop to show highest value
}
// Reusable PieChart Component
export const ReusablePieChart = ({
  data,
  colors = [],
  innerRadius = 0,
  paddingAngle = 2,
  outerRadius = 80,
  width = 400,
  height = 400,
  showTooltip = true,
  showLegend = true,
  title = "",
  showTotal = false, // Default to false
  showHighest = false, // Default to false
  centerLabel = "",
}: ReusablePieChartProps) => {
  // Default color palette if no colors provided
  const defaultColors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ];

  const chartColors = colors.length > 0 ? colors : defaultColors;

  // Custom tooltip content
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      payload: { total: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-blue-600">
            Value: <span className="font-bold">{data.value}</span>
          </p>
          <p className="text-gray-500 text-sm">
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total for percentage
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithTotal = data.map((entry) => ({ ...entry, total }));
  const maxItem = data.reduce((prev, current) =>
    current.value > prev.value ? current : prev
  );
  return (
    <div className="flex flex-col items-center">
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      )}

      <div className="relative w-full flex items-start">
        <ResponsiveContainer width={width} height={height}>
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="40%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
              dataKey="value"
            >
              {dataWithTotal.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            {showTooltip && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>
        {showTotal && (
          <div className="absolute bottom-0 left-0 ">
            <p className="text-gray-800 font-semibold">
              Total:{" "}
              <span className="rounded-full font-semibold px-4 py-1 bg-[#DED9DD] text-black">
                {total}
              </span>
            </p>
          </div>
        )}

        {showHighest && (
          <p className="absolute  flex items-center gap-2 bottom-0 right-16">
            Most Property Inspected
            <span className="bg-[#FCCEEE] flex items-center gap-1 px-4 py-1 rounded-full">
              {maxItem.name === "Car" ? (
                <FaCar />
              ) : maxItem.name === "House" ? (
                <FaHouse />
              ) : maxItem.name === "Land" ? (
                <BiSolidLandscape />
              ) : (
                <MdPedalBike />
              )}
              ({maxItem.value})
            </span>
            {/* max entry name */}
          </p>
        )}
        {showLegend && (
          <div className="absolute top-0 right-20">
            <div className="flex flex-col gap-2">
              {dataWithTotal.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: chartColors[index % chartColors.length],
                    }}
                  />
                  <span className="text-sm text-gray-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Center Label for Donut Charts */}
        {innerRadius > 0 && centerLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {centerLabel}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
