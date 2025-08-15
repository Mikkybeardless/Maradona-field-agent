"use client";

import { InspectionRequestsTable } from "@/app/_components/inspection-requests-table/inspection-requests-table";
import { ExportModal } from "@/app/_components/modals/Export-Modal";
import { ArrowRight2, Export, Printer } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [exportModalOpen, setExportModalOpen] = useState(false);
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
          {/* table */}
          <InspectionRequestsTable />
        </section>
      </section>
    </>
  );
}
