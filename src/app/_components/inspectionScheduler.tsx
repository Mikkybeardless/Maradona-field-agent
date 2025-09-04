import { useState } from "react";
import { toast } from "react-toastify";

interface InspectionSchedulerProps {
  onSchedule: (dateTime: { date: string; time: string }) => void;
}

export default function InspectionScheduler({
  onSchedule,
}: InspectionSchedulerProps) {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  // Generate the next 6 days starting from today
  const generateDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      days.push({
        name: dayNames[date.getDay()],
        date: date.getDate().toString().padStart(2, "0"),
        month: date.toLocaleString("default", { month: "short" }),
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD format
      });
    }

    return days;
  };

  const days = generateDays();

  // Time options with 24-hour format conversion
  const timeOptions = [
    { display: "1:00PM", value: "13:00:00" },
    { display: "2:00PM", value: "14:00:00" },
    { display: "3:00PM", value: "15:00:00" },
    { display: "4:00PM", value: "16:00:00" },
    { display: "5:00PM", value: "17:00:00" },
    { display: "6:00PM", value: "18:00:00" },
  ];

  const handleScheduleInspection = () => {
    if (selectedSession !== null && selectedTime !== null) {
      const selectedDay = days[selectedSession];
      const selectedTimeValue = timeOptions[selectedTime].value;

      //   const formattedDateTime = `${selectedDay.fullDate} ${selectedTimeValue}`;

      // Send to parent component
      onSchedule?.({
        date: selectedDay.fullDate,
        time: selectedTimeValue,
      });
    } else {
      toast.error("Please select both date and time");
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="bg-white p-4 rounded-lg space-y-4 shadow-md">
        <h5 className="font-medium text-lg mb-2">Open days for inspection</h5>
        <div>
          <p>Book session for you to go inspect</p>
          <div className="flex items-center gap-x-10 overflow-x-auto mt-4">
            {days.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedSession(i)}
                className={`${
                  selectedSession === i &&
                  "bg-[#E8E8F4] border-[#4345AA] border"
                } rounded-lg p-2 mb-2 shadow-md flex flex-col items-center gap-1 min-w-fit`}
              >
                <span className="font-semibold">{day.name}</span>
                <span className="text-sm text-[#585858] font-medium">
                  {`${day.date} ${day.month}`}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 mt-2">
          <p>Choose Time</p>
          <hr className="mb-4" />
          <div className="flex items-center gap-x-7 overflow-x-auto mt-4">
            {timeOptions.map((timeOption, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(i)}
                className={`${
                  selectedTime === i && "bg-[#E8E8F4] border-[#4345AA] border"
                } rounded-lg p-2 mb-2 shadow-md items-center gap-1 min-w-fit`}
              >
                <span className="text-sm text-[#585858] flex font-medium">
                  {timeOption.display}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleScheduleInspection}
          className="w-full py-2 bg-orange rounded-xl hover:bg-inherit hover:border hover:border-orange text-white hover:text-orange transition-colors"
        >
          Schedule Inspection
        </button>
      </div>
    </div>
  );
}
