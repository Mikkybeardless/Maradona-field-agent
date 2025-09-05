import { IconButton, Typography } from "@mui/material";
import { MdContentCopy } from "react-icons/md";

import type { TypographyProps } from "@mui/material";
import { toast } from "react-toastify";

export default function CopyableText({
  textColor,
  variant,
  text,
}: {
  textColor: string;
  variant: TypographyProps["variant"];
  text: string;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <Typography variant={variant} fontWeight={400} color={textColor}>
      {text}{" "}
      <IconButton size="small" onClick={handleCopy}>
        <MdContentCopy size={16} color="#ACA0A9" />
      </IconButton>
    </Typography>
  );
}
