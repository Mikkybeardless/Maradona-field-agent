import { InspectionDetailsClient } from "../inspectionDetailsClient";

export default async function InspectionPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;

  return <InspectionDetailsClient id={id} />;
}
