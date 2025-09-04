import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomDateInput from "../common/dateInput";
import TimeInput from "../common/timeInput";
import { useState } from "react";

interface ScheduleMeetingProps {
  isScheduling: boolean;
  handleSchedule: (date: Date, time: Date) => void;
  scheduleModalOpen: boolean;
  setScheduleModalOpen: (open: boolean) => void;
}

export const ScheduleMeeting = ({
  isScheduling,
  handleSchedule,
  scheduleModalOpen,
  setScheduleModalOpen,
}: ScheduleMeetingProps) => {
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  return (
    <Dialog
      open={scheduleModalOpen}
      onClose={() => setScheduleModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Schedule Meeting</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <CustomDateInput value={scheduledDate} onChange={setScheduledDate} />
        <TimeInput
          value={scheduledTime}
          onChange={(event) => {
            const value = event.target.value;
            // Assuming value is a string in "HH:mm" format
            if (value) {
              const [hours, minutes] = value.split(":").map(Number);
              const date = new Date();
              date.setHours(hours);
              date.setMinutes(minutes);
              date.setSeconds(0);
              date.setMilliseconds(0);
              setScheduledTime(date);
            } else {
              setScheduledTime(null);
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="!text-black"
          onClick={() => {
            setScheduledDate(null);
            setScheduledTime(null);
            setScheduleModalOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (scheduledDate && scheduledTime) {
              handleSchedule(scheduledDate, scheduledTime);
            }
          }}
          variant="contained"
          className="!bg-orange !text-white"
          disabled={!scheduledDate || !scheduledTime || isScheduling}
        >
          {isScheduling ? "Scheduling..." : "Schedule"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
