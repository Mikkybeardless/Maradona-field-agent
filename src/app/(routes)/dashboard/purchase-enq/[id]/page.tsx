import { PurchaseEnqDetailsClient } from "../purchaseEnqDetailsClient";

export default async function InspectionPage({
  params,
}: {
  params: { id: number };
}) {
  const id = params.id;

  return <PurchaseEnqDetailsClient id={id} />;
}
