"use client"

import { InspectionRequestsTable } from "@/app/_components/inspection-requests-table/inspection-requests-table";
import { ExportModal } from "@/app/_components/modals/Export-Modal";
import {
  ArrowRight2,
  SearchNormal1,
  Export,
  Printer,
} from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {

  const [exportModalOpen, setExportModalOpen] = useState(false);
  return (
    <>
    {exportModalOpen && (<ExportModal isOpen={exportModalOpen} onClose={()=> setExportModalOpen(false)}/>)}
      <section className="mt-11">
        <div className="flex items-center gap-2.5 mb-20">
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
            <h6 className="text-black font-medium mb-5">Inspection Requests</h6>
            <div className="flex items-center gap-4 justify-end mt-5">
              <button onClick={() => setExportModalOpen(true)} className="px-6 py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600">
                <Export size="20" /> Export
              </button>
              <button className="px-6 flex items-center gap-1 py-2 text-orange border-orange border rounded-lg hover:bg-orange-100 ">
                <Printer size="20" />
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
            <InspectionRequestsTable />
          </div>
        </section>
      </section>
    </>
  );
}
