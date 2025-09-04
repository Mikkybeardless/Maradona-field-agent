import { Distribution } from "./distribution";

interface dataObj {
  name: string;
  value: string | number;
  color: string;
}
interface ConversionTabProps {
  bidData: dataObj[];
  enquiryData: dataObj[];
}
export const ConversionTabSection = ({
  bidData,
  enquiryData,
}: ConversionTabProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Distribution data={bidData} title="Bid Status Distribution" />
      <Distribution data={enquiryData} title="Enquiry Status Distribution" />
    </section>
  );
};
