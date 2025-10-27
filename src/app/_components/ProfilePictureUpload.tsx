import { Avatar, Badge, IconButton } from "@mui/material";
import { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

interface ProfilePictureUploadProps {
  apiImage?: string | null;
  onUpdating?: (updating: boolean) => void;
}

export default function ProfilePictureUpload({
  apiImage,
  onUpdating = () => {},
}: ProfilePictureUploadProps) {
  const [image, setImage] = useState<string>(
    apiImage || "/default_profile.png"
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    // send to api
    if (file) {
      const formData = new FormData();
      formData.append("profile_pic", file);
      try {
        onUpdating(true); // Call the onUpdate function to notify parent component
        const response = await axios.put("/api/auth/profile", {
          profile_pic: file,
        });
        if (response.status === 200) {
          toast.success("Profile picture updated successfully");
          setImage(URL.createObjectURL(file));
          console.log("Profile picture updated successfully:", response.data);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Error updating profile picture:", error);
        setImage(apiImage || "/default_profile.png");
      } finally {
        onUpdating(false); // Call the onUpdating function to notify parent component
      }
    }
  };

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <IconButton
          component="label"
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            width: 32,
            height: 32,
            "&:hover": { backgroundColor: "#ddd" },
          }}
        >
          <BsCamera size={18} color="#E65800" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </IconButton>
      }
    >
      <Avatar
        src={image}
        alt="Profile Picture"
        sx={{ width: 120, height: 120 }}
      />
    </Badge>
  );
}
