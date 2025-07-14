"use client";
import dynamic from "next/dynamic";

// Dynamically import with SSR disabled
const LineChartComponent = dynamic(
  () => import("@/app/_components/LineChart"),
  {
    ssr: false,
  }
);

type LineChartData = {
  xAxis: string;
  year: string;
  inspections: number;
};

import { DateSelect } from "@/app/_components/common/dateSelect";
import { generateRandomNumber } from "@/app/helper/helperFunction";
import { GoDotFill } from "react-icons/go";
import StackedBarChart from "@/app/_components/BarChart";
import { ReusablePieChart } from "@/app/_components/PieChart";

export default function Page() {
  function generateLineChartData() {
    const data = [
      "8AM",
      "12PM",
      "4PM",
      "8PM",
      "12AM",
      "8AM",
      "12PM",
      "4PM",
      "8PM",
      "12AM",
    ];
    const randomYear = generateRandomNumber(2023, 2020);
    const lineChartData: LineChartData[] = [];
    data.forEach((time) => {
      lineChartData.push({
        xAxis: time,
        year: `${randomYear}`,
        inspections: generateRandomNumber(50, 5),
      });
    });
    return lineChartData;
  }

  const inspectionStatus = {
    data: [
      { name: "Approved", value: 400 },
      { name: "Declined", value: 300 },
      { name: "Scheduled", value: 200 },
      { name: "Pending", value: 150 },
    ],
    colors: ["#17B26A", "#F04438", "#7065F0", "#F79009"],
  };

  const inspectionProperty = {
    data: [
      { name: "House", value: 400 },
      { name: "Car", value: 300 },
      { name: "Land", value: 200 },
      { name: "Others", value: 650 },
    ],
    colors: ["#2E90FA", "#F670C7", "#EF6820", "#7A5AF8", "#DED9DD"],
  };

  return (
    <div className="flex bg-white flex-col gap-10 mb-10  py-10">
      <section className="px-6 py-4 bg-[#F0F0F0] space-y-6">
        <h5 className="text-black text-xl font-medium mb-5">
          {" "}
          Analytics Overview
        </h5>
        <div className="w-full px-5 py-7 bg-white rounded-xl">
          <div className="w-full flex-col md:flex-row  flex md:items-center  justify-evenly *:px-12 *:py-4">
            <div className="space-y-3 border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">
                Total Inspections Completed
              </h6>
              <p className="text-lg font-bold">230</p>
            </div>
            <div className="space-y-3 border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">Pending Inspections</h6>
              <p className="text-lg font-bold">53</p>
            </div>
            <div className="space-y-3  border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">Upcoming Inspections</h6>
              <p className="text-lg font-bold">530</p>
            </div>
            <div className="space-y-3">
              <h6 className="text-sm text-[#585858]">Recent Verifications</h6>
              <p className="text-lg font-bold">1,200</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <h5 className="md;text-xl font-semibold">Commission Earnings</h5>
        <div className="flex justify-end">
          <div className="flex items-center gap-x-5">
            <span className="flex items-center gap-x-1 text-sm text-[#585858]">
              <GoDotFill className="text-[#17B26A]" />
              Approved
            </span>
            <span className="flex items-center gap-x-1 text-sm text-[#585858]">
              <GoDotFill className="text-[#F04438]" />
              Declined
            </span>

            <span className="flex items-center gap-x-1 text-sm text-[#585858]">
              <GoDotFill className="text-[#F79009]" />
              Pending
            </span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex">
          <div className="flex items-center justify-center w-1 md:w-10">
            <p className="text-lg whitespace-nowrap -rotate-90 origin-center">
              Earnings <span>(₦)</span>
            </p>
          </div>

          <div className="flex-1 w-full">
            <StackedBarChart />
          </div>
        </div>
        <div className="flex text-xl items-center justify-center">
          <span>Month</span>
        </div>
      </section>

      <section className="flex flex-col gap-10 px-5 w-full md:flex-row">
        {/* left */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <div className="flex justify-between pr-3 md:pr-4">
            <h5 className="md:text-xl font-semibold">Inspection Status</h5>{" "}
            <div className="border border-gray-200 px-3 md:px-4 md:py-2 py-1 rounded-lg">
              <select name="" id="">
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*Inspection status pie  chart here */}

          <ReusablePieChart
            data={inspectionStatus.data}
            innerRadius={70}
            paddingAngle={0}
            outerRadius={150}
            width={500}
            height={400}
            colors={inspectionStatus.colors}
            showTotal
          />
        </div>

        {/* right */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <div className="flex justify-between pr-3 md:pr-7">
            <h5 className="md:text-xl font-semibold">
              Most Property Inspected
            </h5>{" "}
            <div className="border border-gray-200 px-3 py-1 md:px-4 md:py-2 rounded-lg">
              <select name="" id="">
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/*Property pie chart here */}
          <ReusablePieChart
            data={inspectionProperty.data}
            innerRadius={70}
            paddingAngle={0}
            outerRadius={150}
            width={500}
            height={400}
            colors={inspectionProperty.colors}
            showHighest
          />
        </div>
      </section>

      <section className="px-6 py-4">
        <div className="flex justify-between">
          <h5 className="md:text-xl font-semibold">Scheduled Times</h5>
          <div className="flex gap-3">
            <span className="hidden md:flex items-center gap-x-1 text-sm text-[#585858]">
              <GoDotFill className="text-[#F79009]" />
              Schedule
            </span>
            <DateSelect onChange={() => {}} value={null} />
          </div>
        </div>

        <div className="flex">
          <div className="flex items-center justify-center w-3 md:w-10">
            <p className="md:text-lg whitespace-nowrap -rotate-90 origin-center">
              No of Inspections
            </p>
          </div>

          <div className="w-full h-[18rem] mt-5">
            <LineChartComponent
              chartData={generateLineChartData()}
              lines={[
                {
                  name: "inspections",
                  type: "monotone",
                  color: "#e65800",
                  lineWidth: 2,
                  dotSize: 7,
                  dotShow: false,
                },
              ]}
              tooltipBgColor="#E65800"
              tooltipTextColor="#fff"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
