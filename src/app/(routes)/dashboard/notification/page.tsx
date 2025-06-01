import { RequestCard } from "@/app/_components/cards/request-card";
import House from "@/app/_assets/images/house2.png"; // Adjust the path as necessary
import { InspectionCard } from "@/app/_components/cards/upcoming-inspection";

export default function Page() {
  //  sample data for the request card
  const request = {
    status: "Approved",
    imgsrc: House.src, // Replace with actual image path
    des: "Inspection Request for Property",
    id: "1938409",
    postedBy: "John Doe",
    timestamp: "2024-10-01 12:30 PM",
  };

  const request2 = {
    status: "Declined",
    imgsrc: House.src, // Replace with actual image path
    des: "Inspection Request for Property",
    id: "1938409",
    postedBy: "John Doe",
    timestamp: "2024-10-01 12:30 PM",
  };

  const inspection = {
    imgsrc: House.src,
    des: "Inspection Request for Property",
    id: "1938609",
    postedBy: "Jane Smith",
    timestamp: "2024-10-01 01:00 PM",
    location: "123 Main St, City",
    phone: "+1234567890",
    date: "2024-10-02",
    time: "10:00 AM",
  };

  return (
    <section className=" px-20 py-10">
      <div className="w-full  max-w-[60rem] mx-auto bg-white rounded-lg shadow-md">
        <header className="px-6 py-4 border-b border-gray-300 space-y-6">
          <h2 className="text-2xl font-semibold">Updates</h2>
        </header>

        <div className="px-6 space-y-5 py-4 rounded-lg">
          <h3 className="font-semibold text-lg">Today</h3>
          <RequestCard request={request} />
          <InspectionCard inspection={inspection} />
          <RequestCard request={request2} />
        </div>
      </div>
    </section>
  );
}
