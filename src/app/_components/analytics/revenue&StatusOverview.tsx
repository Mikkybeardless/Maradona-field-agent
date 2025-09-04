import { Clock, Eye, ShoppingCart } from "iconsax-react";
import { CheckCircle, Gavel, XCircle } from "lucide-react";

interface RevenueStatusProps {
  stats: Stats;
}
export const RevenueStatus = ({ stats }: RevenueStatusProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Revenue Breakdown
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Purchase Enquiries</p>
                <p className="text-sm text-gray-600">
                  {stats.enquiries.sold_count} sales
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">
                ₦{stats.enquiries.total_revenue}
              </p>
              <p className="text-sm text-gray-500">
                {stats.enquiries.conversion_rate}% rate
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center">
              <Gavel className="w-5 h-5 text-orange-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Auction Bids</p>
                <p className="text-sm text-gray-600">
                  {stats.bids.sold_count} sales
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600">
                ₦{stats.bids.total_revenue}
              </p>
              <p className="text-sm text-gray-500">
                {stats.bids.conversion_rate}% rate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Current Status Overview
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">
              {stats.conversions.overall_conversion.total_sold}
            </p>
            <p className="text-sm text-gray-600">Total Sold</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">
              {stats.bids.pending_count + stats.enquiries.pending_count}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">
              {stats.inspections.completed_inspections}
            </p>
            <p className="text-sm text-gray-600">Inspections Done</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">
              {stats.bids.rejected_count}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>
      </div>
    </div>
  );
};
