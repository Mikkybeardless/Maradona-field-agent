"use client";
import { InspectionRequestsTable } from "@/app/_components/inspection-requests-table/inspection-requests-table";
import { Export, SearchNormal1 } from "iconsax-react";
import { DateSelect } from "../../../_components/common/dateSelect";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
import inspectionService from "@/app/api/services/inspection.service";

export default function Page() {
  const rows = () => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      requestId: `Request ID ${i + 1}`,
      itemName: `Item Name ${i + 1}`,
      category: i % 2 === 0 ? "Land" : "Vehicle",
      date: `Date ${i + 1}`,
      status:
        i < 5
          ? "Approved"
          : i < 10 && i > 5
          ? "Pending"
          : i < 15 && i > 10
          ? "Active"
          : "Scheduled",
    }));
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await inspectionService.getInspections();
        console.log("Inspection Requests:", response);
      } catch (error) {
        console.error("Error fetching inspections:", error);
      }
    };
    const fetchById = async () => {
      try {
        const response = await inspectionService.getInspection(4);
        console.log("Inspection Request by ID:", response);
      } catch (error) {
        console.error("Error fetching inspection by ID:", error);
      }
    };
    fetchById();
    fetchData();
  }, []);
  return (
    <section className="flex bg-white mt-5 flex-col gap-4 py-10">
      <header className=" px-2 md:px-6 py-4 space-y-6">
        <div className="flex  justify-between items-end bg-[#FFEFE6] border border-[#FEB68A] rounded-lg px-5 py-4">
          <button className="hover:underline">Add Payment Info</button>
          <button>X</button>
        </div>

        <div className="flex items-center bg-white justify-between">
          <div className="space-y-2.5">
            <p className="md:text-2xl flex gap-x-2 font-semibold">
              <span>👋</span>
              Welcome back Rose! <GoDotFill className="text-blue-700" />
            </p>
            <div className="flex md:items-center gap-1 md:gap-2">
              <p className="text-[#5C4D58] text-xs">
                Last login:{" "}
                <span className="text-[#150A13]">Sept 25, 2024</span>
              </p>
              <FaRegClock />
              <p className="text-xs">12:30pm</p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <p className="px-2 rounded-full py-1 text-sm text-[#4A1E11] bg-[#FCDFD7]">
                Agent
              </p>
              <p className="px-2 rounded-full py-1 text-sm text-[#008000] bg-[#E8F7E8]">
                Active
              </p>
              <p className="px-2 rounded-full py-1 text-sm text-[#68305B] bg-[#F2E8F0]">
                Online
              </p>
            </div>
          </div>

          <Link href="/dashboard/profile">
            <button
              type="button"
              className="rounded-md px-2 py-1 text-xs md:text-base flex items-center gap-1 md:gap-2 border border-orange text-orange "
            >
              <HiOutlinePencil className="size-[20px] md:size-[24px]" />
              Edit Profile
            </button>
          </Link>
        </div>
      </header>
      <section className="px-6 py-4 bg-[#F0F0F0] space-y-6">
        <h6 className="text-black font-medium mb-5"> Statistics Overview</h6>
        <div className="w-full px-2 md:px-5 py-7 bg-white rounded-xl md:rounded-lg">
          <div className="w-full  flex flex-col md:flex-row md:items-center justify-evenly *:px-12 *:py-4">
            <div className="space-y-3  border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">
                Total Inspections Completed
              </h6>
              <p className="text-lg font-bold">230</p>
            </div>
            <div className="space-y-3    border-b md:border-b-0 md:border-r border-light-grey">
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
      <section className="px-2  md:px-6 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <h6 className="text-black font-medium md:text-xl mb-5">
            Inspection Requests
          </h6>
          <button className="px-4 py-1 md:px-6 md:py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600">
            <Export size="20" /> Export
          </button>
        </div>

        <div className="bg-white rounded-lg md:p-6">
          <header className="w-full flex flex-wrap gap-3   items-center justify-between">
            <div className="flex items-center flex-wrap gap-3">
              <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
                <select className="outline-none bg-transparent p-1">
                  <option value="all">Category</option>
                  <option value="pending">Land</option>
                  <option value="pending">Vehicle</option>
                  <option value="pending">Building</option>
                </select>
              </div>

              <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
                <select className="outline-none bg-transparent p-1">
                  <option value="all">Status</option>
                  <option value="pending">Pending</option>
                  <option value="pending">Scheduled</option>
                  <option value="pending">Approved</option>
                  <option value="pending">Active</option>
                </select>
              </div>

              <DateSelect
                onChange={(val) => {
                  console.log("date:", val);
                }}
                value={null}
              />
            </div>
            <div className="flex items-center gap-2.5 w-[18.75rem] border border-grey/40 rounded-lg px-4 py-2">
              <SearchNormal1 size={20} />
              <input
                type="search"
                className="w-full text-sm outline-none"
                placeholder="Search agents"
              />
            </div>
          </header>
          <InspectionRequestsTable rows={rows()} />
        </div>
      </section>
    </section>
  );
}
