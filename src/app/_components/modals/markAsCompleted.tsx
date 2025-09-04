import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface MarkMeetingProps {
  isMarking: boolean;
  handleMark: (notes: string) => void;
  completeModalOpen: boolean;
  setCompleteModalOpen: (open: boolean) => void;
}

export const MarkComplete = ({
  isMarking,
  handleMark,
  completeModalOpen,
  setCompleteModalOpen,
}: MarkMeetingProps) => {
  const [notes, setNotes] = useState("");
  return (
    <Dialog
      open={completeModalOpen}
      onClose={() => setCompleteModalOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Complete Meeting</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <p>Write a short note (Optional)</p>

        <TextField
          label="Additional Notes"
          placeholder="Enter any remarks about this item..."
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button
          className="!text-black"
          onClick={() => {
            setCompleteModalOpen(false);
            setNotes("");
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleMark(notes)}
          variant="contained"
          className="!bg-orange !text-white"
        >
          {isMarking ? "Marking..." : "Mark"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
