import { Distribution } from "./distribution";

interface dataObj {
  name: string;
  value: string | number;
  color: string;
}
interface ConversionTabProps {
  bidData: dataObj[];
  bidIsEmpty: boolean;
  enquiryData: dataObj[];
  enquiryIsEmpty: boolean;
}
export const ConversionTabSection = ({
  bidData,
  enquiryData,
  bidIsEmpty,
  enquiryIsEmpty,
}: ConversionTabProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Distribution
        data={bidData}
        title="Bid Status Distribution"
        isEmpty={bidIsEmpty}
      />
      <Distribution
        data={enquiryData}
        title="Enquiry Status Distribution"
        isEmpty={enquiryIsEmpty}
      />
    </section>
  );
};
