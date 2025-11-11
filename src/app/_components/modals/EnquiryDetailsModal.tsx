// eslint-disable and @typescript-eslint/no-explicit-any is disabled for this file to allow flexibility in handling data objects.

/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatPrice } from "@/app/helper/helperFunction";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any | null;
};

export default function EnquiryDetailModal({ open, onClose, data }: Props) {
  if (!data) return null;

  const product = data.product ?? null;
  const buyer = data.buyer ?? null;
  // const agent = data.agent ?? null;
  // const inspection = data.inspection_request ?? null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Purchase Enquiry — <span className="font-bold">#{data.id}</span>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Order</h4>
            <div className="text-sm">ID: {data.id}</div>
            <div className="text-sm capitalize">
              Status: {data.status ?? "-"}
            </div>
            <div className="text-sm">
              Created: {new Date(data.created_at).toLocaleString() ?? "-"}
            </div>
            <div className="text-sm">
              Sold price: {data.sold_price ? formatPrice(data.sold_price) : "-"}
            </div>
            <div className="text-sm">Qty sold: {data.qty_sold ?? "-"}</div>
            <div className="text-sm">Sold at: {data.sold_at ?? "-"}</div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Buyer</h4>
            <div className="text-sm">Name: {buyer?.name ?? "-"}</div>
            <div className="text-sm">Email: {buyer?.email ?? "-"}</div>
            <div className="text-sm">Phone: {buyer?.phone ?? "-"}</div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold mt-3">Product</h4>
            <div className="text-sm">Name: {product?.name ?? "-"}</div>
            <div className="text-sm">Type: {product?.type ?? "-"}</div>
            <div className="text-sm">
              Description: {product?.description ?? "-"}
            </div>
            <div className="text-sm">
              Price: {product?.price ? formatPrice(product.price) : "-"}
            </div>
            {/* show some product-specific fields */}
            {product?.house_beds && (
              <div className="text-sm">Beds: {product.house_beds}</div>
            )}
            {product?.mileage && (
              <div className="text-sm">Mileage: {product.mileage}</div>
            )}
            {product?.category && (
              <div className="text-sm">Category: {product.category?.name}</div>
            )}
            {Array.isArray(product?.tags) && product.tags.length > 0 && (
              <div className="text-sm capitalize">
                Tags: {product.tags.map((t: any) => t.name).join(", ")}
              </div>
            )}
          </div>

          {/* <div className="space-y-5">
            <div className="space-y-2">
              <h4 className="font-semibold">Agent</h4>
              <div className="text-sm">Name: {agent?.name ?? "-"}</div>
              <div className="text-sm">Email: {agent?.email ?? "-"}</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Inspection Request</h4>
              <div className="text-sm">Status: {inspection?.status ?? "-"}</div>
              <div className="text-sm">
                Scheduled: {inspection?.scheduled_at ?? "-"}
              </div>
              <div className="text-sm">Notes: {inspection?.notes ?? "-"}</div>
            </div>
          </div> */}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outlined"
            className="border !border-orange !text-orange hover:!bg-orange/10"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
