"use client";

import { InspectionRequestsTable } from "@/app/_components/inspection-requests-table/inspection-requests-table";
import { ExportModal } from "@/app/_components/modals/Export-Modal";
import inspectionService from "@/app/api/services/inspection.service";
import { ArrowRight2, SearchNormal1, Export, Printer } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [exportModalOpen, setExportModalOpen] = useState(false);
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
    <>
      {exportModalOpen && (
        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
        />
      )}
      <section className="mt-11">
        <div className="flex items-center gap-2.5 mb-10">
          <Link className="text-xs" href="/dashboard/overview">
            Home
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <Link className="text-xs" href="/dashboard/inspection-requests">
            Inspection Requests
          </Link>
        </div>
        <section>
          <div className="flex justify-between items-center mb-6">
            <h6 className="text-black text-sm md:text-xl font-medium">
              Inspection Requests
            </h6>
            <div className="flex items-center gap-4 justify-end">
              <button
                onClick={() => setExportModalOpen(true)}
                className="px-4 md:px-6 md:py-2 py-1 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600"
              >
                <Export className="size-5" /> Export
              </button>
              <button className="px-4 md:px-6 py-1 md:py-2  flex items-center gap-1 text-orange border-orange border rounded-lg hover:bg-orange-100 ">
                <Printer className="size-5" />
                print
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <header className="w-full flex items-center justify-between">
              <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
                <select className="outline-none bg-transparent p-1">
                  <option value="all">Status</option>
                  <option value="pending">Pending</option>
                  <option value="pending">Scheduled</option>
                  <option value="pending">Approved</option>
                  <option value="pending">Active</option>
                </select>
              </div>
              <div className="flex items-center gap-2.5 w-[18.75rem] border border-grey/70 rounded-lg px-4 py-2">
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
    </>
  );
}
