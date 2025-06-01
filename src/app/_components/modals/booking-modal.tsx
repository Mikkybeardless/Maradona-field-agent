import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import img1 from "@/app/_assets/images/agent.jpg";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const currentAgent = {
    name: "John Doe",
    id: "AGT12345",
  };
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="md:w-[40%] md:h-[70%] rounded-[24px] flex flex-col px-8 py-2 bg-white">
        <div className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1 ">
          <h2 className="text-2xl font-bold">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-y-1 mt-5">
          <div className=" flex flex-col justify-center mb-14 items-center text-[#585858] gap-y-3">
            <img
              src={img1.src}
              alt="agent profile picture"
              className="w-[97px] h-[97px] rounded-sm object-contain"
            />
            <p>
              Inspection with{" "}
              <span className="font-semibold mr-1 text-black">
                {currentAgent.name}
              </span>
              (Buyer)
            </p>
            <p>
              Filed Agent Assigned : <span>{currentAgent.id}</span>{" "}
            </p>
            <p className="flex items-center gap-x-3">
              <span className="flex items-center gap-x-1">
                <CiCalendar size={18} className="text-black" />
                Thur, Nov 7
              </span>
              <span className="flex items-center gap-x-1">
                <CiClock2 size={18} className="text-black" /> 5 pm EST
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <button className="bg-orange hover:bg-inherit hover:border-orange hover:text-orange border rounded-lg py-2 w-full text-white">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
